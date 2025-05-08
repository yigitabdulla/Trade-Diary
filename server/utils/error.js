export const createError = (status, message) => {
  const err = new Error();
  err.errorStatus=status;
  err.message =message;
  return err;
};