import { Router } from 'express';
import GroupsController from '../controllers/GroupsController';
import SelectedGroupsController from '../controllers/SelectedGroupsController';

const groupsRouter = Router();
const groupsController = new GroupsController();
const selectedGroupsController = new SelectedGroupsController();

groupsRouter.get('/', groupsController.index);

groupsRouter.post('/selected', selectedGroupsController.update);
groupsRouter.get('/selected', selectedGroupsController.index);

export default groupsRouter;
