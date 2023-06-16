export const timeoutPromise = ms =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(null)
    }, ms)
  })
