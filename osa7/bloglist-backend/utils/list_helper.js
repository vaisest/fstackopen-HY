const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((previousValue, blog) => previousValue + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  return blogs.reduce((previousBlog, blog) =>
    // return blog with more likes:
    previousBlog.likes < blog.likes ? blog : previousBlog
  );
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  counts = {};
  blogs.forEach((blog) => {
    if (blog.author in counts) {
      counts[blog.author] += 1;
    } else {
      counts[blog.author] = 1;
    }
  });

  let maxAuthor = "";
  let maxCount = 0;

  for (const [author, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxAuthor = author;
      maxCount = count;
    }
  }

  return { author: maxAuthor, blogs: maxCount };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  likeCounts = {};

  blogs.forEach((blog) => {
    if (blog.author in likeCounts) {
      likeCounts[blog.author] += blog.likes;
    } else {
      likeCounts[blog.author] = blog.likes;
    }
  });

  let maxAuthor = "";
  let maxLikes = -Infinity;

  for (const [author, likes] of Object.entries(likeCounts)) {
    if (maxLikes === -Infinity || likes > maxLikes) {
      maxAuthor = author;
      maxLikes = likes;
    }
  }

  return { author: maxAuthor, likes: maxLikes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
