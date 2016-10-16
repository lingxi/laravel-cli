const ora = require('ora')

module.exports = msg => {
  const spinner = ora(msg)
  spinner.start()
  return spinner
}
