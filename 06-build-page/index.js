import {getDir} from "../utils/getPathFromFiles.js";
import {mkdir, readdir, readFile, writeFile} from 'fs/promises'
import {join} from 'path'
import {createReadStream, createWriteStream} from 'fs'
import {createBundle} from "../05-merge-styles/index.js";
import {copyDir} from "../04-copy-directory/index.js";

const url = import.meta.url

export const htmlBuild = async () => {
    const dirPath = getDir( url )
    const folder = 'project-dist'
    const fileName = 'template.html'
    const from = 'components'
    const to = 'index.html'

    try {
        await mkdir( join(dirPath, folder), { recursive: true } )

        await createBundle('style.css', url)
        const folderList = await readdir( join(dirPath, 'assets'))

        // проходим по папкам и копируем содержимое
        for ( let key in folderList) {
            const folderName = folderList[key]
            await copyDir( url,`assets/${folderName}`, `project-dist/assets/${folderName}`)
        }

        new Promise( (res, rej) => {
            const readStream = createReadStream( join(dirPath, fileName),  {encoding:'utf-8'} )

            let data = ''
            readStream.on('data', chunk => {
                data = data + chunk
            })

            readStream.on('end', () => {
                console.log( data )
                res(data.trim())
            })
        }).then( async (data) => {
            const fileList = await readdir(join(dirPath, from))

            for (let key in fileList) {
                const fileName = fileList[key]

                let component = ''
                const readStream = createReadStream( join(dirPath, from, fileName))
                const writeStream = createWriteStream( join(dirPath, folder, to))

                readStream.on('data', chunk => {
                    component += chunk
                })

                readStream.on('end', () => {
                    data = data.replace(`{{${fileName.split('.')[0]}}}`, component)
                    readStream.close()
                })

                readStream.on('close', () => {
                    writeStream.write( data )
                })

            }
        })
    } catch (e) {

    }
}

await htmlBuild()