'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// lib
const CallSite = require('./callsite')
const defaultStackTrace = require('./default-stacktrace')

/* -----------------------------------------------------------------------------
 * fakerr
 * -------------------------------------------------------------------------- */

module.exports = function (errObj) {
  const knownErrors = { Error, RangeError, SyntaxError, TypeError }
  const ErrorClass = knownErrors[errObj.name] || Error
  const err = Object.assign(new ErrorClass(), errObj)

  if (errObj.stack && errObj.stack.length) {
    const frames = errObj.stack.map((entry) => new CallSite(entry))
    const prepareStackTrace = Error.prepareStackTrace || defaultStackTrace

    err.stack = prepareStackTrace(err, frames)
  }

  return err
}
