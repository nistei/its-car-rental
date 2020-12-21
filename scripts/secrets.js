// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypto = require("crypto");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

function secret(path) {
  const secret = crypto.randomBytes(20).toString('hex');

  fs.writeFileSync(path, secret);
}

const secrets = [
  "./.secrets/db_root_password",
  "./.secrets/db_password",
]

secrets.forEach(secret);