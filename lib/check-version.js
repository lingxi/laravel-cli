const packageConfig = require('../package.json')
const exec = require('child_process').exec
const logger = require('./logger')

module.exports = done => {
  // Parse version number from strings such as 'v7.0.1' or `>=5.6.4'
  function parseVersionNumber (versionString) {
    return versionString.replace(/[^\d\.]/g, '')
  }

  function parseVersionNumberFromExec (text) {
    let result = text.match(/PHP ((\d\.){1,2}\d{1,})/)
    if (result === null) {
      return false
    }
    return result[1]
  }

  function checkVersionValue (current, min) {
    let splitedVersion1 = current.split('.').map(i => parseInt(i, 10))
    let splitedVersion2 = min.split('.').map(i => parseInt(i, 10))
    let length = Math.max(splitedVersion1.length, splitedVersion2.length)
    let result = 0

    for (let i = 0; i < length; i++) {
      if (splitedVersion1[i] > splitedVersion2[i]) {
        result = 1
        break
      } else if (splitedVersion1[i] < splitedVersion2[i]) {
        result = -1
        break
      }
    }
    return result >= 0
  }

  // Ensure minimum supported php version is used
  let minPHPVersion = parseVersionNumber(packageConfig.engines.php)
  exec('php -v', (err, result) => {
    if (err) logger.fatal(err)
    let currentPHPVersion = parseVersionNumberFromExec(result)
    if (currentPHPVersion) {
      if (checkVersionValue(currentPHPVersion, minPHPVersion)) {
        done()
      } else {
        logger.fatal('PHP version must not less than 5.6.4')
      }
    } else {
      logger.fatal('Unknow error.')
    }
  })
}
