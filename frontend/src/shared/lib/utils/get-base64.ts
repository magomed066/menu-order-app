function isBlob(file: any): file is Blob {
  return file instanceof Blob || file instanceof File
}

export function getBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    // Check if the parameter is a valid Blob/File
    if (!(file instanceof Blob)) {
      reject(new Error('Parameter must be a File or Blob object'))
      return
    }

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = function () {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Failed to convert file to base64 string'))
      }
    }

    reader.onerror = function (error) {
      reject(new Error(`File reading error: ${error}`))
    }

    reader.onabort = function () {
      reject(new Error('File reading was aborted'))
    }
  })
}
