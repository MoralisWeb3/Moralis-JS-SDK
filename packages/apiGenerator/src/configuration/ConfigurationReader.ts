import path from 'path';
import fs from 'fs';
import { Configuration } from './Configuration';

export class ConfigurationReader {
  public static read(outputPath: string): Configuration {
    const jsonPath = path.join(outputPath, 'generator.config.json');
    if (!fs.existsSync(jsonPath)) {
      throw new Error(`Cannot open ${jsonPath} file`);
    }
    const jsonRaw = fs.readFileSync(jsonPath, 'utf-8');
    return JSON.parse(jsonRaw) as Configuration;
  }
}
