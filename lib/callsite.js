'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

const CallSiteToString = require('./callsite-tostring')

/* -----------------------------------------------------------------------------
 * CallSite
 * -------------------------------------------------------------------------- */

module.exports = class CallSite {

  constructor (props) {
    // closest we can get to hiding the property
    Object.defineProperty(this, '__props', { value: props })
  }

  toString () {
    return CallSiteToString(this)
  }

  getThis () {
    return this.__props['this']
  }

  getTypeName () {
    return this.__props['typeName']
  }

  getFunction () {
    return this.__props['function']
  }

  getFunctionName () {
    return this.__props['functionName']
  }

  getMethodName () {
    return this.__props['methodName']
  }

  getFileName () {
    return this.__props['fileName']
  }

  getLineNumber () {
    return this.__props['lineNumber']
  }

  getColumnNumber () {
    return this.__props['columnNumber']
  }

  getEvalOrigin () {
    return this.__props['evalOrigin']
  }

  isToplevel () {
    return this.__props['isToplevel']
  }

  isEval () {
    return this.__props['isEval']
  }

  isNative () {
    return this.__props['isNative']
  }

  isConstructor () {
    return this.__props['isConstructor']
  }

}
