import os from 'os'
import App from './app.js'
const welcome = (name) => {
    console.log(`Welcome to the File Manager, ${name}!`)
}

const exit = (name) => {
    console.log(`Thank you for using File Manager, ${name}, goodbye!`)
}

const args = process.argv
const name = args ? args[args.length-1].split('=')[1] : 'anonym'

welcome(name)
process.on('exit', ()=> exit(name))

const app = new App()
await app.start()