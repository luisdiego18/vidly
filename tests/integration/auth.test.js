const { User } = require("../../models/user");
const { Genre } = require("../../models/genre");
const request = require("supertest");

describe("auth middleware", () => {
  let token;

  const exec = () => {
    return request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: "genre1" });
  };

  beforeEach(() => {
    server = require("../../index");
    token = new User().generateAuthToken();
  });
  afterEach(async () => {
    await Genre.remove({});
    await server.close();
  });

  it("Should return 401 if no token is provided", async () => {
    token = "";

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it("Should return 400 if token is invalid", async () => {
    token = "a";

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("Should return 200 if token is valid", async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });
});
