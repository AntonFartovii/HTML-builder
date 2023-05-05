import {createReadStream} from 'fs';
import {getFilePath} from '../utils/getFilePath.js';
const url = import.meta.url

// node 01-read-file
export const read = async (filename) => {
  const error = new Error('FS operation failed');

  try {
    const filePath = getFilePath(url, filename);
    const readStream= await createReadStream(filePath);
    readStream.pipe(process.stdout);
    readStream.on('error', () => {
      throw error;
    })
  } catch {
    throw error;
  }
}
await read('text.txt')
