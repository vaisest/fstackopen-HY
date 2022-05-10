const bcrypt = require("bcrypt");
const User = require("../models/user");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

describe("when there is initially one user at db", () => {
  const initialUsers = [{ username: "asder", password: "asdasd123" }];

  beforeEach(async () => {
    await User.deleteMany({});

    for (const { username, password } of initialUsers) {
      const passwordHash = await bcrypt.hash("password", 10);
      const user = new User({ username, passwordHash });
      await user.save();
    }
  });

  test("creation succeeds with a fresh username", async () => {
    const newUser = {
      username: "asdermonster",
      name: "Asd Asderton",
      password: "asdsadssd2",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await api
      .get("/api/users")
      .expect(200)
      .expect("content-type", /json/);

    expect(usersAtEnd.body).toHaveLength(initialUsers.length + 1);

    const usernames = usersAtEnd.body.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test("various incorrect credentials dont work for register", async () => {
    const badUsers = [
      { username: "a", password: "asdsadssd2" },
      { username: "", password: "asdasdssss111112" },
      { username: "asder", password: "asdasd123" },
      { username: "asdsaadsdsasasa", password: "a" },
      { password: "sdaasdasdasd123" },
      { username: "asdermonster2009" },
    ];

    for (const user of badUsers) {
      const res = await api
        .post("/api/users")
        .send(user)
        .expect(400)
        .expect("Content-Type", /application\/json/);
    }

    const usersAtEnd = await api
      .get("/api/users")
      .expect(200)
      .expect("content-type", /json/);

    expect(usersAtEnd.body).toHaveLength(initialUsers.length);
    for (const badUser of badUsers) {
      if (initialUsers.find((user) => user.username === badUser.username)) {
        continue;
      }
      expect(usersAtEnd.body.map((user) => user.username)).not.toContain(
        badUser.username
      );
    }
  });
});
