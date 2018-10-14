import { writeFile } from 'fs';
import { argv } from 'yargs';

require('dotenv').config();
const environment = argv.environment;
const targetPath = `./src/environments/environment.${environment}.ts`;
const envConfigFile = `
export const environment = {
  production: ${process.env.PRODUCTION}
}
`
writeFile(targetPath, envConfigFile, (err) => {
  if (err) {
    console.log('Error', err);
  }
  console.log(`Output generated at ${targetPath}`);
});