import {mkdir, readdir} from "fs/promises";
import {getDir} from "../utils/getPathFromFiles.js";
import {join, extname} from 'path'
import {createReadStream, createWriteStream} from "fs";
const url = import.meta.url

// Запустите в консоли: node 05-merge-styles

export const bundle = async () => {
    const dirPath = getDir( url )
    const from = 'styles'
    const to = 'project-dist'

    // Создание папки files-copy в случае если она ещё не существует
    await mkdir( join(dirPath, to), { recursive: true })

    try {
        const fileList = await readdir( join(dirPath, from))
        let readStream
        const writeStream = createWriteStream( join(dirPath, to, 'bundle.css') )
        writeStream.write('')

        fileList.forEach( file => {
            if ( extname(file) === '.css') {

                readStream  = createReadStream( join(dirPath, from, file) )
                readStream.on('data', chunk => {
                    writeStream.write(chunk)
                });
            }
        })

        readStream.on('end', () => {
            writeStream.end()
        })

    } catch (e) {

    }
}

await bundle()

// После завершения работы скрипта в папке project-dist должен
// находиться файл bundle.css содержащий стили из всех файлов папки styles.