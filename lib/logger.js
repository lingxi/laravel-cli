const chalk = require('chalk')

/**
 * Prefix
 */

const prefix = '  laravel-cli'
const sep = chalk.gray('·')

exports.log = msg => {
  console.log()
  console.log(chalk.white(prefix), sep, msg)
}

exports.warning = msg => {
  console.log()
  console.log(chalk.white(prefix), sep, chalk.yellow(msg))
}

exports.fatal = msg => {
  if (msg instanceof Error) {
    msg = msg.message.trim()
  }
  console.log()
  console.error(chalk.red(prefix), sep, msg)
  process.exit(1)
}

exports.success = msg => {
  console.log()
  console.log(chalk.white(prefix), sep, chalk.green(msg))
}
