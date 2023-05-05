import {getDir} from '../utils/getPathFromFiles.js';
import {join, resolve} from 'path';
import {readdir, stat} from 'fs/promises';
const url = import.meta.url;

// Запустите в консоли: node 03-files-in-folder
export const lsDir = async (folderName) => {

    const dirPath = getDir(url);
    const src = join(dirPath, folderName);

    try {
      const objList = await readdir(src, {withFileTypes: true});
      for(const obj of objList) {
        if (obj.isFile()) {
          const fileInfo = obj.name.split('.');
          const fileStats = await stat(resolve(src, obj.name));
          const fileSize = (fileStats.size/1024).toFixed(3)+'kb';
          fileInfo.push(fileSize);
          console.log(fileInfo.join(' - '));
        }
      }
    } catch (e) {
        console.log(e);
    }
}
await lsDir('secret-folder');

// Данные должны быть выведены в формате <имя файла>-<расширение файла>-<вес файла>.
// Пример: example - txt - 128.369kb
