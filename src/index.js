function isObject(x) {
  const type = typeof x
  return x !== null && (type === 'object' || type === 'function')
}

const defaultOptions = {
  stopOnError: true,
  timeout: Infinity,
  delay: 20
}

function asyncInterval(func, options = {}, ...args) {
  options = isObject(delay)
    ? { ...defaultOptions, ...options }
    : { ...defaultOptions, delay: options }

  return new Promise((rootResolve, rootReject) => {
    const callFunc = () => {
      if (currentIteration === settings.iterations || stopRequested) {
        rootPromiseResolve()
        return
      }

      setTimeout(() => {
        const returnVal = func(...args)

        returnVal.then(callFunc).catch(err => {
          if (options.stopOnError) {
            rootReject(err)
            return
          }

          callFunc()
        })
      }, options.delay)
    }

    callFunc(1)
  })
}
