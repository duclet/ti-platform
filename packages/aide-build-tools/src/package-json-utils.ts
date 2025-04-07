import { cli } from 'cleye';
import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import type { PackageJson } from 'pkg-types';

type PackageName = string;
type Path = string;
type Version = string;

const PROPERTIES_WITH_VERSIONS = [
    'dependencies',
    'devDependencies',
    'optionalDependencies',
    'peerDependencies',
] as const;

/**
 * Given a package.json file's content, return a list of the various dependencies properties with versions.
 *
 * @param packageJson
 *  The package.json to get the data from.
 * @return
 *  An array with a reference to the dependencies with versions information.
 */
function getDependenciesWithVersions(packageJson: PackageJson): Array<Record<PackageName, Version>> {
    return PROPERTIES_WITH_VERSIONS.filter((type) => !!packageJson[type]).map((type) => packageJson[type]!);
}

/**
 * Same as {@link getDependenciesWithVersions} except that we flatten all the various dependencies type into one object.
 */
function getFlattenDependenciesWithVersions(packageJson: PackageJson): Record<PackageName, Version> {
    return Object.fromEntries(getDependenciesWithVersions(packageJson).flatMap((deps) => Object.entries(deps)));
}

/**
 * Given the path of a JSON file, read its content and assume it is valid package.json data.
 *
 * @param path
 *  The path of the file to read.
 * @return
 *  The package.json's content.
 */
function readAsPackageJson(path: string): PackageJson {
    return JSON.parse(readFileSync(path, 'utf-8')) as PackageJson;
}

/**
 * Write the contents of the package.json to its intended target.
 *
 * @param path
 *  The path to write to.
 * @param packageJson
 *  The package.json's content.
 */
function writePackageJson(path: string, packageJson: PackageJson): void {
    writeFileSync(path, JSON.stringify(packageJson, undefined, 4));
}

/**
 * Combine all the versions of the various given package.json files into one. Note that this will create a package.json
 * file that will simply write all dependencies into the "dependencies" block on the package.json.
 */
export function createCombinedPackageJsonDependencies(): void {
    const {
        flags: { sourcePath, targetPath, dryRun, writeOnNoConflictOnly },
    } = cli({
        name: 'create-combined-package-json-dependencies',
        flags: {
            sourcePath: {
                alias: 's',
                description:
                    'Either the path or glob pattern for the package.json files to read to get the dependencies.',
                type: [String],
            },
            targetPath: {
                alias: 't',
                description: 'Path to target package.json that will be created.',
                type: String,
            },
            dryRun: {
                alias: 'd',
                description:
                    'Enable dry-run mode which not actually write the target file. If changing to "false" must be passed as "-d=false".',
                type: Boolean,
                default: true,
            },
            writeOnNoConflictOnly: {
                alias: 'n',
                description: 'Enable to only write the target files if there are no conflict between sources.',
                type: Boolean,
                default: true,
            },
        },
    });

    if (!sourcePath || sourcePath.length < 1 || sourcePath.find((p) => !p.trim())) {
        throw new Error('Source path must be given and is not empty');
    }

    if (!targetPath?.trim()) {
        throw new Error('Target path must be given and is not empty');
    }

    const packageVersions: Record<PackageName, Array<{ source: Path; version: Version }>> = {};
    let hasConflict = false;

    globSync(sourcePath)
        .map((path) => ({
            path,
            dependencies: getFlattenDependenciesWithVersions(readAsPackageJson(path)),
        }))
        .forEach(({ path, dependencies }) =>
            Object.entries(dependencies).forEach(([packageName, version]) => {
                if (version.startsWith('workspace:')) {
                    console.log(`Does not support workspace versions, skipping: ${path} - ${packageName} - ${version}`);
                    return;
                }

                const versionsForPackage = (packageVersions[packageName] = packageVersions[packageName] || []);

                versionsForPackage.push({ version, source: path });

                if (versionsForPackage.length === 1) {
                    return;
                }

                if (versionsForPackage.some((item) => item.version !== version)) {
                    console.log(`Conflict for ${packageName}: ${JSON.stringify(versionsForPackage)}`);
                    hasConflict = true;
                }
            })
        );

    if (writeOnNoConflictOnly && hasConflict) {
        console.log('There were conflicts with the versions of source files, not writing target file as requested.');
        return;
    }

    const dependencies = Object.fromEntries(
        Object.entries(packageVersions)
            .map(([packageName, versions]) => [packageName, versions[0].version] as const)
            .sort((a, b) => a[0].localeCompare(b[0]))
    );

    if (dryRun) {
        console.log('Is dry-run, not writing following:');
        console.log(dependencies);
        return;
    }

    try {
        const target = readAsPackageJson(targetPath);
        const targetDependencies = getFlattenDependenciesWithVersions(target);

        if (JSON.stringify(dependencies) === JSON.stringify(targetDependencies)) {
            console.log('No updates were found against target file');
            return;
        }
    } catch (ignoreError) {
        // Only error here is that the target file doesn't exist which is fine
    }

    console.log('Writing target files with dependencies');
    writePackageJson(targetPath, {
        name: '@ti-platform/auto-generated-combined-package-json-versions',
        lastUpdated: new Date(),
        dependencies,
    });
}

/**
 * Retrieve all the versions from the source package.json and update the target package.json with the versions from the
 * source.
 */
export function updatePackageJsonVersions(): void {
    const {
        flags: { sourcePath, targetPath, dryRun },
    } = cli({
        name: 'update-package-json-versions',
        flags: {
            sourcePath: {
                alias: 's',
                description: 'Path to source package.json with versions to copy from.',
                type: String,
            },
            targetPath: {
                alias: 't',
                description:
                    'Either the path or glob pattern for the package.json that will have its versions updated.',
                type: [String],
            },
            dryRun: {
                alias: 'd',
                description:
                    'Enable dry-run mode which will not actually update the target package.json. If changing to "false" must be passed as "-d=false".',
                type: Boolean,
                default: true,
            },
        },
    });

    if (!sourcePath?.trim()) {
        throw new Error('Source path must be given and is not empty');
    }

    if (!targetPath || targetPath.length < 1 || targetPath.find((p) => !p.trim())) {
        throw new Error('Target path must be given an is not empty');
    }

    const source = readAsPackageJson(sourcePath);
    const sourceVersions = getFlattenDependenciesWithVersions(source);

    globSync(targetPath).map((path) => {
        const target = readAsPackageJson(path);
        const updatedDependencies: Record<PackageName, { from: Version; to: Version }> = {};

        getDependenciesWithVersions(target).forEach((dependencies) =>
            Object.entries(dependencies).forEach(([packageName, version]) => {
                const currentVersion = dependencies[packageName];
                const versionToUse = sourceVersions[packageName];

                if (!!versionToUse && versionToUse !== currentVersion) {
                    updatedDependencies[packageName] = { from: dependencies[packageName], to: versionToUse };
                    dependencies[packageName] = versionToUse;
                }
            })
        );

        if (Object.entries(updatedDependencies).length < 1) {
            console.log(`${path}: No dependencies to update found.`);
            return;
        }

        console.log(`${path}: Dependencies with updated versions`);
        console.log(updatedDependencies);

        if (dryRun) {
            console.log('Is dry-run, not actually updating files');
            return;
        }

        writePackageJson(path, target);
        console.log(`Updated ${path} with new dependencies`);
    });
}
