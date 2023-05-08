import {join, resolve} from 'path';
import {readdir, stat} from 'fs/promises';
import {getDirPath} from '../utils/getFilePath.js';
const url = import.meta.url;

// Commands:
// Запустите в консоли: node 03-files-in-folder
// npm run 3
export const lsDir = async (folderName) => {
  const dirPath = getDirPath(url);
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
};
lsDir('secret-folder');

// Данные должны быть выведены в формате <имя файла>-<расширение файла>-<вес файла>.
// Пример: example - txt - 128.369kb
