
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const url = import.meta.url

export const getPathFromFiles = (url, filename) => {
    const __filename = fileURLToPath(url)
    const __dirname = dirname(__filename)
    const filePath = join(__dirname, filename)
    return filePath
}

export const getPath = (filename) => {
    const __filename = fileURLToPath(url)
    const __dirname = dirname(__filename)
    const filePath = join(__dirname, filename)
    return filePath
}

export const getDir = (url) => {
    const __filename = fileURLToPath(url)
    const __dirname = dirname(__filename)
    return __dirname
}