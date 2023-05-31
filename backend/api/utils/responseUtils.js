/**
 * Sets error to the response.
 * @param {Object} error - Error Object 
 * @param {Response} response - Response Object to the client
 */
 export const setErrorResponse=(error, response)=>{
    response.status(500);
    response.json(error);
  }
  
  /**
   * Sets response code and body to the response.
   * @param {int} statusCode - Response status code 
   * @param {Object} object - Response body object 
   * @param {Response} response - Response Object to the client
   */
  export const setSuccessResponse=(statusCode,object, response)=>{
    response.status(statusCode);
    response.json(object);
  }
  