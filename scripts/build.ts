import { execSync as exec } from 'child_process'
import fs from 'fs-extra'
import path from 'path'
import { cwd } from 'process'

const FILES_COPY_LOCAL = ['package.json', 'LICENSE', 'README.md', 'README_CN.md']

const buildMetaFiles = async () => {
  for (const file of FILES_COPY_LOCAL) {
    await fs.copyFile(file, path.resolve(cwd(), 'dist', file))
  }
}

const build = async () => {
  exec('tsc')
  buildMetaFiles()
}

async function cli() {
  try {
    await build()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

if (require.main === module) cli()
