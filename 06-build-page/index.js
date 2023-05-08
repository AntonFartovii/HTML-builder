import {mkdir, readdir} from 'fs/promises';
import {join} from 'path';
import {createReadStream, createWriteStream} from 'fs';
import {createBundle} from '../05-merge-styles/index.js';
import {copyDir} from '../04-copy-directory/index.js';
import {getDirPath} from '../utils/getFilePath.js';
const url = import.meta.url;

// Commands:
// node 06-build-page
// npm run 6
export const htmlBuild = async () => {
  const dirPath = getDirPath(url);
  const folderDestination = 'project-dist';
  const templateFile = 'template.html';
  const from = 'components';
  const to = 'index.html';

  try {
    await mkdir(join(dirPath, folderDestination), {recursive: true});
    await createBundle(url, 'styles', folderDestination, 'style.css');
    await copyDir(url, 'assets', join(folderDestination, 'assets'));

    new Promise((res) => {
      const readStream = createReadStream(join(dirPath, templateFile), {encoding:'utf-8'});
      let data = '';

      readStream.on('data',(chunk) => {
        data = data + chunk;
      });

      readStream.on('end', () => {
        res(data.trim());
      });
    }).then( async (data) => {
      const pathSource = join(dirPath, from);
      const fileList = await readdir(pathSource);

      for (let key in fileList) {
        const templateFile = fileList[key];

        let component = '';
        const readStream = createReadStream(join(pathSource, templateFile));
        const writeStream = createWriteStream(join(dirPath, folderDestination, to));

        readStream.on('data', (chunk) => {
          component += chunk;
        });

        readStream.on('end', () => {
          data = data.replace(`{{${templateFile.split('.')[0]}}}`, component);
          readStream.close();
        });

        readStream.on('close', () => {
          writeStream.write(data);
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
};

htmlBuild();
