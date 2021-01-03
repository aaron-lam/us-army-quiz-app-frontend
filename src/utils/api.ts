const isNotSuccess = (statusCode: number): boolean => {
  const statusCodeFirstDigit = Math.floor(statusCode / 100);
  return statusCodeFirstDigit === 4 || statusCodeFirstDigit === 5;
};

export default isNotSuccess;
