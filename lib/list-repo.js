const request = require('request')
const logger = require('../lib/logger')
const filter = require('../lib/filter')
const packageConfig = require('../package.json')
const repoUrl = require('./config').repoUrl
const loading = require('./loading')

module.exports = done => {
  /**
   * loading
   */
  const spinner = loading('fetching template repo from github')

  request({
    url: repoUrl,
    headers: {
      'User-Agent': packageConfig.name
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
