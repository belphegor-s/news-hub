import "dotenv/config";

const METAPHOR_API_KEY = process.env?.METAPHOR_API_KEY ?? '';

if(!METAPHOR_API_KEY) {
    throw new Error('METAPHOR_API_KEY missing!');
}

export { METAPHOR_API_KEY }