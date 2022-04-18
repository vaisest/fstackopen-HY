const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("", (req, res, next) => {
  Blog.find({})
    .populate("user", { username: true, name: true, id: true })
    .then((blogs) => {
      res.json(blogs);
    });
});

blogsRouter.post("", async (req, res, next) => {
  const { title, author, url, likes } = req.body;
  const newBlog = { title, author, url, likes };
  const user = req.user;

  if (!("likes" in newBlog)) {
    newBlog.likes = 0;
  }

  if (!(newBlog.title && newBlog.author && newBlog.url)) {
    res.status(400).json({ error: "Missing title, author, or url" });
    return;
  }

  const existing = await Blog.findOne({ title: newBlog.title });
  if (existing) {
    res.status(400).json({ error: "Blog name already exists" });
    return;
  }

  if (!user) {
    res.status(401).json({ error: "User authentication failed" });
    return;
  }

  newBlog.user = user._id;

  const blog = new Blog(newBlog);

  const result = await blog.save();

  user.blogs = user.blogs.concat(result._id);
  await user.save();

  res.status(201).json(result);
});

blogsRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;

  const user = req.user;

  const findResult = await Blog.findOne({
    _id: id,
  }).populate("user", { id: true });

  if (!findResult) {
    res.status(404).send({ error: "blog does not exist" });
  }

  if (user._id.equals(findResult.user._id)) {
    await findResult.delete();
    user.blogs = user.blogs.filter((blog) => !blog._id.equals(findResult._id));
    await user.save();
    res.status(200).send(findResult);
  } else {
    res.status(401).send({ error: "You are not the owner of this blog" });
  }
});

blogsRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const { title, author, url, likes } = req.body;
  const newBlog = { title, author, url, likes };

  if (
    !(
      newBlog.title &&
      newBlog.author &&
      newBlog.url &&
      Number.isInteger(newBlog.likes)
    )
  ) {
    res.status(400).json({ error: "Missing title, author, likes, or url" });
    return;
  }
  const updateResult = await Blog.findByIdAndUpdate(id, newBlog, {
    new: true,
  });
  if (!updateResult) {
    res.status(404).send({ error: "id not found when updating blog" });
    return;
  }
  res.status(200).send(updateResult);
});

module.exports = blogsRouter;
