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