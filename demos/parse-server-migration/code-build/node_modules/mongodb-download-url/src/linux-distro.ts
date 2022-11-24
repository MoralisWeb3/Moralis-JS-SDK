import childProcess from 'child_process';
import { promises as fs } from 'fs';
import { promisify } from 'util';
import _debug from 'debug';
const debug = _debug('mongodb-download-url:linux-distro');
const execFile = promisify(childProcess.execFile);

type PriorityValue<T> = { value: T; priority: number; }

let osRelease: string;
export async function getCurrentLinuxDistro(): Promise<PriorityValue<string>[]> {
  if (process.env.DISTRO_ID) {
    const distroId = process.env.DISTRO_ID.split('-')[0].split('_')[0];
    debug('Using environment-provided linux distro ID', distroId);
    let match;
    if (match = distroId.match(/^ubuntu(\d\d)(\d\d)$/)) {
      return listDistroIds({ id: 'ubuntu', version: match[1] });
    } else if (match = distroId.match(/^debian([8-9])\d$/)) {
      return listDistroIds({ id: 'debian', version: match[1] });
    } else if (match = distroId.match(/^debian([1-7]\d)$/)) {
      return listDistroIds({ id: 'debian', version: match[1] });
    } else if (match = distroId.match(/^suse(\d+)$/)) {
      return listDistroIds({ id: 'suse', version: match[1] });
    } else if (match = distroId.match(/^rhel(\d+)$/)) {
      return listDistroIds({ id: 'redhatenterprise', version: match[1] });
    } else if (['amazon', 'amzn64', 'amazon1'].includes(distroId)) {
      return listDistroIds({ id: 'amazon', version: '2018.03' });
    }
    return [{ value: distroId, priority: 100 }];
  }

  let osReleaseId: string;
  try {
    osRelease ??= await fs.readFile('/etc/os-release', 'utf8');
    debug('loaded /etc/os-release');
  } catch (err) {
    if (err.code === 'ENOENT') {
      osRelease = '';
    }
  }
  if (osRelease) {
    const id = osReleaseId = osRelease.match(/^ID="?(.+?)"?$/m)?.[1];
    const version = osRelease.match(/^VERSION_ID="?(.+?)"?$/m)?.[1];
    if (id && version) {
      debug('got os-release info', { id, version });
      const results = listDistroIds({ id, version });
      if (results.length > 0) {
        return results;
      }
    }
  }
  const { id, version } = await lsbReleaseInfo();
  const results = listDistroIds({ id, version });
  if (results.length > 0) {
    return results;
  }
  throw new Error(`Could not figure out current Linux distro (${id}, ${osReleaseId})`);
}

function listDistroIds({ id, version }: { id: string, version: string }): PriorityValue<string>[] {
  const results: PriorityValue<string>[] = [];
  switch (id.toLowerCase()) {
    case 'ubuntu': {
      const major = +version.split('.')[0];
      if (major >= 12) results.push({ value: 'ubuntu1204', priority: 100 });
      if (major >= 14) results.push({ value: 'ubuntu1404', priority: 200 });
      if (major >= 16) results.push({ value: 'ubuntu1604', priority: 300 });
      if (major >= 18) results.push({ value: 'ubuntu1804', priority: 400 });
      if (major >= 20) results.push({ value: 'ubuntu2004', priority: 500 });
      if (major > 20) results.push({ value: 'ubuntu' + version.replace('.', ''), priority: 600 });
      return results;
    }
    case 'debian': {
      if (+version >= 8) results.push({ value: 'debian81', priority: 100 });
      if (+version >= 9) results.push({ value: 'debian92', priority: 200 });
      if (+version >= 10) results.push({ value: 'debian10', priority: 300 });
      if (+version > 10) results.push({ value: 'debian' + version, priority: 400 });
      return results;
    }
    case 'suse':
    case 'sles':
      return [{ value: 'suse' + version.split('.')[0], priority: 100 }];
    case 'amzn':
    case 'amzn64':
    case 'amazon':
      if (version.match(/^201[0-9]\./)) {
        return [{ value: 'amazon', priority: 100 }, { value: 'amzn64', priority: 100 }];
      } else {
        return [{ value: 'amazon' + version.replace('.', ''), priority: 100 }];
      }
    case 'centos':
      return [{ value: 'rhel' + version + '0', priority: 100 }];
    case 'redhatenterprise':
    case 'redhatenterpriseserver': {
      const want = +version.replace('.', '');
      const known = [55, 57, 62, 67, 70, 71, 72, 80, 81, 82, 83];
      const allowedVersions = known.filter(v => v <= want);
      return allowedVersions.map((v, i) => ({ value: 'rhel' + v, priority: (i + 1) * 100 }));
    }
  }
  return [];
}

async function lsbReleaseInfo(): Promise<{ id: string, version: string }> {
  const [
    id,
    version
  ] = await Promise.all([
    (async() => {
      return (await execFile('lsb_release', ['-si'], { encoding: 'utf8' })).stdout.trim();
    })(),
    (async() => {
      return (await execFile('lsb_release', ['-sr'], { encoding: 'utf8' })).stdout.trim();
    })()
  ]);
  debug('got lsb info', { id, version });
  return { id, version };
}
