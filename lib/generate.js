const async = require('async')
const fse = require('fs-extra')
const path = require('path')
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

function askQuestions (prompts) {
  return function (files, metalsmith, done) {
    ask(prompts, metalsmith.metadata(), done)
  }
}

/**
 * Create a middleware for filtering files.
 *
 * @param {Object} filters
 * @return {Function}
 */

function filterFiles (filters) {
  return function (files, metalsmith, done) {
    filter(files, filters, metalsmith.metadata(), done)
  }
}

/**
 * Template in place plugin.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */

function renderTemplateFiles (files, metalsmith, done) {
  var keys = Object.keys(files)
  var metalsmithMetadata = metalsmith.metadata()
  async.each(keys, function (file, next) {
    var str = files[file].contents.toString()
    // do not attempt to render files that do not have mustaches
    if (!/{{([^{}]+)}}/g.test(str)) {
      return next()
    }
    render(str, metalsmithMetadata, function (err, res) {
      if (err) return next(err)
      files[file].contents = new Buffer(res)
      next()
    })
  }, done)
}

/**
 * Display template complete message.
 *
 * @param {String} message
 * @param {Object} data
 */

function logMessage (message, data) {
  if (!message) return
  render(message, data, function (err, res) {
    if (err) {
      console.error('\n   Error when rendering template complete message: ' + err.message.trim())
    } else {
      console.log('\n' + res.split(/\r?\n/g).map(function (line) {
        return '   ' + line
      }).join('\n'))
    }
  })
}

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
    console.log(chalk.grey('Prepare some package for you:'));
    options.forEach(option => {
      console.log(
        '  ' + chalk.yellow('*') +
        '  ' + chalk.blue(option.name) +
        ' - ' + option.homepage
      )
    })
  }
}
