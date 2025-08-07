import { execSync } from 'node:child_process';
import { parse } from 'semver';
import packageJson from './package.json' with { type: 'json' };

const packageVersion = parse(packageJson.version);
if (!packageVersion) {
  throw new Error('Invalid package version');
}

export const gitCommitCount = execSync('git rev-list --count HEAD').toString().trim();
export const gitCommitHash = execSync('git rev-parse --short HEAD').toString().trim();
export const extensionVersion = `${packageVersion.major}.${packageVersion.minor}.${packageVersion.patch}.${gitCommitCount}`;
export const extensionVersionName = `${packageVersion.major}.${packageVersion.minor}.${packageVersion.patch}+count.${gitCommitCount}.sha.${gitCommitHash}`;
