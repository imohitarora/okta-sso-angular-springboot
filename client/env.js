// Read environment variables from "cnaenv" in the repository root. Override environment vars if they are already set.
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

const CNAENV = path.resolve(__dirname, 'cnaenv');
console.log(CNAENV);
if (fs.existsSync(CNAENV)) {
  const envConfig = dotenv.parse(fs.readFileSync(CNAENV));
  Object.keys(envConfig).forEach((k) => {
    process.env[k] = envConfig[k];
  });
}
process.env.CLIENT_ID = process.env.CLIENT_ID || process.env.SPA_CLIENT_ID;
