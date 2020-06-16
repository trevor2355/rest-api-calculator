// This file is run with the npm run newKey command, it is used to make a key pair in the root of this project,
// The key pair is used to validate JWT from user requests.

const crypto = require('crypto');
const fs = require('fs');
function genKeyPair() {
    // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1', 
            format: 'pem' 
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem' 
        }
    });
    // Create the public key file
    fs.writeFileSync(__dirname + '/id_rsa_pub.pem', keyPair.publicKey); 
    
    // Create the private key file
    fs.writeFileSync(__dirname + '/id_rsa_priv.pem', keyPair.privateKey);
}
// Generates the keypair
genKeyPair();