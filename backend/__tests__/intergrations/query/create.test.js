const request = require('supertest');
const app = require('@/app');
const createFakeObjectId = require('../../utils/ids');

const END_POINT = '/api/query/create';

describe(`POST ${END_POINT}`, () => {
  // creating query test
  
  clientId = createFakeObjectId();
  
  it('should create a new query', async () => {
    const response = await request(app)
      .post(END_POINT)
      .set('Authorization', 'Bearer testtoken')
      .send({
        client: clientId,
        description: 'New test query',
        status: 'Open',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.result.description).toBe('New test query');
  });
});
