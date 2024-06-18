/* eslint-disable @typescript-eslint/no-explicit-any */
import request from 'supertest';
import { createServer } from './server';

describe('Server', () => {
  let server: any;
  let app: any;

  beforeAll((done) => {
    createServer(5050).then((result) => {
      app = result.app;
      server = result.run();
      app.on('listened', done);
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  it('Should respond to health check', async () => {
    const res = await request(app).get('/check');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ result: 'OK' });
  });
});
