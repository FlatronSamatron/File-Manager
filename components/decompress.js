import * as fs from "fs";
import * as zlib from "zlib";
import path from "path";

export const decompress = async (inputPath, outputPath, currentPath) => {
    const inputStream = fs.createReadStream(path.resolve(currentPath, inputPath));
    const compressedStream = zlib.createBrotliDecompress();
    const outputStream = fs.createWriteStream(path.resolve(currentPath, outputPath));

    inputStream.pipe(compressedStream).pipe(outputStream);

    inputStream.on('error', () => {
        console.log('Operation failed')
    });

    outputStream.on('error', (err) => {
        console.log(err)
        console.log('Operation failed')
    });
};