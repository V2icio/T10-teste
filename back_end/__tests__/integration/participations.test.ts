import 'jest';

// import '@types/jest';

import request from 'supertest';
import { Participation } from '../../src/types/Participation';
import app from '../../src/app';

describe('CRUD Participation', () => {
  const participation: Participation = {
    firstName: 'Volmir',
    lastName: 'Fiorini',
    participation: 15,
  };

  it('should create a participation', async () => {
    const response = await request(app)
      .post('/api/participations')
      .send(participation);
    expect(response.status).toBe(200);

    expect(response.body.firstName).toBe(participation.firstName);
    expect(response.body.lastName).toBe(participation.lastName);
    expect(response.body.participation).toBe(participation.participation);

    expect(response.body).toHaveProperty('id');

    participation.id = response.body.id;
  });
  it('should find the participation created', async () => {
    const response = await request(app).get(
      `/api/participations/${participation.id}`,
    );
    expect(response.status).toBe(200);

    expect(response.body.firstName).toBe(participation.firstName);
    expect(response.body.lastName).toBe(participation.lastName);
    expect(response.body.participation).toBe(participation.participation);

    expect(response.body).toHaveProperty('id');
  });
  it('should find a list of participations with the participation created', async () => {
    const response = await request(app).get('/api/participations');
    expect(response.status).toBe(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toContainEqual<Participation>(participation);
  });
  it('should update the participation', async () => {
    participation.firstName = 'New First name';
    participation.lastName = 'New Last name';
    participation.participation = 25;

    const responseUpdate = await request(app)
      .put(`/api/participations/${participation.id}`)
      .send(participation);
    expect(responseUpdate.status).toBe(200);

    expect(responseUpdate.body.firstName).toBe(participation.firstName);
    expect(responseUpdate.body.lastName).toBe(participation.lastName);
    expect(responseUpdate.body.participation).toBe(participation.participation);

    expect(responseUpdate.body).toHaveProperty('id');
    expect(responseUpdate.body.id).toBe(participation.id);

    const responseGet = await request(app).get(
      `/api/participations/${participation.id}`,
    );
    expect(responseGet.status).toBe(200);

    expect(responseGet.body.firstName).toBe(participation.firstName);
    expect(responseGet.body.lastName).toBe(participation.lastName);
    expect(responseGet.body.participation).toBe(participation.participation);
  });

  it('should delete the participation', async () => {
    const responseUpdate = await request(app).delete(
      `/api/participations/${participation.id}`,
    );
    expect(responseUpdate.status).toBe(200);

    const responseGet = await request(app).get(
      `/api/participations/${participation.id}`,
    );
    expect(responseGet.status).toBe(400);
  });
});

describe('CRUD Participation - Exceptions expected', () => {
  const participation: Participation = {
    firstName: 'Volmir',
    lastName: 'Fiorini',
    participation: 15,
  };

  it('should send a error when trying to create a participation without a firstName', async () => {
    const temporaryParticipation = Object.assign(participation);
    temporaryParticipation.firstName = undefined;
    const response = await request(app)
      .post('/api/participations')
      .send(temporaryParticipation);
    expect(response.status).toBe(400);
  });

  it('should send a error when trying to create a participation without a lastName', async () => {
    const temporaryParticipation = Object.assign(participation);
    temporaryParticipation.lastName = undefined;
    const response = await request(app)
      .post('/api/participations')
      .send(temporaryParticipation);
    expect(response.status).toBe(400);
  });

  it('should send a error when trying to create a participation without a participation', async () => {
    const temporaryParticipation = Object.assign(participation);
    temporaryParticipation.lastName = undefined;
    const response = await request(app)
      .post('/api/participations')
      .send(participation);
    expect(response.status).toBe(400);
  });

  it('should send a error when trying to update a participation that does not exist', async () => {
    const response = await request(app).put(
      `/api/participations/${'invalidId'}`,
    );
    expect(response.status).toBe(400);
  });

  it('should send a error when trying to delete a participation that does not exist', async () => {
    const response = await request(app).delete(
      `/api/participations/${'invalidId'}`,
    );
    expect(response.status).toBe(400);
  });

  it('should send a error when trying to find a participation that does not exist', async () => {
    const response = await request(app).get(
      `/api/participations/${'invalidId'}`,
    );
    expect(response.status).toBe(400);
  });
});
