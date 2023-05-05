import {mkdir, readdir} from 'fs/promises';
import {getDir} from '../utils/getPathFromFiles.js';
import {join, extname} from 'path'
import {createReadStream, createWriteStream} from 'fs';
const url = import.meta.url;

// Запустите в консоли: node 05-merge-styles
export const createBundle = async (url, from, to) => {
  const dirPath = getDir(url);
  const fileName = 'bundle.css';
  const pathFrom = join(dirPath, from);
  const pathTo = join(dirPath, to);

  await mkdir(pathTo, {recursive: true});

  try {
    const objList = await readdir(pathFrom, {withFileTypes: true});
    let readStream;
    const writeStream = createWriteStream(join(pathTo, fileName));
    writeStream.write('');

    for(const obj of objList) {
      if (obj.isFile()) {
        const ext = obj.name.split('.')[1];
        if (ext === 'css') {
          writeStream.write('\n');
          readStream = createReadStream(join(pathFrom, obj.name))
          readStream.on('data', (chunk) => {
            writeStream.write(chunk);
          });
        }
      }
    }
    readStream.on('end', () => {
      writeStream.end();
    });
    } catch (e) {
      console.log('Нешта здарылася!');
    }
}
await createBundle(url, 'styles', 'project-dist');
// После завершения работы скрипта в папке project-dist должен
// находиться файл bundle.css содержащий стили из всех файлов папки styles.
