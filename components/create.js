import path from "path";
import {writeFile} from "node:fs/promises";

export const create = async (file, currentPath) => {
    try {
        const filePath = path.resolve(currentPath, file)
        return await writeFile(filePath, '');
    } catch (err) {
        console.log('Operation failed')
    }
};