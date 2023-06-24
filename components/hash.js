import {readFile} from "node:fs/promises";
const { createHash } = await import('node:crypto');

export const hash = async (path) => {
    try {
        const text = await readFile(path, { encoding: 'utf8' })
        const hash = createHash('sha256').update(text).digest('hex')
        console.log(hash)
    } catch (err) {
        console.log('Operation failed')
    }
};