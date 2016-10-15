const prefix = require('./config').prefix

exports.getLaravelRepo = repos => {
  return repos.filter(repo => {
    return repo.name.startsWith(prefix)
  })
}
