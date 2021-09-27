#!/usr/bin/env node
import cac from 'cac'
import { createTemplate } from '..'
import consola from 'consola'

const cli = cac('templa-cli')

cli
  .command('')
  .option('--input <dir>', 'input dir path')
  .option('--output <dir>', 'output dir path')
  .option('--includes [type]', 'includes type')
  .action((options) => {
    if (typeof options.input === 'undefined') {
      consola.error('Please enter --input <dir>.')
      return
    }
    if (typeof options.output === 'undefined') {
      consola.error('Please enter --output <dir>.')
      return
    }
    createTemplate(options)
  })

cli.help()

cli.parse()
