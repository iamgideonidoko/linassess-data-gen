import { config } from 'dotenv';

config();

type Constant = {
    fileBaseUrl: string;
    dirBaseUrl: string;
};

export const constants: Constant = {
    fileBaseUrl: process.env.FILE_BASE_URL as string,
    dirBaseUrl: process.env.DIR_BASE_URL as string,
};
