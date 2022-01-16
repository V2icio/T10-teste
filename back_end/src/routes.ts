import express from 'express';
import participationsController from './controller/participations';

const routes = express.Router();

routes.get('/participations', participationsController.getParticipations);
routes.get('/participations/:id', participationsController.getParticipation);
routes.post('/participations', participationsController.createParticipation);
routes.put('/participations/:id', participationsController.updateParticipation);
routes.delete(
  '/participations/:id',
  participationsController.deleteParticipation,
);

export default routes;
