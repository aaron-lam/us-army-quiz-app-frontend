const isNotSuccess = (statusCode: number): boolean => statusCode / 100 === 4 || statusCode / 100 === 5;

export default isNotSuccess;
