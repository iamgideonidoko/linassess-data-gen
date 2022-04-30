import * as fs from 'fs';
import axios from 'axios';
import constants from './constants';
import { argv } from 'process';

const contentsDev = 'output/contents-dev.json';
const contentsProd = 'output/contents-prod.json';

/**
 * Fetch content and write to file
 */
(async () => {
    // index of type argument
    const typeIdx = argv.indexOf('--type');
    /* type argument not found */
    if (!typeIdx)
        return console.log(
            '\x1b[31m%s\x1b[0m',
            'contents.ts line:18 Your must pass a type argument. Use --type <value>',
        );

    /* type argument value not found */
    if (!argv[typeIdx + 1])
        return console.log('\x1b[31m%s\x1b[0m', 'contents.ts line:24 type argument has no value. Use --type <value>');

    const typeVal = argv[typeIdx + 1];

    if (typeVal !== 'prod' && typeVal !== 'dev')
        return console.log(
            '\x1b[31m%s\x1b[0m',
            'contents.ts line:31 type argument can only have values of prod or dev',
        );

    /* Copy dev to prod if type is prod */
    if (typeVal === 'prod') {
        return fs.copyFile(contentsDev, contentsProd, (err) => {
            if (err) {
                console.log('\x1b[41m%s\x1b[0m', 'contents.ts line:37 err', err);
            }
            console.log('\x1b[42m%s\x1b[0m', 'contents.ts line:40 Moved contents to prod successfully');
        });
    }

    /** @type {AxiosResponse<any, any>} */
    const res = await axios.get(`${constants.baseUrl}/contents`, {
        headers: {
            Accept: 'application/vnd.github.v3+json',
        },
    });
    const data: string = JSON.stringify(res.data);

    if (data) {
        fs.writeFile(contentsDev, data, (err) => {
            if (err) {
                console.error(``, err);
                console.log('\x1b[41m%s\x1b[0m', 'contents.ts line:56 err', err);
            }
            console.log('\x1b[42m%s\x1b[0m', 'contents.ts line:58 Content fetched & written to file successfully');
        });
    }
})();
