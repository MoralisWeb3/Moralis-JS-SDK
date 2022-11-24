import os from 'os';
import path from 'path';
import semver from 'semver';
import { getVersion, DownloadInfo, VersionListOpts, clearCache } from './version-list';
import { getCurrentLinuxDistro } from './linux-distro';
import { inspect } from 'util';
import _debug from 'debug';
const debug = _debug('mongodb-download-url');

type PriorityValue<T> = { value: T; priority: number; }

type ArtifactOptions = {
  /**
   * Specify the version as a semver string. This also accepts the special values:
   * - 'stable' (or 'latest') for the latest stable version (default)
   * - 'unstable' for the latest unstable version
   * - 'latest-alpha' for the latest alpha release of the server
   */
  version?: string;
  /**
   * Specify the binary architecture. Default is host architecture.
   */
  arch?: string;
  /**
   * Specify the binary platforn. Default is host platform, as given by
   * `process.platform`.
   */
  platform?: string;
  /**
   * If known, specify a mongodb DISTRO_ID string to pick a specific Linux distro.
   */
  distro?: string;
  /**
   * If true, this will return enterprise servers rather than community servers.
   */
  enterprise?: boolean;
  /**
   * If true, this will return the mongocryptd-only package, if available.
   * (This typically only makes sense with { enterprise: true }.)
   */
  cryptd?: boolean;
  /**
   * If true, this will return the mongo_crypt_shared library package, if available.
   * (This typically only makes sense with { enterprise: true }.)
   */
  crypt_shared?: boolean;
  /**
   * @deprecated Use crypt_shared instead.
   */
  csfle?: boolean;
  /**
   * @deprecated Use arch instead.
   */
  bits?: '32' | '64' | 32 | 64
};

export type Options = ArtifactOptions & VersionListOpts;

export type DownloadArtifactInfo = Required<Omit<ArtifactOptions, 'csfle'>> & {
  /** Full download URL. */
  url: string;
  /** Filename for the given download URL. */
  artifact: string;
  /** Currently always 'mongodb'. */
  name: string;
  // Legacy properties:
  /** @deprecated */
  ext: string;
  /** @deprecated */
  filenamePlatform: string;
  /** @deprecated */
  debug: false;
  /** @deprecated */
  branch: 'master';
};

type ProcessedOptions = {
  version: string;
  arch: string[];
  target: PriorityValue<string>[];
  enterprise: boolean;
  cryptd: boolean;
  crypt_shared: boolean;
};

function getPriority<T>(values: PriorityValue<T>[], candidate: T): number {
  for (const { value, priority } of values) {
    if (value === candidate) {
      return priority;
    }
  }
  return 0;
}

function maximizer<T>(values: T[], evaluator: (v: T) => number): T | undefined {
  let max = -Infinity;
  let maximizer: T | undefined;
  for (const v of values) {
    const result = evaluator(v);
    if (result > max) {
      max = result;
      maximizer = v;
    }
  }
  return maximizer;
}

function parseArch(arch: string): string[] {
  if (['i686', 'i386', 'x86', 'ia32'].includes(arch)) {
    return ['i686', 'i386', 'x86', 'ia32'];
  }
  if (['x86_64', 'x64'].includes(arch)) {
    return ['x86_64', 'x64'];
  }
  if (['arm64', 'aarch64'].includes(arch)) {
    return ['arm64', 'aarch64'];
  }
  if (['ppc64', 'ppc64le'].includes(arch)) {
    return ['ppc64', 'ppc64le'];
  }
  return [arch];
}

async function parseTarget(distro: string | undefined, platform: string, archs: string[], version: string): Promise<PriorityValue<string>[]> {
  if (platform === 'linux') {
    const results: PriorityValue<string>[] = [];
    if (distro) {
      results.push({ value: distro, priority: 1000 });

      if (archs.includes('x86_64')) {
        if (distro === 'amzn64' || distro === 'amazon1') {
          results.push({ value: 'amazon', priority: 900 });
        }
        if (distro === 'amazon' || distro === 'amazon1') {
          results.push({ value: 'amzn64', priority: 900 });
        }
      }
    }

    if (archs.includes('x86_64')) {
      results.push({ value: 'linux_x86_64', priority: 1 });
    } else if (archs.includes('i686')) {
      results.push({ value: 'linux_i686', priority: 1 });
    }

    let distroResultsErr;
    try {
      results.push(...await getCurrentLinuxDistro());
    } catch (err) {
      distroResultsErr = err;
    }
    if (distro === undefined &&
        distroResultsErr &&
        (version === '*' ||
         version === 'latest-alpha' ||
         semver.gte(version, '4.0.0'))) {
      throw distroResultsErr;
    }
    return results;
  } else if (platform === 'sunos') {
    return [{ value: 'sunos5', priority: 1 }];
  } else if (['win32', 'windows'].includes(platform)) {
    if (archs.includes('i686')) {
      return [
        { value: 'windows', priority: 1 },
        { value: 'windows_i686', priority: 10 }
      ];
    } else {
      return [
        { value: 'windows', priority: 1 },
        { value: 'windows_x86_64', priority: 10 },
        { value: 'windows_x86_64-2008plus', priority: 10 },
        { value: 'windows_x86_64-2008plus-ssl', priority: 100 },
        { value: 'windows_x86_64-2012plus', priority: 100 }
      ];
    }
  } else if (['darwin', 'osx', 'macos'].includes(platform)) {
    return [
      { value: 'osx', priority: 1 },
      { value: 'osx-ssl', priority: 10 },
      { value: 'darwin', priority: 1 },
      { value: 'macos', priority: 1 }
    ];
  }
  return [{ value: platform, priority: 1 }];
}

