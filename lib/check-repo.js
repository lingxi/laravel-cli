const listRepo = require('./list-repo')
const logger = require('./logger')
const chalk = require('chalk')

module.exports = (fullName, done) => {
  listRepo(repos => {
    let repoExist = repos.map(repo => repo.full_name).includes(fullName)
    if (!repoExist) logger.fatal(`  ${fullName} repo not exist.`)
    console.log(chalk.grey(`  ${fullName} in our repositories`))
    done()
  })
}
