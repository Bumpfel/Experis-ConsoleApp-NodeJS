const prompt = require('prompt-sync')()
const os = require('os')
const webServer = require('./lib/webserver.js')
const fs = require('fs')

const osInfo = `
GETTING OS info...
SYSTEM MEMORY ${(os.totalmem / Math.pow(1024, 3)).toFixed(1)} GB
`

const promptToContinue = () => {
  prompt('Press any key to continue...')
}

let exit = false
// Terminal application
while (true) {
  console.log('\nProgram started')
  console.log('\n\n\n\n\n\n\n\n\n')
  console.log('Choose an option')
  console.log('1. Read package.json')
  console.log('2. Display OS info')
  console.log('3. Start HTTP server')
  console.log('0. Exit')

  const input = prompt(': ')

  switch (input) {
    case '1':
      const file = 'package.json'
      const fileContent = fs.readFileSync('./' + file, { encoding: 'utf-8' })
      console.log('\n', file, '\n', fileContent)
      promptToContinue()
      break
    case '2':
      console.log(osInfo)
      promptToContinue()
      break
    case '3':
      webServer.start()
      exit = true
      break
    case '0':
      process.exit(0)
    default:
      console.log('Invalid input')
  }

  // if web server was started, break terminal program (listen occupies main thread)
  if(exit) {
    break
  }
}