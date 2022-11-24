import zlib from 'zlib';
import { promises as fs } from 'fs';
import { promisify } from 'util';
import path from 'path';
import os from 'os';
import fetch from 'node-fetch';
import semver from 'semver';
import _debug from 'debug';
const debug = _debug('mongodb-download-url:version-list');
const gunzip = promisify(zlib.gunzip);
const gzip = promisify(zlib.gzip);

export type ArchiveBaseInfo = {
  sha1: string;
  sha256: string;
  url: string;
};

export type DownloadInfo = {
  edition: 'enterprise' | 'targeted' | 'base' | 'source' | 'subscription';
  target?: string;
  arch?: string;

  archive: {
    debug_symbols: string;
  } & ArchiveBaseInfo;

  cryptd?: ArchiveBaseInfo;
  csfle?: ArchiveBaseInfo;
  crypt_shared?: ArchiveBaseInfo;
  shell?: ArchiveBaseInfo;
  packages?: string[];
  msi?: string;
};

export type VersionInfo = {
  changes: string;
  notes: string;
  date: string;
  githash: string;

  continuous_release: boolean;
  current: boolean;
  development_release: boolean;
  lts_release: boolean;
  production_release: boolean;
  release_candidate: boolean;
  version: string;

  downloads: DownloadInfo[];
};

type FullJSON = {
  versions: VersionInfo[];
};

export type VersionListOpts = {
  version?: string;
  versionListUrl?: string;
  cachePath?: string;
  cacheTimeMs?: number;
  productionOnly?: boolean;
};

function defaultCachePath(): string {
  return path.join(os.tmpdir(), '.mongodb-full.json.gz');
}

let fullJSON: FullJSON | undefined;
let fullJSONFetchTime = 0;
async function getFullJSON(opts: VersionListOpts): Promise<FullJSON> {
  const versionListUrl = opts.versionListUrl ?? 'https://downloads.mongodb.org/full.json';
  const cachePath = opts.cachePath ?? defaultCachePath();
  const cacheTimeMs = opts.cacheTimeMs ?? 24 * 3600 * 1000;
  let tryWriteCache = cacheTimeMs > 0;
  const inMemoryCopyUpToDate = () => fullJSONFetchTime >= new Date().getTime() - cacheTimeMs;

  try {
    if ((!fullJSON || !inMemoryCopyUpToDate()) && cacheTimeMs > 0) {
      debug('trying to load versions from cache', cachePath);
      const fh = await fs.open(cachePath, 'r');
      try {
        const stat = await fh.stat();
        if (process.getuid && (stat.uid !== process.getuid() || (stat.mode & 0o022) !== 0)) {
          tryWriteCache = false;
          debug('cannot use cache because it is not a file or we do not own it');
          throw new Error();
        }
        if (stat.mtime.getTime() < new Date().getTime() - cacheTimeMs) {
          debug('cache is outdated');
          throw new Error();
        }
        debug('cache up-to-date');
        tryWriteCache = false;
        fullJSON = JSON.parse((await gunzip(await fh.readFile())).toString());
        fullJSONFetchTime = new Date().getTime();
      } finally {
        await fh.close();
      }
    }
  } catch {}
  if (!fullJSON || !inMemoryCopyUpToDate()) {
    debug('trying to load versions from source', versionListUrl);
    const response = await fetch(versionListUrl);
    if (!response.ok) {
      throw new Error(`Could not get mongodb versions from ${versionListUrl}: ${response.statusText}`);
    }
    fullJSON = await response.json();
    fullJSONFetchTime = new Date().getTime();
    if (tryWriteCache) {
      const partialFilePath = cachePath + `.partial.${process.pid}`;
      await fs.mkdir(path.dirname(cachePath), { recursive: true });
      try {
        const compressed = await gzip(JSON.stringify(fullJSON), { level: 9 });
        await fs.writeFile(partialFilePath, compressed, { mode: 0o644, flag: 'wx' });
        await fs.rename(partialFilePath, cachePath);
        debug('wrote cache', cachePath);
      } catch {
        try {
          await fs.unlink(partialFilePath);
        } catch {}
      }
    }
  }
  return fullJSON;
}

export async function getVersion(opts: VersionListOpts): Promise<VersionInfo> {
  const fullJSON = await getFullJSON(opts);
  let versions = fullJSON.versions;
  versions = versions.filter((info: VersionInfo) => info.downloads.length > 0);
  if (opts.productionOnly) {
    versions = versions.filter((info: VersionInfo) => info.production_release);
  }
  if (opts.version && opts.version !== '*') {
    versions = versions.filter((info: VersionInfo) => semver.satisfies(info.version, opts.version));
  }
  versions = versions.sort((a: VersionInfo, b: VersionInfo) => semver.rcompare(a.version, b.version));
  return versions[0];
}

export async function clearCache(cachePath?: string): Promise<void> {
  debug('clearing cache');
  fullJSON = undefined;
  fullJSONFetchTime = 0;
  if (cachePath !== '') {
    try {
      await fs.unlink(cachePath ?? defaultCachePath());
    } catch (err) {
      if (err.code === 'ENOENT') return;
      throw err;
    }
  }
}
