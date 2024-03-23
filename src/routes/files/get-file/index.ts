import { Request, Response } from 'express';
import { Types } from 'mongoose'

import { fileModel } from '@models';

export default async (req: Request, res: Response) => {
    const fileId = req.params.fileId;

    if (!Types.ObjectId.isValid(fileId)) {
        return res.sendStatus(400).send();
    }

    const fileRecord = await fileModel.findById(fileId).exec();

    if (!fileRecord) {
        return res.sendStatus(404).send();
    }

    if (!fileRecord.path) {
        return res.sendStatus(500).send();
    }

    return res.sendFile(String(fileRecord.path));
};