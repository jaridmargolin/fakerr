'use strict'

/* -----------------------------------------------------------------------------
 * defaultStackTrace
 * -------------------------------------------------------------------------- */

module.exports = function (err, frames) {
  const description = err.message ? `${err.name}: ${err.message}` : err.name
  const traces = frames.map((frame) => `    at ${frame.toString()}`).join('\n')

  return `${description}\n${traces}`
}
