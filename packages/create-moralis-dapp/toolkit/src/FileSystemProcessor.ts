/* eslint-disable no-await-in-loop */
import fs from 'fs-extra';
import { join } from 'path';

export class FileSystemProcessor {
  public async copy(source: string, destination: string) {
    return fs.copy(source, destination);
  }

  public async removeDir(path: string) {
    return fs.rmdir(path);
  }

  public async readdir(path: string) {
    return fs.readdir(path);
  }

  public async writeFile(path: string, data: string | NodeJS.ArrayBufferView) {
    return fs.writeFile(path, data);
  }

  public async rename(oldPath: string, newPath: string) {
    return fs.rename(oldPath, newPath);
  }

  public async stat(path: string) {
    return fs.stat(path);
  }

  public async getAllFilesPathsInDir(dir: string) {
    let res: string[] = [];

    const paths = await this.readdir(dir);
    for (const path of paths) {
      const child = join(dir, path);

      const stat = await this.stat(child);
      if (!stat.isDirectory()) {
        res.push(child);
      } else if (stat.isDirectory()) {
        res = [...res, ...(await this.getAllFilesPathsInDir(child))];
      }
    }

    return res;
  }
}
