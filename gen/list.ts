import fs from 'fs-extra';
/**
 * Generate a json file of all available quizzes
 */

//capitalize all words of a string.
function capitalizeWords(string: string): string {
    return string.replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
    });
}

const getName = (str: string): string => {
    let newName = str.replace('-sharp', '#').replace('.json', '');
    switch (newName) {
        case 'c++quiz':
            newName = 'C++';
            break;
        case 'reactjs-quiz':
            newName = 'React';
            break;
        case 'search-engine-optimization-quiz':
            newName = 'SEO';
            break;
        case 'microsoft-access':
            newName = 'Microsoft Access';
            break;
        case 'object-oriented-programming-quiz':
            newName = 'OOP';
            break;
        case 'linux-assessment':
            newName = 'Linux';
            break;
        case 'gcp-quiz':
            newName = 'Google Cloud Platform';
            break;
        default:
            break;
    }

    return capitalizeWords(newName.replace('quiz', '').replace(/-/g, ' ').trim());
};

fs.readdir('output/data-prod', (err, files) => {
    const filesInfo = files
        .filter((item) => item.endsWith('.json'))
        .map((item) => {
            return {
                name: getName(item),
                fileName: item,
            };
        });

    const data = {
        quizzes: filesInfo,
    };

    fs.writeFile(`output/list.json`, JSON.stringify(data, null, 4), function (err) {
        if (err) throw err;
        console.log('\x1b[42m%s\x1b[0m', 'list.ts: List generated successfully');
    });
});
