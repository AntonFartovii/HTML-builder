import {getDir} from '../utils/getPathFromFiles.js';
import {readdir, mkdir, rm} from 'fs/promises';
import {createReadStream, createWriteStream} from 'fs';
import {join} from 'path';
const url = import.meta.url;

// Запустите в консоли: node 04-copy-directory
export const copyDir = async (url, from, to) => {
  const error = new Error('FS operation failed');
  const dirPath = getDir(url);
  const pathFrom = join(dirPath, from);
  const pathTo = join(dirPath, to);

  try {
    await rm(pathTo, {recursive: true, force: true});
    const objList = await readdir(pathFrom, {withFileTypes: true});
    await mkdir(pathTo, {recursive: true});

    for(const obj of objList) {
      if (obj.isFile()) {
        const readStream  = createReadStream(join(pathFrom, obj.name));
        const writeStream = createWriteStream(join(pathTo, obj.name));
        readStream.on('data', (chunk) => {
          writeStream.write(chunk);
        });
        readStream.on('end', () => {
          writeStream.end();
        });
        readStream.on('error', () => {
          throw error;
        });
      } else if(obj.isDirectory()) {
        await mkdir(join(pathTo, obj.name), {recursive: true});
        // recursive copy inner folders
        await copyDir(url, join(from, obj.name), join(to, obj.name))
      }
    }
  } catch {
     throw error;
  }
}

await copyDir(url, 'files', 'files-copy');
