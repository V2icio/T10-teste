import { Request, Response } from 'express';
import db from '../database';
import { Participation } from '../types/Participation';

export default {
  getParticipations: async (req: Request, res: Response) => {
    const snapshot = await db.collection('participations').get();
    const participations: Participation[] = [];
    snapshot.forEach(async (doc) => {
      participations.push({ ...(<Participation>doc.data()), id: doc.id });
    });
    res.send(participations);
  },

  getParticipation: async (req: Request, res: Response) => {
    const participationRef = await db
      .collection('participations')
      .doc(req.params.id)
      .get();

    if (!participationRef.exists) {
      return res.status(400).send({ message: 'Id provided not found.' });
    }

    const participation: Participation = <Participation>participationRef.data();
    participation.id = req.params.id;
    return res.send(participation);
  },

  createParticipation: async (req: Request, res: Response) => {
    const mandatoryFields = ['firstName', 'lastName', 'participation'];
    for (let i = 0; i < mandatoryFields.length; i += 1) {
      const fieldName = mandatoryFields[i];
      if (req.body[fieldName] === null || req.body[fieldName] === undefined) {
        return res
          .status(400)
          .send({ message: `Field ${fieldName} is mandatory.` });
      }
    }

    const participation: Participation = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      participation: req.body.participation,
    };

    const participationCreatedRef = await db
      .collection('participations')
      .add(participation);

    participation.id = participationCreatedRef.id;

    return res.send(participation);
  },

  updateParticipation: async (req: Request, res: Response) => {
    const participationRef = await db
      .collection('participations')
      .doc(req.params.id)
      .get();

    if (!participationRef.exists) {
      return res.status(400).send({ message: 'Id provided not found.' });
    }

    const participation: Participation = <Participation>participationRef.data();
    const aux: { [key: string]: any } = {};
    Object.keys(participation).forEach((key) => {
      if (req.body[key] != null) {
        aux[key] = req.body[key];
      }
    });

    await db.collection('participations').doc(req.params.id).update(aux);

    return res.send({
      id: req.params.id,
      ...(
        await db.collection('participations').doc(req.params.id).get()
      ).data(),
    });
  },

  deleteParticipation: async (req: Request, res: Response) => {
    const participationRef = await db
      .collection('participations')
      .doc(req.params.id)
      .get();

    if (!participationRef.exists) {
      return res.status(400).send({ message: 'Id provided not found.' });
    }
    await db.collection('participations').doc(req.params.id).delete();

    return res.send();
  },
};
