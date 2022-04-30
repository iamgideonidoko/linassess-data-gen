import fs from 'fs-extra';
import axios from 'axios';
import { argv } from 'process';
import { constants } from '../helper';

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
        return console.log('\x1b[31m%s\x1b[0m', 'contents.ts: Your must pass a type argument. Use --type <value>');

    /* type argument value not found */
    if (!argv[typeIdx + 1])
        return console.log('\x1b[31m%s\x1b[0m', 'contents.ts: type argument has no value. Use --type <value>');

    const typeVal = argv[typeIdx + 1];

    if (typeVal !== 'prod' && typeVal !== 'dev')
        return console.log('\x1b[31m%s\x1b[0m', 'contents.ts: type argument can only have values of prod or dev');

    /* Copy dev to prod if type is prod */
    if (typeVal === 'prod') {
        return fs.copyFile(contentsDev, contentsProd, (err) => {
            if (err) return console.log('\x1b[41m%s\x1b[0m', 'contents.ts: err', err);
            console.log('\x1b[42m%s\x1b[0m', 'contents.ts: Moved contents to prod successfully');
        });
    }

    try {
        /** @type {AxiosResponse<any, any>} */
        const res = await axios.get(`${constants.dirBaseUrl}/contents`, {
            headers: {
                Accept: 'application/vnd.github.v3+json',
            },
        });
        const data: string = JSON.stringify(res.data, null, 4);

        if (data) {
            fs.writeFile(contentsDev, data, (err) => {
                if (err) return console.log('\x1b[41m%s\x1b[0m', 'contents.ts: err', err);
                console.log('\x1b[42m%s\x1b[0m', 'contents.ts: Content fetched & written to file successfully');
            });
        }
    } catch (err) {
        console.log('\x1b[41m%s\x1b[0m', 'contents.ts: err', err);
    }
})();
