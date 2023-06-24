import {createReadStream} from "node:fs";

export const read = async (path) => {
    try {
        const rs = createReadStream(path);
        rs.on('error', (err) => {
            console.log('Operation failed')
        });
        rs.pipe(process.stdout)
    } catch (err) {
        console.log('Operation failed')
    }
};