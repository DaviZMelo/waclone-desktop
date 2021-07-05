import { Router } from 'express';
import CloningController from '../controllers/CloningController';

const cloningRouter = Router();
const cloningController = new CloningController();

cloningRouter.post('/', cloningController.create);
cloningRouter.delete('/', cloningController.delete);

export default cloningRouter;
