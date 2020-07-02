const request = require("supertest")
const app = require("../src/server")

//mock data for successful response

//input validation handling + testing (sanitation + prevent moving up directory)

describe("successful GET requests", () => {
  it("should receive reponse of default/home folder content", async () => {
    const res = await request(app)
      .get("/folders")

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty("message")
    expect(res.body.message).toBe("Folder content successfully retrieved")
  })
})

describe("unsuccessful GET requests", () => {
  it("request to ressource that does not exist", async () => {
    const res = await request(app)
      .get("/foldersss")

    expect(res.statusCode).toEqual(404)
    expect(res.body).toHaveProperty("message")
    expect(res.body.message).toBe("the requested ressource does not exist")
  })

  it("request for a non existant source folder", async () => {
    const res = await request(app)
      .get("/folders?path=as;dlkfj;daslkf/asdfasf")

    expect(res.statusCode).toEqual(422)
    expect(res.body).toHaveProperty("message")
    expect(res.body.message).toBe("Folder not found!")
  })
})

describe("unsuccessful HTTP methods", () => {
  it("POST request", async () => {
    const res = await request(app)
      .post("/folders")

    expect(res.statusCode).toEqual(405)
    expect(res.body).toHaveProperty("message")
    expect(res.body.message).toBe("unsupported http method")
  })

  it("PATCH request", async () => {
    const res = await request(app)
      .patch("/folders")

    expect(res.statusCode).toEqual(405)
    expect(res.body).toHaveProperty("message")
    expect(res.body.message).toBe("unsupported http method")
  })

  it("PUT request", async () => {
    const res = await request(app)
      .put("/folders")

    expect(res.statusCode).toEqual(405)
    expect(res.body).toHaveProperty("message")
    expect(res.body.message).toBe("unsupported http method")
  })

  it("DELETE request", async () => {
    const res = await request(app)
      .delete("/folders")

    expect(res.statusCode).toEqual(405)
    expect(res.body).toHaveProperty("message")
    expect(res.body.message).toBe("unsupported http method")
  })
})