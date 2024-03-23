import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

import { fileModel } from '@models';

const saveFileDir = process.env.STORAGE_DIR;
if (!saveFileDir) {
    throw new Error('saveFileDir is not defined');
}

export default async (req: Request, res: Response) => {
    const { 'content-disposition': description } = req.headers;
    const filenameAndExtension = description?.split(';')[1].split('=')[1].replace(/"/g, '');
    if (!filenameAndExtension) {
        return res.sendStatus(403).send();
    }

    const extension = filenameAndExtension.split('.').pop();
    if (!extension) {
        return res.sendStatus(403).send();
    }

    const file = new fileModel({
        name: filenameAndExtension,
        createdAt: new Date(),
    });

    await file.save();
    const fileId = file._id;



    const fullFilePath = saveFileDir + fileId + '.' + extension;
    const writeStream = fs.createWriteStream(fullFilePath); // Создать поток записи файла

    req.pipe(writeStream); // Чтение файла из потока запроса и запись в файл

    writeStream.on('finish', async () => {
        const fileInfo = fs.statSync(fullFilePath);

        file.set({
            size: fileInfo.size,
            extension: extension,
            path: fullFilePath,
        })

        await file.save();
        res.json({
            success: true,
            file: file._id
        }).end();
    });

    res.status(200);
};