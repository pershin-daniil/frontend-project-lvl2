import fs from 'fs';
import path from 'path';

export const getExtension = (filename) => path.extname(filename).substring(1);

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
export const readFile = (filepath) => fs.readFileSync(getFullPath(filepath), 'utf-8').trim();
