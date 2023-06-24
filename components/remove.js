import {unlink} from "node:fs";

export const remove = async (pathFile) => {
    try {
        await unlink(pathFile, (err) => {
            if (err) {
                console.log('Operation failed')
            }
        })
    } catch (err) {
        console.log('Operation failed')
    }
};