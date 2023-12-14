const userService = require("../../services/user.service")
const { createServer } = require("../../server")
const supertest = require("supertest")

const app = createServer();

const mockLoginUser = {
  user_id: 1,
  email: "test@example.com",
  is_admin: false
}

const mockRegisterUser = {
  user_id: 2,
  email: "newuser@example.com",
  is_admin: false
}

const loginBody = {
  email: "test@example.com",
  password: "Password123"
}

const registrationBody = {
  email: "newuser@example.com",
  password: "Password123"
}

describe("auth.controller", () => {
  describe("login()", () => {
    describe("given a valid email and password", () => {
      it('login user', async () => {
        const mockUserServiceLogin = jest.spyOn(userService, "loginUser")
          .mockReturnValue([mockLoginUser, null])

        const { statusCode, body } = await supertest(app)
          .post("/api/auth/login")
          .send(loginBody)

        expect(statusCode).toBe(200);
        expect(body.user).toEqual(mockLoginUser);
        expect(mockUserServiceLogin).toHaveBeenCalledWith(loginBody);
      })

    });
  });

  describe("register()", () => {
    describe("given a valid email and password", () => {
      it('create new user', async () => {
        const mockUserServiceRegister = jest.spyOn(userService, "registerNewUser")
          .mockReturnValue([mockRegisterUser, null])

        const { statusCode, body } = await supertest(app)
          .post("/api/auth/register")
          .send(registrationBody);

        expect(statusCode).toBe(200);
        expect(body.user).toEqual(mockRegisterUser);
        expect(mockUserServiceRegister).toHaveBeenCalledWith(registrationBody);
      })

    });
  });
});