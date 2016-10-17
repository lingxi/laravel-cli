const listRepo = require('./list-repo')
const logger = require('./logger')

module.exports = (fullName, done) => {
  listRepo(repos => {
    let repoExist = repos.map(repo => repo.full_name).includes(fullName)
    if (!repoExist) logger.fatal(`  ${fullName} repo not exist. Check http://github.com/lingxiteam`)
    logger.log(`  ${fullName} in our repositories`)
    done()
  })
}
