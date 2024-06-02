const { Router } = require('express');
const schemaValidator = require('./apps/middlewares/schemaValidator');

const AuthenticationMiddleware = require('./apps/middlewares/authentication');
const AuthenticationController = require('./apps/controllers/AuthenticationController');
const authSchema = require('./schema/auth.schema.json');

const UserControler = require('./apps/controllers/UserControler');
const userSchema = require('./schema/create.user.schema.json');

const  HostControler = require('./apps/controllers/HostControler');
const hostSchema = require('./schema/host.schema.json');
const hostServerNameSchema = require('./schema/host.server.name.schema.json');
const HostUserController = require('./apps/controllers/HostUserController');

const PendenciaController = require('./apps/controllers/PendenciaController');
const createPendenciaSchema = require('./schema/creat.pendencia.schema.json')

const routes = new Router();

routes.get('/health', (req, res) => res.send({
  message: 'Connected with success!',
}));


routes.post('/auth', schemaValidator(authSchema), AuthenticationController.authenticate);
routes.post('/user', schemaValidator(userSchema), UserControler.create);

routes.use(AuthenticationMiddleware);

routes.put('/user', UserControler.update);
routes.delete('/user', UserControler.delete);
routes.get('/user', UserControler.userProfile);

routes.post('/host', schemaValidator(hostSchema), HostControler.create);
routes.put('/host/:id',  HostControler.update);
routes.delete('/host/:id', schemaValidator(hostServerNameSchema), HostControler.delete);
routes.get('/host', HostControler.listByUserId)

routes.post('/hostUser', schemaValidator(hostServerNameSchema), HostUserController.logarNoHost);
routes.delete('/hostUsers', schemaValidator(hostServerNameSchema), HostUserController.logOut);

routes.post('/pendencia', schemaValidator(createPendenciaSchema), PendenciaController.create);

module.exports = routes;