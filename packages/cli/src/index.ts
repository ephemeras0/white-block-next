#!/usr/bin/env node
import { readFile } from '@ephemeras/fs'
import { Profile } from '@ephemeras/profile'
import { cac } from 'cac'
import { resolve } from 'node:url'
import config from './command/config'
import create from './command/create'
import remove from './command/remove'
import { PROJECT_ROOT } from './constant'
import TEXT from './locales/text'

async function run() {
  const configProfile = new Profile({ path: '.white-block/cli/config.json' })
  const lang = configProfile.get('language') || 'en'

  const url = resolve(PROJECT_ROOT, 'package.json')
  const content = await readFile(url, { encoding: 'utf-8' })
  const { version = '' } = JSON.parse(content)
  const cli = cac('wb').version(version)

  cli.command('[root]').action((_: string, options: Record<string, any>) => {
    if (!options.length) {
      cli.outputHelp()
    }
  })

  cli
    .command('add [component]', TEXT.USAGE_COMMAND_ADD)
    .example('  $ wb add <component>')
    .action(async (component: string) => {
      console.log()
      console.log(TEXT.TIP_WELCOME, '\n')
      create(component, lang)
    })

  cli
    .command('remove [component]', TEXT.USAGE_COMMAND_REMOVE)
    .example('  $ wb remove <component>')
    .action(async (component: string) => {
      console.log()
      console.log(TEXT.TIP_WELCOME, '\n')
      remove(component)
    })

  cli
    .command('config [configKey] [configValue]', TEXT.USAGE_COMMAND_CONFIG)
    .option('--list', TEXT.USAGE_COMMAND_CONFIG_LIST)
    .option('--get', TEXT.USAGE_COMMAND_CONFIG_GET)
    .option('--unset', TEXT.USAGE_COMMAND_CONFIG_UNSET)
    .example('  $ wb config --list')
    .example('  $ wb config --get language')
    .example('  $ wb config language zh')
    .example('  $ wb config --unset language')
    .action(
      (
        configKey: string,
        configValue: string,
        options: Record<string, any>
      ) => {
        if (!configKey && Object.keys(options).length === 1) {
          cli.outputHelp()
          return
        }
        config(configKey, configValue, options, configProfile)
      }
    )

  cli.help(() => {})

  cli.parse()
}

run()
