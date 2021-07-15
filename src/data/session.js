import { service } from './base/service';
import { makeObservable, observable, runInAction, action } from 'mobx';
import cookie from 'js-cookie';
import { KEYS } from '../constants';

const SESSION_STORAGE_PROFILE_KEY = 'profile';

const authTypes = {
  signIn: 'signIn',
  signUp: 'signUp',
}
class Session {
  /**
  * Authorization check - if the token is in the cookie, the user is authorized.
  *
  * When the user sign-in or sign-up, we set their token in the cookie.
  * When the user sign-out, we remove their token in the cookie.
  */
  token = null;
  // when we run the request the loading is true and when we end the request the loading is false
  loading = {
    signIn: false,
    signUp: false,
    signOut: false,
  };
  profile = {};

  constructor() {
    makeObservable(this, {
      token: observable,
      loading: observable,
      profile: observable,
      signOut: action,
      setProfile: action,
    });

    this._retrieveIdTokenFromCookie();

    const { username } = this._getUsernameFromSessionStorage();

    if (username) {
      this.setProfile({username});
    }
  }

  get isAuthorized() {
    return !!this.token;
  }

  async signIn(username, password) {
    return await this._auth(
      authTypes.signIn, 
      username, 
      password
    );
  }

  setProfile(profileData) {
    if (
      !Array.isArray(profileData) && 
      typeof profileData === 'object'
    ) {

      const profile = {
        ...this.profile,
        ...profileData,
      };

      // We save the username, since the server does not give the profile, and we need the username to display the review left by the current user
      // set username in sessionStorage, it needs for after reloading the page we saved username
      if (!this.profile.username) {
        this._setUsernameInSessionStorage(profileData.username);
      }

      this.profile = profile;
    }
  }

  _setUsernameInSessionStorage(username) {
    sessionStorage.setItem(SESSION_STORAGE_PROFILE_KEY, JSON.stringify({ username }));
  }

  _getUsernameFromSessionStorage() {
    const username = sessionStorage.getItem(SESSION_STORAGE_PROFILE_KEY);

    if (username) {
      return JSON.parse(username);
    }

    return {};
  }

  _removeUsernameFromSessionStorage() {
    sessionStorage.removeItem(SESSION_STORAGE_PROFILE_KEY);
  }

  async signUp(username, password) {
    return await this._auth(
      authTypes.signUp, 
      username, 
      password
    );
  }

  // _auth function combines Sign In and Sign Up
  async _auth(type, username, password) {
    if (
      !type ||
      !authTypes[type]
    ) {
      return {};
    }

    const loadingKey = authTypes[type]; 
    const apiUrl = type === authTypes.signIn ? '/api/login/' : '/api/register/';

    this._setLoading(loadingKey, true);

    if (
      !username || 
      !password || 
      !service.request ||
      // if we are already logged in, exit the function
      this.token
    ) {
      // if the user is logged in and tries to log in again
      if (this.token) {
        this._setLoading(loadingKey, false);
        return { success: false, message: 'You are logged' };
      }

      if (!username) {
        this._setLoading(loadingKey, false);
        return { success: false, message: 'Enter your username' };
      }

      if (!password) {
        this._setLoading(loadingKey, false);
        return { success: false, message: 'Enter your password' };
      }

      this._setLoading(loadingKey, false);
      return { success: false, message: 'Something went wrong, please try again later' };
    }

    try {
      const { data } = await service.request.post(apiUrl, {
        username: username,
        password: password,
      });

      if (
        data.success && 
        data.token
      ) {
        runInAction(() => this.token = data.token);
        cookie.set(KEYS.AUTH_TOKEN_KEY, data.token);

        // create axios instance with token in header
        service.createRequest();

        return { success: data.success, message: '' };
      }

      if (
        !data.success &&
        data.message
      ) {
        return { success: data.success, message: data.message}
      }

      return { success: data.success, message: 'Something went wrong' }
    } catch (exception) {
      console.error(exception);

      return { success: false, message: 'Something went wrong' };
    } finally {
      this._setLoading(loadingKey, false);
    }
  }

  signOut() {
    this._setLoading('signOut', true);

    if (this.token) {
      this.token = null;
      cookie.remove(KEYS.AUTH_TOKEN_KEY);

      // create axios instance without token in header
      service.createRequest();

      this._removeUsernameFromSessionStorage();
      this.profile = {};
    }

    this._setLoading('signOut', false);
  }

  _setLoading(key, value) {
    runInAction(() => this.loading = {
      ...this.loading,
      [key]: value,
    })
  }

  _retrieveIdTokenFromCookie() {
    runInAction(() => this.token = cookie.get(KEYS.AUTH_TOKEN_KEY));
  }
}

export const session = new Session();
