export const message_type_fail = 0
export const message_type_success = 1
export const message_type_invalid = 2
export const message_success = "Success"
export const message_fail = "Fail"
export const message_invalid = "Invalid Login"

export const CommonResponse = {
  success: (res, message, data = [], statusCode = 200) => {
    return res.status(statusCode).json({
        "message_type" : message_type_success, 
        "message" : message_success ,
        "display_message" : message,
        "data":data
    });
  },

  fail: (res, message, data = [], statusCode = 200) => {
    return res.status(statusCode).json({
        "message_type" : message_type_fail, 
        "message" : message_fail ,
        "display_message" : message,
        "data":data
    });
  },

  error: (res, message, statusCode = 500) => {
    return res.status(statusCode).json({
        "message_type" : message_type_fail, 
        "message" : message_fail ,
        "display_message" : "Some error occered, try after sometime." + message,
        "data":[]
    });
  }
};