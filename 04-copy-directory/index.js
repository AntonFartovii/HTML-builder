import {getDir} from "../utils/getPathFromFiles.js";
import {readdir, mkdir, rm} from "fs/promises"
import {createReadStream, createWriteStream} from "fs";
import {join} from "path"
const url = import.meta.url

// Запустите в консоли: node 04-copy-directory

export const copyDir = async ( url, from, to ) => {
    const dirPath = getDir( url )

    try {
        await rm( join(dirPath, to ), {recursive: true, force: true});
        // Чтение содержимого папки files
        const filesList = await readdir ( join(dirPath, from ))

        // Создание папки files-copy в случае если она ещё не существует
        await mkdir( join(dirPath, to), { recursive: true })

        // Копирование файлов из папки files в папку files-copy
        filesList.forEach( file => {

            const readStream  = createReadStream( join(dirPath, from, file) )
            const writeStream = createWriteStream( join(dirPath, to, file) )

            writeStream.write('')

            readStream.on('data', chunk => {
                writeStream.write(chunk)
            });

            readStream.on('end', () => {
                writeStream.end()
            })
        })
    } catch (e) {
        console.log('Памылка')
    }
}

await copyDir( url, 'files', 'files-copy')

import path, {dirname} from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import './files/c'
const random = Math.random();

import {fileURLToPath} from 'url'
const __filename = fileURLToPath( import.meta.url )
const __dirname = dirname(__filename)

const unknownObject =  random > 0.5
    ? await import('./files/a.json', {assert: { type: 'json'}})
: await import('./files/b.json', {assert: { type: 'json'}})


console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export {
    unknownObject,
    myServer,
};

