const getImageReader = async image => {
  return new Promise((resolve, reject) => {
    if (image) {
      try {
        const fileReader = new FileReader()

        fileReader.onload = () => {
          resolve(fileReader.result)
        }

        fileReader.onerror = error => {
          reject(error)
        }

        fileReader.readAsDataURL(image)
      } catch (error) {
        reject(error)
      }
    } else {
      resolve(null)
    }
  })
}

export default getImageReader
