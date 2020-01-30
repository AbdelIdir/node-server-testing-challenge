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

  it("should return a 200 OK", () => {
    return request(server)
      .get("/api/users")
      .expect(200);
  });

  it("returns the proper content type for the post request ", () => {
    return request(server)
      .post("/api/users/register")
      .expect("Content-Type", /json/);
  });

  it("returns the right content length on delete request ", () => {
    return request(server)
      .delete("/api/users/5")
      .expect("Content-Length", "13");
  });
});
