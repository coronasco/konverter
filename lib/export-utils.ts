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

export const exportToPdf = async (svgString: string, options?: { width?: number; height?: number; backgroundColor?: string }): Promise<void> => {
  try {
    // Dynamic import of jsPDF to avoid SSR issues
    const { jsPDF } = await import('jspdf')
    
    console.log('📄 Starting PDF export...')
    
    // Create a temporary canvas to get SVG dimensions
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    if (!ctx) {
      throw new Error('Canvas context not available')
    }

    // Create image from SVG to get dimensions
    const img = new Image()
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)

    return new Promise((resolve, reject) => {
      img.onload = () => {
        try {
          // Get SVG dimensions
          const svgWidth = img.width
          const svgHeight = img.height
          
          console.log('📐 SVG dimensions:', svgWidth, 'x', svgHeight)
          
          // Create PDF with A4 size
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
          })
          
          // Get PDF page dimensions
          const pageWidth = pdf.internal.pageSize.getWidth()
          const pageHeight = pdf.internal.pageSize.getHeight()
          
          console.log('📄 Page dimensions:', pageWidth, 'x', pageHeight, 'mm')
          
          // Set margins (10mm on all sides)
          const margin = 10
          const maxWidth = pageWidth - (2 * margin)
          const maxHeight = pageHeight - (2 * margin)
          
          // Calculate scaling to fit SVG within margins
          const svgAspectRatio = svgWidth / svgHeight
          const maxAspectRatio = maxWidth / maxHeight
          
          let finalWidth: number
          let finalHeight: number
          
          if (svgAspectRatio > maxAspectRatio) {
            // SVG is wider - fit to width
            finalWidth = maxWidth
            finalHeight = maxWidth / svgAspectRatio
          } else {
            // SVG is taller - fit to height
            finalHeight = maxHeight
            finalWidth = maxHeight * svgAspectRatio
          }
          
          // Center the image
          const x = margin + (maxWidth - finalWidth) / 2
          const y = margin + (maxHeight - finalHeight) / 2
          
          console.log('🎯 Final dimensions:', finalWidth, 'x', finalHeight, 'mm')
          console.log('📍 Position:', x, ',', y, 'mm')

          // Set background if specified
          if (options?.backgroundColor && options.backgroundColor !== 'transparent') {
            pdf.setFillColor(options.backgroundColor)
            pdf.rect(0, 0, pageWidth, pageHeight, 'F')
          }

          // Convert SVG to high-quality image
          const scale = 3 // Higher resolution for better quality
          canvas.width = svgWidth * scale
          canvas.height = svgHeight * scale
          
          // Clear canvas and set background
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          
          if (options?.backgroundColor && options.backgroundColor !== 'transparent') {
            ctx.fillStyle = options.backgroundColor
            ctx.fillRect(0, 0, canvas.width, canvas.height)
          }
          
          // Scale context and draw SVG
          ctx.scale(scale, scale)
          ctx.drawImage(img, 0, 0, svgWidth, svgHeight)
          
          // Get high-quality data URL
          const dataUrl = canvas.toDataURL('image/png', 1.0)
          
          // Add image to PDF with exact positioning
          pdf.addImage(dataUrl, 'PNG', x, y, finalWidth, finalHeight, undefined, 'FAST')
          
          // Generate filename
          const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
          const filename = `svg-export-${timestamp}.pdf`
          
          // Save PDF
          pdf.save(filename)
          
          console.log('✅ PDF exported successfully:', filename)
          resolve()
          
        } catch (error) {
          console.error('❌ PDF export failed:', error)
          reject(error)
        } finally {
          URL.revokeObjectURL(url)
        }
      }

      img.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error('Failed to load SVG for PDF export'))
      }

      img.src = url
    })
    
  } catch (error) {
    console.error('❌ PDF export failed:', error)
    throw new Error(`PDF export failed: ${error}`)
  }
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