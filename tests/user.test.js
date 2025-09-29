const request = require("supertest");
const app = require("../api");
const User = require("../models/user");

describe("POST /auth/register", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("POST /auth/register inscription réussie", async () => {
    jest.spyOn(User, "findOne").mockResolvedValue(null);

    const requestBody = {
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
      password: "JohnDoePassword",
    };

    jest.spyOn(User.prototype, "save").mockResolvedValue({
      _id: "67d0547de816ad8c1f7113ce",
      firstname: requestBody.firstname,
      lastname: requestBody.lastname,
      email: requestBody.email,
    });

    const res = await request(app).post("/auth/register").send(requestBody);

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("Utilisateur créé et connecté");
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(requestBody.email);
  });

  it("POST /auth/register Utilisateur déjà existant", async () => {
    jest.spyOn(User, "findOne").mockResolvedValue({
      _id: "67d0547de816ad8c1f7113ce",
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
      password: "JohnDoeHashedPassword",
      __v: 0,
    });

    const requestBody = {
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
      password: "JohnDoePassword",
    };

    const res = await request(app).post("/auth/register").send(requestBody);

    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe("Utilisateur existe déjà");
  });
});
