export const REGEX = {
  USERNAME: /[a-z0-9-_]{3,32}/gi,
  PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
}