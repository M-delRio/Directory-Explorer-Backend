const request = require('supertest')
const app = require('../src/server')

// describe('successful GET Endpoints', () => {
//   it('should receive reponse of default/home folder content', async () => {
//     const res = await request(app)
//       .get('/folderss')
//     // .send()
//     expect(res.statusCode).toEqual(200)
//     // expect(res.body).toHaveProperty('message')
//   })
// })


describe('unsuccessful GET Endpoints', () => {
  it('get request to ressource that does not exist', async () => {
    const res = await request(app)
      .get('/foldersss')

    expect(res.statusCode).toEqual(404)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toBe('the requested ressource does not exist')
  })
})

describe('unsuccessful HTTP methods', () => {
  it('POST request', async () => {
    const res = await request(app)
      .post('/folders')

    expect(res.statusCode).toEqual(405)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toBe('unsupported http method')
  })

  it('PATCH request', async () => {
    const res = await request(app)
      .patch('/folders')

    expect(res.statusCode).toEqual(405)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toBe('unsupported http method')
  })

  it('PUT request', async () => {
    const res = await request(app)
      .put('/folders')

    expect(res.statusCode).toEqual(405)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toBe('unsupported http method')
  })

  it('DELETE request', async () => {
    const res = await request(app)
      .delete('/folders')

    expect(res.statusCode).toEqual(405)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toBe('unsupported http method')
  })
})