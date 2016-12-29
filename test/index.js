/* eslint-env mocha */
'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// 3rd party
const assert = require('chai').assert

// lib
const fakerr = require('../lib/index')

/* -----------------------------------------------------------------------------
 * reusable
 * -------------------------------------------------------------------------- */

const getErrors = function (genError) {
  let frames
  Error.prepareStackTrace = function (_err, callsites) {
    frames = getFrames(callsites)
  }

  const real = genError()
  real.stack // because stack is lazy evaluated

  delete Error.prepareStackTrace

  const temp = genError()
  temp.stack = temp.stack.replace('test/index.js:29:16', 'test/index.js:24:16')

  return { real, temp, frames }
}

const getFrames = function (callsites) {
  return callsites.map((callsite) => ({
    this: callsite.getThis(),
    typeName: callsite.getTypeName(),
    function: callsite.getFunction(),
    functionName: callsite.getFunctionName(),
    methodName: callsite.getMethodName(),
    fileName: callsite.getFileName(),
    lineNumber: callsite.getLineNumber(),
    columnNumber: callsite.getColumnNumber(),
    evalOrigin: callsite.getEvalOrigin(),
    isToplevel: callsite.isToplevel(),
    isEval: callsite.isEval(),
    isNative: callsite.isNative(),
    isConstructor: callsite.isConstructor()
  }))
}
/* -----------------------------------------------------------------------------
 * fakerr
 * -------------------------------------------------------------------------- */

describe('fakerr', function () {
  it('Should try to mimic error specified by name', function () {
    const rangeError = fakerr({ name: 'RangeError' })
    const syntaxError = fakerr({ name: 'SyntaxError' })
    const typeError = fakerr({ name: 'TypeError' })
    const customError = fakerr({ name: 'Custom' })

    assert.instanceOf(rangeError, RangeError)
    assert.instanceOf(syntaxError, SyntaxError)
    assert.instanceOf(typeError, TypeError)
    assert.instanceOf(customError, Error)
  })

  it('Should mimic output with error msg', function () {
    const { real, temp, frames } = getErrors(function () {
      return new Error('test')
    })

    const err = fakerr({ name: real.name, message: real.message, stack: frames })
    assert.equal(err.stack, temp.stack)
  })

  it('Should mimic output without error msg', function () {
    const { real, temp, frames } = getErrors(function () {
      return new Error()
    })

    const err = fakerr({ name: real.name, message: real.message, stack: frames })
    assert.equal(err.stack, temp.stack)
  })

  it('Should mimic output with eval error', function () {
    const { real, temp, frames } = getErrors(function () {
      return eval('new Error()') // eslint-disable-line
    })

    const err = fakerr({ name: real.name, message: real.message, stack: frames })
    assert.equal(err.stack, temp.stack)
  })

  it('Should mimic output with constructor', function () {
    const { real, temp, frames } = getErrors(function () {
      const Class = function () { return new Error() }
      return new Class()
    })

    const err = fakerr({ name: real.name, message: real.message, stack: frames })
    assert.equal(err.stack, temp.stack)
  })
})
