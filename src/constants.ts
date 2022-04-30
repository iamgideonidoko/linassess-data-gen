import { config } from 'dotenv';

config();

type Constant = {
    baseUrl: string;
};

const constants: Constant = {
    baseUrl: process.env.BASE_URL as string,
};

export default constants;
