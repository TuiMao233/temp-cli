import klaw, { Item } from 'klaw'
import fs from 'fs-extra'
import ejs from 'ejs'
import path from 'path'
import { compareIncludes, parseFileParmas } from './utils'

export interface TemplateCliConfig {
  input: string
  output: string
  options?: Record<string, any>
  includes?: string[]
}

export async function createTemplate(config: TemplateCliConfig) {
  if (!path.isAbsolute(config.input)) config.input = path.resolve(config.input)
  if (!path.isAbsolute(config.output)) config.output = path.resolve(config.output)
  if (!config.includes) config.includes = []
  if (!config.options) config.options = {}

  const { input, output, includes } = config

  for await (const _item of klaw(input)) {
    const item: Item = _item
    if (item.stats.isDirectory()) continue

    // 1. get file name parmas
    const absolutePath = item.path
    const relativePath = absolutePath.replace(`${input}\\`, '')
    const parmas = parseFileParmas(relativePath)

    // 2. compare includes
    if (!compareIncludes(includes, parmas.includes)) continue

    // 3. If it is an ejs template, use ejs to render
    let content = fs.readFileSync(absolutePath, 'utf-8')
    if (relativePath.endsWith('.ejs')) {
      content = ejs.render(content, config)
    }

    // 4. Splicing, eliminating expression, output file
    const outFilePath = path.join(
      output,
      relativePath.replace('.ejs', '').replace(/\^([^\\]*)\$/g, '')
    )
    await fs.outputFile(outFilePath, content, { flag: 'w' })
  }
}
