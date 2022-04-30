import { config } from 'dotenv';

config();

type Constant = {
    baseUrl: string;
};

export const constants: Constant = {
    baseUrl: process.env.BASE_URL as string,
};
