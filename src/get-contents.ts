import * as fs from 'fs';
import axios from 'axios';
import constants from './constants';

const contentsDev = 'output/contents-dev.json';

/**
 * Fetch content and write to file
 */
(async () => {
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
                console.log('\x1b[41m%s\x1b[0m', 'get-content.ts line:18 err', err);
            }
            console.log('\x1b[44m%s\x1b[0m', 'get-content.ts line:18 Content fetched & written to file successfully');
        });
    }
})();
