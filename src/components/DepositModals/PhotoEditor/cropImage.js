export const createImage = url =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener("load", () => resolve(image))
    image.addEventListener("error", error => reject(error))
    image.setAttribute("crossOrigin", "anonymous") // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })
/**
 * Returns the new bounding area of a rotated rectangle.
 */
/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export default async function getCroppedImg(imageSrc, type, pixelCrop, preview = false) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement("canvas")
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext("2d")

  const ext = type.split('/')[1]

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  if (preview) {
    return canvas.toDataURL(type)
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob(blog => {
      const file = new File([blog], `avatar.${ext}`, { type })

      resolve(file);
    })
  })
}
