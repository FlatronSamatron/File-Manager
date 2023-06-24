import {createReadStream, createWriteStream} from "node:fs";
import path from "path";

export const copyFile = async (pathFile, destination) => {
    const readStream = createReadStream(pathFile);
    const writeStream = createWriteStream(destination + path.basename(pathFile));

    readStream.pipe(writeStream);

    readStream.on('error', (err) => {
        console.log('Operation failed')
    });

    writeStream.on('error', (err) => {
        console.log('Operation failed')
    });
};