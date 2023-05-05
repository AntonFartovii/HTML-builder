import {createWriteStream} from 'fs';
import * as readline from 'node:readline';
import process, { stdin as input, stdout as output } from 'node:process';
import {getFilePath} from '../utils/getFilePath.js';
const url = import.meta.url;

// node 02-write-file
export const write = async (filename) => {
  const error = new Error('FS operation failed');

  try {
    const rl = readline.createInterface({
      input,
      output,
    });

    const filePath = getFilePath(url, filename);
    const stream = await createWriteStream(filePath);

    process.stdout.write('Напишите что-нибудь в файл:\n');
    rl.on('SIGINT', () => rl.close());
    rl.on('line',(data) => {
      data.toString().trim() === 'exit' ?
          rl.close() :
          stream.write(data+'\n')
    });
    rl.on('error', () => {
      throw error
    });
    rl.on('close', () => {
      process.stdout.write('Да пабачэння!\n');
    });
  } catch {
    throw error
  }
}

await write('text.txt')
