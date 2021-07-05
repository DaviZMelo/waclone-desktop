import { Router } from 'express';
import ConfigsController from '../controllers/ConfigsController';

const configsRouter = Router();

const configsController = new ConfigsController();

configsRouter.get('/', configsController.index);
configsRouter.post('/', configsController.update);

export default configsRouter;
