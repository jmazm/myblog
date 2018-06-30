const ModelError = require('../models/modelerror')

module.exports = function (e) {
  let errorObj = {}

  switch (e.code) { // just use default MySQL messages for now
    case 'ER_BAD_NULL_ERROR':
    case 'ER_NO_REFERENCED_ROW_2':
    case 'ER_NO_DEFAULT_FOR_FIELD':
      errorObj = new ModelError(403, e.message) // Forbidden
    case 'ER_DUP_ENTRY':
      errorObj = new ModelError(409, e.message) // Conflict
    case 'ER_BAD_FIELD_ERROR':
      errorObj = new ModelError(500, e.message) // Internal Server Error for programming errors
    default:
      errorObj = new ModelError(500, e.message) // Internal Server Error for uncaught exception
  }

  return errorObj
}
