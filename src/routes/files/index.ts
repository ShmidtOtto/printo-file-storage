import { Router } from 'express';
import saveRouter from './save-file';
import getRouter from './get-file'


const router = Router();
router.post('', saveRouter);
router.get('/:fileId', getRouter);

export default router;