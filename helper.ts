import { config } from 'dotenv';

config();

type Constant = {
    fileBaseUrl: string;
    dirBaseUrl: string;
};

export const constants: Constant = {
    fileBaseUrl: 'https://raw.githubusercontent.com/Ebazhanov/linkedin-skill-assessments-quizzes/master',
    dirBaseUrl: 'https://api.github.com/repos/Ebazhanov/linkedin-skill-assessments-quizzes',
};
