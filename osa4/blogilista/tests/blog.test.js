const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  const empty = [];

  test("empty list has zero likes", () => {
    const res = listHelper.totalLikes(empty);
    expect(res).toBe(0);
  });

  const listWithManyBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    },
  ];

  test("many blogs means many likes", () => {
    const res = listHelper.totalLikes(listWithManyBlogs);
    expect(res).toBe(36);
  });

  const listWithManyUnpopularBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "Asd Patterns",
      author: "Asd Asder",
      url: "https://reactpatterns.com/",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "The Dangers of ASD",
      author: "Asd 'asdful' Asdasd",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "The Basics of Asd",
      author: "Asd Asdington",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 0,
      __v: 0,
    },
  ];
  test("many unliked blogs have zero likes", () => {
    const res = listHelper.totalLikes(listWithManyUnpopularBlogs);
    expect(res).toBe(0);
  });
});

describe("favorite blog", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog it is returned", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual({
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    });
  });

  const listWithManyBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    },
  ];

  test("many blogs means many likes", () => {
    const res = listHelper.favoriteBlog(listWithManyBlogs);
    expect(res).toEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    });
  });

  const listWithManyUnpopularBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "Asd Patterns",
      author: "Asd Asder",
      url: "https://reactpatterns.com/",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "The Dangers of ASD",
      author: "Asd 'asdful' Asdasd",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "The Basics of Asd",
      author: "Asd Asdington",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 0,
      __v: 0,
    },
  ];
  test("many unliked blogs have zero likes", () => {
    const res = listHelper.favoriteBlog(listWithManyUnpopularBlogs);
    expect(res).toEqual({
      _id: "5a422a851b54a676234d17f7",
      title: "Asd Patterns",
      author: "Asd Asder",
      url: "https://reactpatterns.com/",
      likes: 0,
      __v: 0,
    });
  });
});

describe("get author with most blogs", () => {
  const listWithManyUnpopularBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "Asd Patterns",
      author: "Asd Asder",
      url: "https://reactpatterns.com/",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Advanced Asding",
      author: "Asd Asdington",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "The Basics of Asd",
      author: "Asd Asdington",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 0,
      __v: 0,
    },
  ];

  test("list of blogs gets right author", () => {
    const res = listHelper.mostBlogs(listWithManyUnpopularBlogs);
    expect(res).toEqual({ author: "Asd Asdington", blogs: 2 });
  });

  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Fullasd Development",
      author: "Asdsad Asds",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("list of one blog gets right author", () => {
    const res = listHelper.mostBlogs(listWithOneBlog);
    expect(res).toEqual({ author: "Asdsad Asds", blogs: 1 });
  });

  const listWithTwoBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "Asd Patterns",
      author: "Asd Asder",
      url: "https://reactpatterns.com/",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Advanced Asding",
      author: "Asd Asdington",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 0,
      __v: 0,
    },
  ];

  test("list of two blogs gets first author", () => {
    const res = listHelper.mostBlogs(listWithTwoBlogs);
    expect(res).toEqual({ author: "Asd Asder", blogs: 1 });
  });
});

describe("get author with most likes", () => {
  const listWithManyPopularBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "Asd Patterns",
      author: "Asd Asder",
      url: "https://reactpatterns.com/",
      likes: 35,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Advanced Asding",
      author: "Asd Asdington",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 14,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "The Basics of Asd",
      author: "Asd Asdington",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 22,
      __v: 0,
    },
  ];

  test("list of blogs gets right author", () => {
    const res = listHelper.mostLikes(listWithManyPopularBlogs);
    expect(res).toEqual({ author: "Asd Asdington", likes: 36 });
  });

  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Fullasd Development",
      author: "Asdsad Asds",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("list of one blog gets right author", () => {
    const res = listHelper.mostLikes(listWithOneBlog);
    expect(res).toEqual({ author: "Asdsad Asds", likes: 5 });
  });

  const listWithTwoBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "Asd Patterns",
      author: "Asd Asder",
      url: "https://reactpatterns.com/",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Advanced Asding",
      author: "Asd Asdington",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 0,
      __v: 0,
    },
  ];

  test("list of two unliked blogs gets first author", () => {
    const res = listHelper.mostLikes(listWithTwoBlogs);
    expect(res).toEqual({ author: "Asd Asder", likes: 0 });
  });
});
