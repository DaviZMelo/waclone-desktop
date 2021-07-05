import { Router } from 'express';
import ContactsController from '../controllers/ContactsController';

const contactsRouter = Router();
const contactsController = new ContactsController();

contactsRouter.get('/', contactsController.index);

export default contactsRouter;