async function resolve(opts: ProcessedOptions): Promise<DownloadArtifactInfo> {
  let download: DownloadInfo;
  if (opts.version === 'latest-alpha' && opts.enterprise) {
    const targets = opts.target.map(({ value }) => value);
    let url, target;
    if (targets.includes('macos')) {
      url = 'https://downloads.mongodb.com/osx/mongodb-macos-x86_64-enterprise-latest.tgz';
      target = 'macos';
    } else if (targets.includes('linux_x86_64')) {
      target = maximizer(opts.target, candidate => candidate.priority).value;
      url = `https://downloads.mongodb.com/linux/mongodb-linux-x86_64-enterprise-${target}-latest.tgz`;
    } else if (targets.includes('windows_x86_64')) {
      target = 'windows';
      url = 'https://downloads.mongodb.com/windows/mongodb-windows-x86_64-enterprise-latest.zip';
    }
    if (url) {
      download = {
        target,
        edition: 'enterprise',
        arch: 'x86_64',
        archive: {
          url,
          sha1: '',
          sha256: '',
          debug_symbols: ''
        }
      };
    }
  }

  let version;
  if (!download) {
    version = await getVersion(opts);
    if (!version) {
      throw new Error(`Could not find version matching ${inspect(opts)}`);
    }
    const bestDownload = maximizer(version.downloads.map((candidate: DownloadInfo) => {
      if (opts.enterprise) {
        if (candidate.edition !== 'enterprise') {
          return { value: candidate, priority: 0 };
        }
      } else {
        if (candidate.edition !== 'targeted' && candidate.edition !== 'base') {
          return { value: candidate, priority: 0 };
        }
      }

      if (!opts.arch.includes(candidate.arch)) {
        return { value: candidate, priority: 0 };
      }

      const targetPriority = getPriority(opts.target, candidate.target);
      return { value: candidate, priority: targetPriority };
    }), (candidate: PriorityValue<DownloadInfo>) => candidate.priority);
    if (bestDownload.priority > 0) {
      download = bestDownload.value;
    }
  }
  if (!download) {
    throw new Error(`Could not find download URL for version ${version?.version} ${inspect(opts)}`);
  }

  const wantsCryptd = opts.cryptd && download.target;
  const wantsCryptShared = opts.crypt_shared && download.target;

  if (wantsCryptShared && !download.crypt_shared && !download.csfle) {
    throw new Error(`No crypt_shared library download for version ${version?.version} available ${inspect(opts)}`);
  }

  debug('fully resolved', JSON.stringify(opts, null, 2), download);
  // mongocryptd is contained in the regular enterprise archive, the csfle lib is not
  let { url } = wantsCryptShared
    ? (download.crypt_shared ?? download.csfle)
    : ((wantsCryptd ? download.cryptd : null) ?? download.archive);
  if (wantsCryptd) {
    // cryptd package on Windows was buggy: https://jira.mongodb.org/browse/BUILD-13653
    url = url.replace('mongodb-shell-windows', 'mongodb-cryptd-windows');
  }

  return {
    ...opts,
    name: 'mongodb',
    url: url,
    arch: download.arch,
    distro: download.target,
    platform: download.target,
    filenamePlatform: download.target,
    version: version?.version ?? '*',
    artifact: path.basename(url),
    debug: false,
    enterprise: download.edition === 'enterprise',
    branch: 'master',
    bits: ['i386', 'i686'].includes(download.arch) ? '32' : '64',
    ext: url.match(/\.([^.]+)$/)?.[1] ?? 'tgz'
  };
}

async function options(opts: Options | string = {}): Promise<ProcessedOptions & VersionListOpts> {
  if (typeof opts === 'string') {
    opts = {
      version: opts
    };
  } else {
    opts = { ...opts };
  }

  opts.crypt_shared ??= opts.csfle;

  if (opts.cryptd && opts.crypt_shared) {
    throw new Error('Cannot request both cryptd and csfle package');
  }

  if (opts.bits && !opts.arch) {
    opts.arch = +opts.bits === 32 ? 'ia32' : 'x64';
  }
  if (!opts.arch) {
    opts.arch = os.arch();
  }
  if (!opts.platform) {
    opts.platform = os.platform();
  }
  if (!opts.version) {
    opts.version = process.env.MONGODB_VERSION || 'stable';
  }

  if (opts.version === 'stable' || opts.version === 'latest' || opts.version === '*') {
    opts.version = '*';
    opts.productionOnly = true;
  } else if (opts.version === 'unstable') {
    opts.version = '*';
    opts.productionOnly = false;
  }

  const processedOptions: ProcessedOptions & VersionListOpts = {
    ...opts,
    arch: parseArch(opts.arch),
    target: [],
    enterprise: !!opts.enterprise,
    cryptd: !!opts.cryptd,
    crypt_shared: !!opts.crypt_shared,
    version: opts.version as string
  };
  processedOptions.target = await parseTarget(
    opts.distro,
    opts.platform,
    processedOptions.arch,
    processedOptions.version);
  return processedOptions;
}

export async function getDownloadURL(opts?: Options | string): Promise<DownloadArtifactInfo> {
  const parsedOptions = await options(opts);

  debug('Building URL for options `%j`', parsedOptions);
  return await resolve(parsedOptions);
}

export default getDownloadURL;
export { clearCache };
