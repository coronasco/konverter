export interface ParsedIconFile {
  id: string
  fileName: string
  componentName: string
  viewBox: string
  svg: string
  innerSvg: string
}

function toPascalCase(value: string) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

function toKebabCase(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

function toCamelCaseAttribute(attribute: string) {
  if (attribute === 'class') return 'className'
  if (attribute === 'xmlns:xlink') return 'xmlnsXlink'
  if (attribute === 'xml:space') return 'xmlSpace'
  return attribute.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase())
}

function ensureViewBox(svg: string) {
  if (svg.includes('viewBox=')) {
    return svg
  }

  const width = svg.match(/width="([^"]+)"/)?.[1]
  const height = svg.match(/height="([^"]+)"/)?.[1]
  if (width && height) {
    return svg.replace('<svg', `<svg viewBox="0 0 ${width} ${height}"`)
  }

  return svg.replace('<svg', '<svg viewBox="0 0 24 24"')
}

function normalizeSvgString(svg: string, useCurrentColor: boolean) {
  let normalized = svg
    .replace(/<\?xml[\s\S]*?\?>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim()

  normalized = ensureViewBox(normalized)
  normalized = normalized.replace(/\s+(width|height)="[^"]*"/g, '')
  normalized = normalized.replace(/\s?class="[^"]*"/g, '')
  normalized = normalized.replace(/\s?data-name="[^"]*"/g, '')

  if (useCurrentColor) {
    normalized = normalized.replace(
      /(fill|stroke)="(?!none|currentColor)([^"]+)"/g,
      '$1="currentColor"'
    )
  }

  normalized = normalized
    .replace(/([:@a-zA-Z0-9-]+)=/g, (match, attribute) => `${toCamelCaseAttribute(attribute)}=`)
    .replace(/<([a-zA-Z][^>\s]*)([^>]*)\/>/g, '<$1$2 />')

  return normalized
}

function getOuterAttributes(svg: string) {
  return svg.match(/<svg([^>]*)>/)?.[1] ?? ''
}

export function parseIconFiles(
  files: Array<{ name: string; content: string }>,
  useCurrentColor: boolean
) {
  const usedNames = new Set<string>()

  return files.map((file) => {
    const baseName = file.name.replace(/\.svg$/i, '')
    const componentSeed = toPascalCase(baseName) || 'Icon'
    let componentName = componentSeed
    let fileName = toKebabCase(baseName) || 'icon'
    let suffix = 2

    while (usedNames.has(fileName)) {
      fileName = `${toKebabCase(baseName)}-${suffix}`
      componentName = `${componentSeed}${suffix}`
      suffix += 1
    }

    usedNames.add(fileName)

    const normalizedSvg = normalizeSvgString(file.content, useCurrentColor)
    const viewBox = normalizedSvg.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 24 24'
    const innerSvg = normalizedSvg.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '').trim()

    return {
      id: fileName,
      fileName,
      componentName,
      viewBox,
      svg: normalizedSvg,
      innerSvg,
    } satisfies ParsedIconFile
  })
}

export function generateReactComponent(icon: ParsedIconFile) {
  const outerAttributes = getOuterAttributes(icon.svg)

  return `import type { SVGProps } from 'react'

export function ${icon.componentName}(props: SVGProps<SVGSVGElement>) {
  return (
    <svg${outerAttributes} {...props}>
      ${icon.innerSvg}
    </svg>
  )
}

export default ${icon.componentName}
`
}

export function generateVueComponent(icon: ParsedIconFile) {
  const outerAttributes = getOuterAttributes(icon.svg).replace(/\sclassName=/g, ' class=')

  return `<template>
  <svg${outerAttributes} v-bind="$attrs">
    ${icon.innerSvg.replace(/className=/g, 'class=')}
  </svg>
</template>

<script setup lang="ts">
defineOptions({ name: '${icon.componentName}' })
</script>
`
}

export function generateSprite(iconFiles: ParsedIconFile[]) {
  const symbols = iconFiles
    .map(
      (icon) =>
        `  <symbol id="${icon.fileName}" viewBox="${icon.viewBox}">\n    ${icon.innerSvg}\n  </symbol>`
    )
    .join('\n')

  return `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\n${symbols}\n</svg>\n`
}

export function generateReactIndex(iconFiles: ParsedIconFile[]) {
  return iconFiles
    .map((icon) => `export { ${icon.componentName} } from './${icon.componentName}'`)
    .join('\n')
}

export function generateVueIndex(iconFiles: ParsedIconFile[]) {
  return iconFiles
    .map((icon) => `export { default as ${icon.componentName} } from './${icon.componentName}.vue'`)
    .join('\n')
}
