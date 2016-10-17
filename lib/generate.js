const fse = require('fs-extra')
const logger = require('./logger')
const loading = require('./loading')
const getOptions = require('./options')
const newline = require('./newline')
const chalk = require('chalk')

// const ask = require('./ask')
// const filter = require('./filter')

/**
 * Generate a template given a `src` and `dest`.
 *
 * @param {String} type
 * @param {String} src
 * @param {String} dest
 * @param {Function} done
 */

module.exports = function generate (type, src, dest, done) {
  const snipper = loading(`cope template to ${dest}`)
  const options = getOptions(type)
  fse.copy(`${src}/template`, dest, err => {
    snipper.stop()
    if (err) logger.fatal(err)
    displayOption(options)
    done()
  })
}

/**
 * Create a middleware for asking questions.
 *
 * @param {Object} prompts
 * @return {Function}
 */

// function askQuestions (prompts) {
//   return function (files, metalsmith, done) {
//     ask(prompts, metalsmith.metadata(), done)
//   }
// }

/**
 * Create a middleware for filtering files.
 *
 * @param {Object} filters
 * @return {Function}
 */

/**
 * Display options.
 *
 * @param  array options options
 */

function displayOption (options) {
  if (!options.length) {
    logger.warning('No dependence in this repository')
  } else {
    newline()
    console.log(chalk.grey('Prepare some package for you:'))
    options.forEach(option => {
      console.log(
        '  ' + chalk.yellow('*') +
        '  ' + chalk.blue(option.name) +
        ' - ' + option.homepage
      )
    })
  }
}
