import readline from 'readline';
import fs from 'fs';
import prodContents from '../output/contents-prod.json';

async function processLineByLine() {
    const fileStream = fs.createReadStream('src/test.md');

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

const getQuestions = async () => {
    const questions: Question[] = [];
    const fileLines = await processLineByLine();
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
