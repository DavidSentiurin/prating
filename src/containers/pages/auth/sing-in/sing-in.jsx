import { SignInComponent } from '../../../../pages';
import { useEffect, useState } from 'react';
import { PATHS, REGEX } from '../../../../constants';
import { session } from '../../../../data';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

const ERRORS = {
  USERNAME: 'Incorrect username',
  PASSWORD: 'Incorrect password',
  EMPTY_FIELD: 'This field must not be empty',
}

export const SignInContainer = withRouter(observer((props) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    form: '',
  });

  // if the user is authorized in, redirect him to the previous page
  useEffect(() => {
    if (session.isAuthorized) {
      props.history.go(-1);
    }

    // We only need to check the user's authorization on the first page load, so we hide the react warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitForm = async (event) => {
    event.preventDefault();

    if (errors.form) {
      setErrorsHandler('form', '');
    }

    if (isValidFormData()) {
      const { success, message } = await session.signIn(formData.username, formData.password);

      if (success) {
        // we save the username, since the server does not give the profile, and we need the username to display the review left by the current user
        session.setProfile({
          username: formData.username,
        });

        props.history.go(-1);
        return;
      }

      setErrorsHandler('form', message);
    }
  };

  const isValidFormData = () => {
    let result = true;

    if (!formData.username) {
      setErrorsHandler('username', ERRORS.EMPTY_FIELD);
      result = false;
    }

    if (!formData.password) {
      setErrorsHandler('password', ERRORS.EMPTY_FIELD);
      result = false;
    }
    
    // username validation
    if (
      formData.username &&
      !(new RegExp(REGEX.USERNAME).test(formData.username))
    ) {
      setErrorsHandler('username', ERRORS.USERNAME);
      result = false;
    }

    // password validation
    if (
      formData.password &&
      !(new RegExp(REGEX.PASSWORD).test(formData.password))
    ) {
      setErrorsHandler('password', ERRORS.PASSWORD);
      result = false;
    }

    return result;
  }

  const onChangeUsername = (event) => {
    const username = event.target.value.trim();

    setFormDataHandler('username', username);

    // if the username check is done and we have no errors, clear the username error
    if (
      formData.username &&
      errors.username
    ) {
      setErrorsHandler('username', '');
    }
  };

  const onChangePassword = (event) => {
    const password = event.target.value.trim();

    setFormDataHandler('password', password);

    if (
      formData.password &&
      errors.password
    ) {
      setErrorsHandler('password', '');
    }
  };

  const onClickRegistrationBtn = () => {
    props.history.replace(PATHS.SIGN_UP);
  }

  const setFormDataHandler = (key, value) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const setErrorsHandler = (key, value) => {
    setErrors(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <SignInComponent 
      usernameValue={formData.username}
      usernameError={errors.username}
      passwordValue={formData.password}
      passwordError={errors.password}
      formError={errors.form}
      onSubmitForm={onSubmitForm}
      onChangeUsername={onChangeUsername}
      onChangePassword={onChangePassword}
      onClickRegistrationBtn={onClickRegistrationBtn}
      formDisabled={session.loading.signIn}
    />
  )
}));
