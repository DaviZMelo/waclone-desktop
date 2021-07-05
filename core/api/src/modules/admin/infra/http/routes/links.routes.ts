import { Router } from 'express';

import LinkMessageController from '../controllers/LinkMessageController';
import LinkModeController from '../controllers/LinkModeController';

const linksRouter = Router();

const linkMessageController = new LinkMessageController();
const linkModeController = new LinkModeController();

linksRouter.get('/mode', linkModeController.index);
linksRouter.post('/mode', linkModeController.update);

linksRouter.get('/message', linkMessageController.index);
linksRouter.post('/message', linkMessageController.update);

export default linksRouter;
