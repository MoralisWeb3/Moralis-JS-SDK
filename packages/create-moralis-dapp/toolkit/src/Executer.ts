import { exec } from 'child_process';
import { Logger } from './Logger';

export class Executer {
  private static async async(command: string, cwd: string) {
    return new Promise((resolve, reject) => {
      exec(command, { cwd }, (error, stdout) => {
        if (error) {
          reject(error);
          return;
        }
        resolve({ code: 0, stdout });
      });
    });
  }

  public static async withSpinner(command: string, cwd: string, message: string) {
    return Logger.spinnerPromise(this.async(command, cwd), { text: message });
  }
}
