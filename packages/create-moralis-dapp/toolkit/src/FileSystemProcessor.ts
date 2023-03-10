/* eslint-disable no-await-in-loop */
import fs, { ReadOptions, WriteOptions } from 'fs-extra';
import { join } from 'path';

export class FileSystemProcessor {
  public static async copy(source: string, destination: string) {
    return fs.copy(source, destination);
  }

  public static async removeDir(path: string) {
    return fs.remove(path);
  }

  public static async readdir(path: string) {
    return fs.readdir(path);
  }

  public static async writeFile(path: string, data: string | NodeJS.ArrayBufferView) {
    return fs.writeFile(path, data);
  }

  public static async rename(oldPath: string, newPath: string) {
    return fs.rename(oldPath, newPath);
  }

  public static async stat(path: string) {
    return fs.stat(path);
  }

  public static async getAllFilesPathsInDir(dir: string) {
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

  public static async readJSON(file: string, options?: ReadOptions | BufferEncoding | string) {
    return fs.readJSON(file, options);
  }

  public static async writeJSON(file: string, object: any, options?: WriteOptions | BufferEncoding | string) {
    return fs.writeJSON(file, object, options);
  }
}
