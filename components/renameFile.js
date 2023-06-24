import path from "path";
import {rename} from "node:fs/promises";

export const renameFile = async (pathFile, file) => {
    try {
        const newPath = path.resolve(path.resolve(pathFile, '..'), file)
        await rename(pathFile, newPath)
    } catch (err) {
        console.log('Operation failed')
    }
};