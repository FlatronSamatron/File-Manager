import {createReadStream, createWriteStream, unlink} from "node:fs";
import path from "path";

export const moveFile = async (pathFile, destination) => {
    const readStream = createReadStream(pathFile);
    const writeStream = createWriteStream(destination + path.basename(pathFile));

    readStream.pipe(writeStream);

    writeStream.on('finish', () => {
        unlink(pathFile, (err) => {
            if (err) {
                console.log('Operation failed')
            }
        });
    });

    readStream.on('error', (err) => {
        console.log('Operation failed')
    });

    writeStream.on('error', (err) => {
        console.log('Operation failed')
    });
};