// can't require the inbox.sol because node will try to execut that
// file as if it was JS code

const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Inbox']; // 1: nbr of contracts to compile; contracts and ':Inbox' are 2 keys from 2 nested objects inside the compiled object.
