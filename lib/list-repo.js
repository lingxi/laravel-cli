const request = require('request')
const logger = require('../lib/logger')
const filter = require('../lib/filter')
const ora = require('ora')

module.exports = done => {
  /**
   * loading
   */
  const spinner = ora('fetching template repo from github')
  spinner.start()

  request({
    url: 'https://api.github.com/users/LingxiTeam/repos',
    headers: {
      'User-Agent': 'laravel-cli'
    }
  }, (err, res, body) => {
    spinner.stop()

    if (err) logger.fatal(err)

    let requestBody = JSON.parse(body)

    if (Array.isArray(requestBody)) {
      console.log('  Available templates:')
      console.log()

      let repos = filter.getLaravelRepo(requestBody)
      done(repos)
    } else {
      console.error(requestBody.message)
    }
  })
}
