import {readdir} from "node:fs/promises";
import path from "path";
import {stat} from "node:fs";

async function getFileStats(filePath, currentPath) {
    const pathFile = path.resolve(currentPath, filePath)
    return new Promise((resolve, reject) => {
        stat(pathFile, (err, stats) => {
            if (err) {
                console.log('Operation failed')
            } else {
                resolve(stats);
            }
        });
    });
}

export async function getFilesList(currentPath) {
    try {
        const files = await readdir(currentPath);
        const fileStats = await Promise.all(files.map((item)=> getFileStats(item, currentPath)));

        const tableFiles = fileStats.map((stats, index) => {
            const isDirectory = stats.isDirectory()
            return ({ Name: files[index], Type: isDirectory ? 'directory' : 'file' })
        });

        console.table(tableFiles)
    } catch (err) {
        console.log('Operation failed')
    }
}