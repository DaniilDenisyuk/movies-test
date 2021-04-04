export const required = (value, errMess) =>
  value || typeof value === "number" ? undefined : errMess;

export const maxLength = (max, errMess) => (value) =>
  value && value.length > max ? errMess : undefined;

export const minLength = (min, errMess) => (value) =>
  value && value.length < min ? errMess : undefined;

export const number = (value, errMess) =>
  value && isNaN(Number(value)) ? errMess : undefined;

export const minValue = (min, errMess) => (value) =>
  value && value < min ? errMess : undefined;

export const alphaNumeric = (value, errMess) =>
  value && /[^a-zA-Z0-9 ]/i.test(value) ? errMess : undefined;

export const email = (value, errMess = "Not valid values") =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? errMess
    : undefined;
export const phoneNumber = (value, errMess = "Not valid values") =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value) ? errMess : undefined;

export const password = (value, errMess = "must containe") =>
  value && !/^.{8}$/i.test(value) ? errMess : undefined;

export const phoneOrEmail = (value, errMess) => {
  if (!phoneNumber(value) || !email(value)) {
    return errMess;
  }
  return undefined;
};
