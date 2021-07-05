import { Router } from 'express';
import LogsController from '../controllers/LogsController';

const logsRouter = Router();
const logsController = new LogsController();

logsRouter.get('/', logsController.index);

export default logsRouter;
