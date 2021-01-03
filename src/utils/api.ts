const isNotSuccess = (statusCode: number): boolean => statusCode / 100 !== 2;

export default isNotSuccess;
