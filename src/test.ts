import * as fs from 'fs';

let lineCounter = 0;

async function logChunks(readable: fs.ReadStream) {
    for await (const chunk of readable) {
        lineCounter += 1;
        console.log(`line ${lineCounter} => `, chunk);
    }
}

const readable = fs.createReadStream('src/test.txt', { encoding: 'utf8' });
logChunks(readable);
