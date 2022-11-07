import process from 'process';
import {createWriteStream} from 'fs'
import {getPathFromFiles} from "../utils/getPathFromFiles.js";
import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process'

// node 02-write-file

export const write = async () => {
    try {
        const rl = readline.createInterface({
            input,
            output
        });

        const filePath = getPathFromFiles(import.meta.url, 'text.txt')
        const stream = await createWriteStream(filePath)

        process.stdout.write('Напишите что-нибудь в файл:\n')

        rl.on('SIGINT', () => rl.close())

        rl.on('line', data => {
            data.toString().trim() === 'exit'
                ? rl.close()
                : stream.write(data+'\n')
        })

        rl.on('close',  () => {
            process.stdout.write('Да пабачэння!\n')
        })



    } catch (e) {
        console.log( e )
    }
}

await write()
