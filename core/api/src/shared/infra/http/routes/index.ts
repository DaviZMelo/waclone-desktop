import { Router } from 'express';

import groupsRouter from '@modules/admin/infra/http/routes/groups.routes';
import usersRouter from '@modules/admin/infra/http/routes/users.routes';
import logsRouter from '@modules/admin/infra/http/routes/logs.routes';
import configsRouter from '@modules/admin/infra/http/routes/configs.routes';
import linksRouter from '@modules/admin/infra/http/routes/links.routes';
import contactsRouter from '@modules/admin/infra/http/routes/contacts.routes';
import cloningRouter from '@modules/admin/infra/http/routes/cloning.routes';

const routes = Router();

routes.use('/admin/groups', groupsRouter);
routes.use('/admin/configs', configsRouter);
routes.use('/admin/logs', logsRouter);
routes.use('/admin/links', linksRouter);
routes.use('/admin/users', usersRouter);
routes.use('/admin/contacts', contactsRouter);
routes.use('/admin/cloning', cloningRouter);

export default routes;
