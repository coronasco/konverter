interface ExportOptions {
  format: string
  width: number
  height: number
  backgroundColor: string
  quality?: number
}

export const exportToImage = async (svgString: string, options: ExportOptions): Promise<void> => {
  const { format, width, height, backgroundColor, quality = 90 } = options

  // Create a canvas element
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  if (!ctx) {
    throw new Error('Canvas context not available')
  }

  // Set canvas size
  canvas.width = width
  canvas.height = height

  // Set background
  if (backgroundColor !== 'transparent') {
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)
  }

  // Create image from SVG
  const img = new Image()
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(svgBlob)

  return new Promise((resolve, reject) => {
    img.onload = () => {
      // Calculate scaling to fit SVG in canvas
      const svgAspectRatio = img.width / img.height
      const canvasAspectRatio = width / height
      
      let drawWidth = width
      let drawHeight = height
      let offsetX = 0
      let offsetY = 0

      if (svgAspectRatio > canvasAspectRatio) {
        // SVG is wider than canvas
        drawHeight = width / svgAspectRatio
        offsetY = (height - drawHeight) / 2
      } else {
        // SVG is taller than canvas
        drawWidth = height * svgAspectRatio
        offsetX = (width - drawWidth) / 2
      }

      // Draw SVG on canvas
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)

      // Convert to desired format
      let mimeType: string
      let filename: string

      switch (format) {
        case 'png':
          mimeType = 'image/png'
          filename = `svg-export-${width}x${height}.png`
          break
        case 'jpg':
          mimeType = 'image/jpeg'
          filename = `svg-export-${width}x${height}.jpg`
          break
        case 'webp':
          mimeType = 'image/webp'
          filename = `svg-export-${width}x${height}.webp`
          break
        default:
          mimeType = 'image/png'
          filename = `svg-export-${width}x${height}.png`
      }

      // Export canvas
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = filename
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
            resolve()
          } else {
            reject(new Error('Failed to create blob'))
          }
        },
        mimeType,
        quality / 100
      )

      URL.revokeObjectURL(url)
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load SVG'))
    }

    img.src = url
  })
}

export const exportToPdf = async (): Promise<void> => {
  // For PDF export, we'll use jsPDF library
  // This is a placeholder - you'd need to install jsPDF
  console.log('PDF export not implemented yet')
  throw new Error('PDF export not implemented yet')
}

export const exportIconSet = async (svgString: string, sizes: number[], options: ExportOptions): Promise<void> => {
  const exportPromises = sizes.map(size => 
    exportToImage(svgString, {
      ...options,
      width: size,
      height: size,
      quality: 100
    })
  )

  await Promise.all(exportPromises)
}

export const getExportFilename = (format: string, width: number, height: number): string => {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
  return `svg-export-${width}x${height}-${timestamp}.${format}`
} 