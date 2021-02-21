import express from 'express';
import server from './index';
import request from 'supertest';
import { VALIDATE_RIDE_ROUTE } from './enums/routes';

describe('server test', () => {
  test('POST: returns 200 status', async () =>{
    const result: request.Response = await request(server).post(VALIDATE_RIDE_ROUTE);
    expect(result.status).toBe(200);
    expect(result.text).toBe('Request received!');
  });
});