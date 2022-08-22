import { config } from 'dotenv';

config();

type Constant = {
    fileBaseUrl: string;
    dirBaseUrl: string;
    fileBaseUrl2: string;
    dirBaseUrl2: string;
};

export const constants: Constant = {
    fileBaseUrl: 'https://raw.githubusercontent.com/Ebazhanov/linkedin-skill-assessments-quizzes/master',
    dirBaseUrl: 'https://api.github.com/repos/Ebazhanov/linkedin-skill-assessments-quizzes',
    fileBaseUrl2: 'https://raw.githubusercontent.com/IamGideonIdoko/linkedin-skill-assessments-quizzes/master',
    dirBaseUrl2: 'https://api.github.com/repos/IamGideonIdoko/linkedin-skill-assessments-quizzes',
};
