import readline from 'node:readline'
import os from "os";
import * as path from "path";


import {read} from './components/read.js'
import {create} from './components/create.js'
import {renameFile} from "./components/renameFile.js";
import {moveFile} from "./components/moveFile.js";
import {getFilesList} from "./components/getFilesList.js";
import {remove} from "./components/remove.js";
import {copyFile} from "./components/copyFile.js";
import {hash} from "./components/hash.js";
import {compress} from "./components/compress.js";
import {decompress} from "./components/decompress.js";

export default class App{
    constructor() {
        this.currentPath = os.homedir()
    }

    createNewPath = (value)=> {
        this.currentPath = value
        console.log(`You are currently in ${value}\n`)
    }

    getOS = (command) => {
        switch (command){
            case '--EOL':
                console.log(JSON.stringify(os.EOL))
                break
            case '--cpus':
                const cpus = os.cpus()
                console.log('Overall CPUs:', cpus.length);

                cpus.forEach((cpu, index) => {
                    console.log(`CPU ${index + 1}:`);
                    console.log('Model:', cpu.model);
                    console.log('Clock rate:', cpu.speed / 1000, 'GHz');
                    console.log('--------------------------');
                });
                break
            case '--homedir':
                console.log(os.homedir())
                break
            case '--username':
                console.log(os.userInfo().username)
                break
            case '--architecture':
                console.log(os.arch())
                break
            default:
                console.log(`Invalid input`);
        }
    }

    getCommand = (arg, newPath, otherPath) =>{
        if(arg === 'up'){
            if(this.currentPath === os.homedir()){
                return this.createNewPath(os.homedir())
            } else {
                const newPth = path.resolve(this.currentPath, '..')
                return this.createNewPath(newPth)
            }
        }
        if(arg === 'cd' && !!newPath.length){
            const newPth = path.resolve(this.currentPath, newPath)
            return this.createNewPath(newPth)
        }
        if(arg === 'ls'){
            return getFilesList(this.currentPath)
        }
        if(arg === 'cat' && !!newPath.length){
            return read(newPath)
        }
        if(arg === 'add' && !!newPath.length){
            return create(newPath, this.currentPath)
        }
        if(arg === 'rn' && !!newPath.length && !!otherPath.length){
            return renameFile(newPath, otherPath)
        }
        if(arg === 'cp' && !!newPath.length && !!otherPath.length){
            return copyFile(newPath, otherPath)
        }
        if(arg === 'mv' && !!newPath.length && !!otherPath.length){
            return moveFile(newPath, otherPath)
        }
        if(arg === 'rm' && !!newPath.length){
            return remove(newPath)
        }

        if(arg === 'os' && !!newPath.length){
            return this.getOS(newPath)
        }

        if(arg === 'hash' && !!newPath.length){
            return hash(newPath)
        }

        if(arg === 'compress' && !!newPath.length && !!otherPath.length){
            return compress(newPath, otherPath, this.currentPath)
        }
        if(arg === 'decompress' && !!newPath.length && !!otherPath.length){
            return decompress(newPath, otherPath, this.currentPath)
        }


        console.log('Invalid inputcd')
    }

     start = async () =>{
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        })

        console.log(`You are currently in ${this.currentPath}\n`)

        rl.on('line', (input) => {
            const value = input.split(' ')
            this.getCommand(value[0].trim(), value[1] ? value[1].trim() : null, value[2] ? value[2].trim() : null)
        });

    }
}