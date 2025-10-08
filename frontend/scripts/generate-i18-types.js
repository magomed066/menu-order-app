import fs from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function generateTypesFromJson(directory, namespace) {
  const files = fs.readdirSync(directory)
  const types = {}

  files.forEach((file) => {
    if (file.endsWith('.json')) {
      const filePath = join(directory, file)
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      const nsName = file.replace('.json', '')

      types[nsName] = content
    }
  })

  // Get available locales from the locale directory
  const localeDir = join(__dirname, '../src/shared/lib/locale')
  const locales = fs
    .readdirSync(localeDir)
    .filter((item) => fs.statSync(join(localeDir, item)).isDirectory())

  // Generate TypeScript file with interfaces
  let output = ''

  // Add LocaleKeys type dynamically based on available locales
  output += `export type LocaleKeys = ${locales.map((locale) => `'${locale}'`).join(' | ')}\n\n`

  // Generate individual resource interfaces
  Object.entries(types).forEach(([ns, keys]) => {
    const interfaceName = `${ns.charAt(0).toUpperCase() + ns.slice(1)}Resources`

    output += `export interface ${interfaceName} {\n`

    // Add each key with string type
    Object.keys(keys).forEach((key) => {
      output += `  ${key}: string\n`
    })

    output += `}\n\n`
  })

  // Generate the main Resources interface
  output += `// Merge all resources\nexport interface Resources {\n`
  Object.keys(types).forEach((ns) => {
    output += `  ${ns}: ${ns.charAt(0).toUpperCase() + ns.slice(1)}Resources\n`
  })
  output += `}\n`

  fs.writeFileSync(
    join(__dirname, '../src/shared/lib/types/i18next/i18n-types.ts'),
    output
  )
}

// Run for the English directory
generateTypesFromJson(join(__dirname, '../src/shared/lib/locale/en'), 'en')
