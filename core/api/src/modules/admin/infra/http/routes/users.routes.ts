import { Router } from 'express';
import MasterUserController from '../controllers/MasterUserController';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();
const masterUserController = new MasterUserController();

usersRouter.get('/', usersController.index);
usersRouter.post('/', usersController.update);

usersRouter.get('/master', masterUserController.index);
usersRouter.post('/master', masterUserController.update);

export default usersRouter;
