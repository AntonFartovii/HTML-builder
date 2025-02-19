import {createReadStream} from 'fs';
import {getFilePath} from '../utils/getFilePath.js';
import { stdout } from 'node:process';
const url = import.meta.url;

// Commands:
// node 01-read-file
// npm run 1
export const read = async (filename) => {
  const error = new Error('FS operation failed');

  try {
    const filePath = getFilePath(url, filename);
    const readStream= await createReadStream(filePath);
    readStream.on('data', (chunk) => {
      stdout.write(chunk);
    });
    readStream.on('end', () => {
      stdout.end();
    });
    readStream.on('error', () => {
      throw error;
    });
  } catch {
    throw error;
  }
};
read('text.txt');
