<h1 align="center">fakerr</h1>
<div align="center">
  <p>Create errors with fake stack traces.</p>
  <div>
  <a href="https://travis-ci.org/jaridmargolin/fakerr"><img src="https://travis-ci.org/jaridmargolin/fakerr.svg?branch=master" alt="Build Status"></a>
  <a href="https://coveralls.io/github/jaridmargolin/fakerr?branch=master"><img src="https://coveralls.io/repos/github/jaridmargolin/fakerr/badge.svg?branch=master" alt="Coverage Status"></a>
  <a href="http://standardjs.com/"><img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg" alt="Standard - JavaScript Style Guide"></a>
  </div>
  <div>
  <a href="https://npmjs.org/package/fakerr"><img src="https://img.shields.io/npm/v/fakerr.svg" alt="NPM fakerr package"></a>
  <a href="https://david-dm.org/jaridmargolin/fakerr"><img src="https://david-dm.org/jaridmargolin/fakerr.svg" alt="Dependency Status"></a>
  <a href="https://david-dm.org/jaridmargolin/fakerr#info=devDependencies"><img src="https://david-dm.org/jaridmargolin/fakerr/dev-status.svg" alt="devDependency Status"></a>
  </div>
</div>
<br>

## Example Usage

```js
const err = fakerr({
  name: 'TypeError',
  message: 'There was a type error',
  stack: [
    { fileName: 'test/test.js', functionName: 'someMethod', lineNumber: 1, columnNumber: 1 }
  ]
})

err.stack
// TypeError: There was a type error
//     at someMethod (test/test.js:1:1)
```

## License

The MIT License (MIT) Copyright (c) 2016 Jarid Margolin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
