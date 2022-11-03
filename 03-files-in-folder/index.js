import {getDir} from "../utils/getPathFromFiles.js";
import {join, extname} from 'path'
import {stat} from 'fs'
import {readdir} from "fs/promises";
const url = import.meta.url

// Запустите в консоли: node 03-files-in-folder

export const lsDir = async () => {

    const dirPath = getDir( url )
    const src = join( dirPath, 'secret-folder' )

    try {
        const objList = await readdir( src, {withFileTypes: true})

        objList.forEach( obj => {
            if (obj.isFile()) {
                const nameArr = obj.name.split('.')

                stat( join( src, obj.name ), (errors, stats) => {
                    nameArr.push((stats.size/1024).toFixed(3)+'kb')
                    console.log( nameArr.join('-'))
                })
            }
        })
    } catch (e) {

    }
}

await lsDir()

// Данные должны быть выведены в формате <имя файла>-<расширение файла>-<вес файла>.
// Пример: example - txt - 128.369kb