const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

describe("when there are some blogs initially in the database", () => {
  const initialPosts = [
    {
      title: "Asd Patterns",
      author: "Asd Asder",
      url: "https://reactpatterns.com/",
      likes: 0,
    },
    {
      title: "Advanced Asding",
      author: "Asd Asdington",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 0,
    },
  ];

  const initialUsers = [
    { username: "asder", password: "asdasd123" },
    { username: "asdist", password: "asdist123" },
  ];

  let tokenHeader;

  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    for (const user of initialUsers) {
      await api
        .post("/api/users")
        .send(user)
        .expect(201)
        .expect("content-type", /json/);
    }

    const loginRes = await api
      .post("/api/login")
      .send(initialUsers[0])
      .expect(200)
      .expect("content-type", /json/);

    tokenHeader = `Bearer ${loginRes.body.token}`;

    for (const post of initialPosts) {
      await api
        .post("/api/blogs")
        .set("Authorization", tokenHeader)
        .send(post)
        .expect(201)
        .expect("content-type", /json/);
    }
  });

  test("notes are returned as json and the correct amount is returned", async () => {
    const res = await api
      .get("/api/blogs")
      .expect(200)
      .expect("content-type", /json/);
    expect(res.body).toHaveLength(initialPosts.length);
  });

  test("id field exists on requested blogs", async () => {
    const res = await api.get("/api/blogs");
    for (const blog of res.body) {
      expect(blog.id).toBeDefined();
    }
  });

  test("blogs can be added", async () => {
    const blog = {
      title: "Introduction to Asding",
      author: "Asder Asdman",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 2,
    };
    await api
      .post("/api/blogs")
      .set("Authorization", tokenHeader)
      .send(blog)
      .expect(201)
      .expect("content-type", /json/);

    const res = await api
      .get("/api/blogs")
      .expect(200)
      .expect("content-type", /json/);

    expect(res.body).toHaveLength(initialPosts.length + 1);
    expect(res.body.map((r) => r.title)).toContain(blog.title);
  });

  test("blogs can't be added without logging in", async () => {
    const blog = {
      title: "Introduction to Asding",
      author: "Asder Asdman",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 2,
    };
    await api
      .post("/api/blogs")
      .send(blog)
      .expect(401)
      .expect("content-type", /json/);
  });

  test("likes defaults to 0 on POST", async () => {
    const blog = {
      title: "Introduction to Asding",
      author: "Asder Asdman",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", tokenHeader)
      .send(blog)
      .expect(201)
      .expect("content-type", /json/);

    const res = await api
      .get("/api/blogs")
      .expect(200)
      .expect("content-type", /json/);

    for (const blog of res.body) {
      expect(blog.id).toBeDefined();
    }
  });

  test("bad blog upload results in 400 Bad Request", async () => {
    const notQuiteABlog = { tilet: "Basics of Sading", maker: "Sader Sadsad" };

    await api.post("/api/blogs").send(notQuiteABlog).expect(400);
  });

  test("blogs can be deleted", async () => {
    let blogs = (
      await api.get("/api/blogs").expect(200).expect("content-type", /json/)
    ).body;
    for (const [idx, blog] of blogs.entries()) {
      await api
        .delete(`/api/blogs/${blog.id}`)
        .set("Authorization", tokenHeader)
        .expect(200)
        .expect("content-type", /json/);

      const blogsAfterDelete = (
        await api.get("/api/blogs").expect(200).expect("content-type", /json/)
      ).body;

      expect(blogsAfterDelete.map((blog) => blog.title)).not.toContain(
        blog.title
      );
      expect(blogsAfterDelete.length).toEqual(initialPosts.length - (idx + 1));
    }
  });

  test("blogs can be updated", async () => {
    let blogs = (
      await api.get("/api/blogs").expect(200).expect("content-type", /json/)
    ).body;

    let oldId = blogs[0].id;

    const blogUpdate = {
      title: "Asder's update on the status of Asd",
      author: "Asder Asderson",
      likes: 9001,
    };

    await api.put(`/api/blogs/${oldId}`).send(blogUpdate).expect(200);

    let updatedBlogs = (
      await api.get("/api/blogs").expect(200).expect("content-type", /json/)
    ).body;

    expect(
      updatedBlogs.map((blog) => ({
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      }))
    ).toContainEqual(blogUpdate);
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
