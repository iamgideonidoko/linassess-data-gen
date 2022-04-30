import readline from 'readline';
import fs from 'fs-extra';
import prodContents from '../output/contents-prod.json'; // auto parsed to an object
import { constants } from '../helper';
import axios from 'axios';
import stringToStream from 'string-to-stream';
import { argv } from 'process';

const dataDev = 'output/data-dev';
const dataProd = 'output/data-prod';

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
        // get questions, questions begin with ####
        if (item.startsWith('####')) {
            let question = item.substring(5);
            const options = [];
            let currentOption = '';
            for (let i = 1; i < fileLines.length; i++) {
                if (fileLines[idx + i] && fileLines[idx + i].startsWith('- [')) {
                    // if first option after question is reached, stop loop
                    break;
                } else {
                    question += `\n${fileLines[idx + i]}`;
                }
            }
            for (let i = 1; i < fileLines.length; i++) {
                if (options.length >= 4) break;
                // at the point, if the next line is a new question end loop
                if (fileLines[idx + i] && fileLines[idx + i].startsWith('####')) continue;
                if (fileLines[idx + i] && fileLines[idx + i].startsWith('- [')) {
                    if (currentOption) {
                        options.push(currentOption);
                        currentOption = fileLines[idx + i];
                    } else {
                        currentOption = fileLines[idx + i];
                    }
                } else {
                    if (currentOption) {
                        currentOption += `\n${fileLines[idx + i]}`;
                    }
                }
            }
            questions.push({
                question,
                options: options.map((item) => item.substring(6)),
                _ps: options.findIndex((item) => item.indexOf('[x]') >= 0),
            });
        }
    });
    return questions;
};

(async () => {
    // index of type argument
    const typeIdx = argv.indexOf('--type');
    /* type argument not found */
    if (!typeIdx)
        return console.log('\x1b[31m%s\x1b[0m', 'data.ts: Your must pass a type argument. Use --type <value>');

    /* type argument value not found */
    if (!argv[typeIdx + 1])
        return console.log('\x1b[31m%s\x1b[0m', 'data.ts : type argument has no value. Use --type <value>');

    const typeVal = argv[typeIdx + 1];

    if (typeVal !== 'prod' && typeVal !== 'dev')
        return console.log('\x1b[31m%s\x1b[0m', 'data.ts: type argument can only have values of prod or dev');

    /* Copy dev to prod if type is prod */
    if (typeVal === 'prod') {
        return fs.copy(dataDev, dataProd, { overwrite: true }, function (err) {
            if (err) return console.log('\x1b[31m%s\x1b[0m', 'data.ts: err', err);
            console.log('\x1b[42m%s\x1b[0m', 'data.ts: Moved data to prod successfully');
        });
    }
    const dirs = prodContents.filter((item) => item.type === 'dir' && item.name !== '.github');
    dirs.forEach(async (item) => {
        try {
            const fileName = (() => {
                if (item.path === 'c++') return `c++quiz`;
                switch (item.path) {
                    case 'c++':
                        return `c++quiz`;
                    case 'react':
                        return 'reactjs-quiz';
                    case 'seo':
                        return 'search-engine-optimization-quiz';
                    case 'microsoft-access':
                        return 'microsoft-access';
                    case 'oop':
                        return 'object-oriented-programming-quiz';
                    case 'linux':
                        return 'linux-assessment';
                    case 'google-cloud-platform':
                        return 'gcp-quiz';
                    default:
                        return item.path.replace('#', '-sharp').replace('-(programming-language)', '') + '-quiz';
                }
            })();
            const res = await axios.get(`${constants.fileBaseUrl}/${item.path.replace('#', '%23')}/${fileName}.md`);

            if (res.data) {
                const questions = await getQuestions(res.data as string);
                fs.writeFile(`output/data-dev/${fileName}.json`, JSON.stringify(questions, null, 4), function (err) {
                    if (err) throw err;
                    console.log('\x1b[42m%s\x1b[0m', 'data.ts: Content fetched & written to file successfully');
                });
            }
        } catch (err) {
            console.log('\x1b[41m%s\x1b[0m', 'data.ts: err', err);
        }
    });
})();
