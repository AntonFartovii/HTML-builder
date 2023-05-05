import {getDir} from "../utils/getPathFromFiles.js";
import {join} from 'path'
import {stat} from 'fs'
import {readdir} from "fs/promises";
const url = import.meta.url

// Запустите в консоли: node 03-files-in-folder

export const lsDir = async () => {

    const dirPath = getDir( url )
    const src = join( dirPath, 'secret-folder' )

    try {
        const files = await readdir( src, {withFileTypes: true})

        for( const file of files)

            if (file.isFile()) {

                const fileStats = await stat(file)

            }

    } catch (e) {
        console.log( e )
    }
}

await lsDir()

// Данные должны быть выведены в формате <имя файла>-<расширение файла>-<вес файла>.
// Пример: example - txt - 128.369kb