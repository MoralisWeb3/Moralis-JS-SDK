import fs from 'fs';
import { paths } from './constants';

export const getAllDemoFolders = () =>
  fs
    .readdirSync(paths.demosRoot, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

module.exports = {
  getAllDemoFolders,
};
