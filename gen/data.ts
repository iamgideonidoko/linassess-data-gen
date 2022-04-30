import readline from 'readline';
import fs from 'fs';
import prodContents from '../output/contents-prod.json'; // auto parsed to an object
import { constants } from '../helper';
import axios from 'axios';
import stringToStream from 'string-to-stream';

async function processLineByLine(str: string) {
    const fileStream = stringToStream(str);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    const fileLines = [];

    for await (const line of rl) {
        // Each line in file will be successively available here as `line`.
        if (line) {
            // push all line with truthy values to lines array
            fileLines.push(line);
        }
    }
    return fileLines;
}

interface Question {
    question: string;
    options: Array<string>;
    _ps: number;
}

const getQuestions = async (str: string) => {
    const questions: Question[] = [];
    const fileLines = await processLineByLine(str);
    fileLines.forEach((item, idx) => {
        if (item.startsWith('####')) {
            const options = [fileLines[idx + 1], fileLines[idx + 2], fileLines[idx + 3], fileLines[idx + 4]];
            questions.push({
                question: item.substring(5),
                options: options.map((item) => item.substring(6)),
                _ps: options.findIndex((item) => item.indexOf('[x]') >= 0),
            });
        }
    });
    return questions;
};

(async () => {
    const dirs = prodContents.filter((item) => item.type === 'dir');
    dirs.forEach(async (item) => {
        try {
            const fileName = (() => {
                if (item.path === 'c++') return `c++quiz`;
                return item.path.replace('#', 'sharp').replace('-(programming-language)', '') + '-quiz';
            })();
            const res = await axios.get(`${constants.fileBaseUrl}/${item.path.replace('#', '0%23')}/${fileName}.md`);

            if (res.data) {
                const questions = await getQuestions(res.data as string);
                fs.writeFile(`output/data-dev/${fileName}.json`, JSON.stringify(questions, null, 4), function (err) {
                    if (err) throw err;
                    console.log('\x1b[42m%s\x1b[0m', 'data.ts line:67 Content fetched & written to file successfully');
                });
            }
        } catch (err) {
            console.log('\x1b[41m%s\x1b[0m', 'data.ts line:55 err', err);
        }
    });
})();
