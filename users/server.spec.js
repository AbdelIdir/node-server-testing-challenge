const server = require("../server");
const request = require("supertest");

describe("server.js module", () => {
  it("has the right environment for the DB_ENV ", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("up endpoint", () => {
    it("returns a 200 OK async/await", async () => {
      const res = await request(server).get("/api/users");
      expect(res.status).toBe(200);
    });
  });

  it("should", () => {
    return request(server)
      .get("/api/users")
      .expect(200);
  });

//     it("should ", () => {
      
//   });
});
