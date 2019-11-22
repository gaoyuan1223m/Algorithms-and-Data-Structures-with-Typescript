const pkg = require('./package.json');
const fs = require('fs-extra');

const devDependencies = Object.keys(pkg.devDependencies);
const latestPkg = devDependencies.map(key => `${key}@latest`);

(
    async () => {
        await fs.outputFile('./dependencies.txt', latestPkg);
    }
)()
