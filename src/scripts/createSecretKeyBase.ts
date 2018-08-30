import crypto = require('crypto');
const algorithm = 'AES-128-CBC';

const cipher = crypto.createCipher(algorithm, new Date().toString());
let encrypted = cipher.update(crypto.randomBytes(32), 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log(`Random secret number was generated!`);
console.log(`Put the following line to your .envrc`);

for (let i = 0; i < 3; i += 1) {
  console.log('');
}

console.log(`export SECRET_KEY_BASE=${encrypted}`);

for (let i = 0; i < 3; i += 1) {
  console.log('');
}
