import {createReadStream} from 'fs'
import {getPathFromFiles} from "../utils/getPathFromFiles.js";

// node 01-read-file
export const read = async () => {
    try {
        const filePath = getPathFromFiles(import.meta.url, 'text.txt')
        const stream = await createReadStream(filePath)
        stream.pipe(process.stdout)
    } catch (e) {
        console.log( e )
    }
}

await read()