'use strict'

/* -----------------------------------------------------------------------------
 * CallSiteToString
 * -------------------------------------------------------------------------- */

module.exports = function (frame) {
  const fileLocation = getFileLocation(frame)

  // Fixes shim to be backward compatable with Node v0 to v4
  const typeName = frame.getTypeName() === '[object Object]' ? 'null' : frame.getTypeName()
  const functionName = frame.getFunctionName()
  const methodName = frame.getMethodName()

  if (frame.isConstructor()) {
    return `new ${functionName || '<anonymous>'} (${fileLocation})`
  }

  if (frame.isToplevel()) {
    return functionName
      ? `${functionName} (${fileLocation})`
      : `${fileLocation}`
  }

  if (!functionName) {
    return `${typeName}.${methodName || '<anonymous>'} (${fileLocation})`
  }

  const shouldAddType = typeName && functionName.indexOf(typeName) !== 0
  const definition = shouldAddType ? `${typeName}.${functionName}` : functionName

  return methodName && functionName.indexOf(`.${methodName}`) !== functionName.length - methodName.length - 1
    ? `${definition} [as ${methodName}] (${fileLocation})`
    : `${definition} (${fileLocation})`
}

const getFileLocation = function (frame) {
  if (frame.isNative()) {
    return 'native'
  }

  let fileLocation = ''

  if (!frame.getFileName() && frame.isEval()) {
    fileLocation = `${frame.getEvalOrigin()}, ` // Expecting source position to follow.
  }

  fileLocation += frame.getFileName() || '<anonymous>'
  fileLocation += getPosition(frame) ? `:${getPosition(frame)}` : ''

  return fileLocation
}

const getPosition = function (frame) {
  if (frame.getLineNumber() == null) {
    return null
  }

  return frame.getColumnNumber()
    ? `${frame.getLineNumber()}:${frame.getColumnNumber()}`
    : `${frame.getLineNumber()}`
}
