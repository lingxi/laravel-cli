module.exports = () => {
  console.log()
  process.on('exit', function () {
    console.log()
  })
}
