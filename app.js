const prompt = require('prompt-sync')()
const os = require('os')
const fs = require('fs')

const webServer = require('./lib/webserver.js')
const { clear } = require('console')

const formatBytes = bytes => {
  let formatted = bytes

  const prefix = [
    '', 'K', 'M', 'G', 'T'
  ]

  let divisions = 0
  while(formatted >= 1024) {
    formatted /= 1024
    divisions ++
  }
  return formatted.toFixed(1) + ' ' + prefix[divisions] + 'B'
}

const osInfo = `
GETTING OS info...
SYSTEM MEMORY ${formatBytes(os.totalmem)}
FREE MEMORY ${formatBytes(os.freemem)}
CPU CORES: ${os.cpus().length}
CPU ARCH: ${os.arch}
PLATFORM: ${os.platform}
RELEASE: ${os.release}
USER: ${os.userInfo().username}
`

const promptToContinue = () => {
  prompt('Press enter to continue...')
  clearScreen()
}

const clearScreen = () => {
  console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n')
}

const menuOptions = {
  exit: 'Exit',
  readFile: 'Read package.json',
  osInfo: 'Display OS info',
  startWebServer: 'Start HTTP server',
}

let runApp = true
// Terminal application
clearScreen()
console.log('- Program started-')
while (runApp) {
  console.log('Choose an option')
  const arr = Object.keys(menuOptions)

  for(let i = 1; i < arr.length; i ++) {
    console.log(i + '. ' + menuOptions[arr[i]])
  }
  console.log('0. ' + menuOptions[arr[0]])

  const input = prompt(': ')

  switch (menuOptions[arr[input]]) {
    case menuOptions.readFile:
      const file = 'package.json'
      const fileContent = fs.readFileSync('./' + file, { encoding: 'utf-8' })
      console.log('\n', file, '\n', fileContent)
      promptToContinue()
      break
    case menuOptions.osInfo:
      console.log(osInfo)
      promptToContinue()
      break
    case menuOptions.startWebServer:
      webServer.start() 
      // if web server was started, break terminal program (listen occupies main thread)
      runApp = false
      break
    case menuOptions.exit:
      process.exit(0)
    default:
      console.log('-Invalid input-\n')
  }
}