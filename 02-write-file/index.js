import {createWriteStream} from 'fs';
import {createInterface} from 'node:readline';
import {stdin as input, stdout as output} from 'node:process';
import {getFilePath} from '../utils/getFilePath.js';
const url = import.meta.url;

// Commands:
// node 02-write-file
// npm run 2
export const write = async (filename) => {
  const error = new Error('FS operation failed');

  try {
    const readLine = createInterface({input, output,});
    const filePath = getFilePath(url, filename);
    const stream = await createWriteStream(filePath);

    output.write('Напишите что-нибудь в файл:\n');
    readLine.on('SIGINT', () => {
      readLine.close();
    });

    readLine.on('line',(data) => {
      data.toString().trim() === 'exit' ?
        readLine.close() :
        stream.write(data+'\n');
    });

    readLine.on('error', () => {
      throw error;
    });

    readLine.on('close', () => {
      output.write('Да пабачэння!\n');
    });
  } catch {
    throw error;
  }
};

write('text.txt');
