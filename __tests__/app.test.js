const endpointsJson = require("../endpoints.json");
const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
/* Set up your test imports here */

/* Set up your beforeEach & afterAll functions here */

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: responds with a list of all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(topics.length).toBe(3);
        topics.forEach((topic) => {
          expect(topic).toMatchObject({
            description: expect.any(String),
            slug: expect.any(String),
          });
        });
      });
  });
});

describe("GET 404 Error", () => {
  test("404: responds with 404 error on wrong endpoint", () => {
    return request(app)
      .get("/api/banana")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe(
          "Endpoint not found. Please check the end point url again"
        );
      });
  });
});

describe("GET /api/articles", () => {
  test("200: responds with a list of all articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles.length).toBe(13);
        articles.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(String),
          });
        });
      });
  });
});

describe("GET /api/articles?sort_by=votes&order=desc", () => {
  test("200: responds with a list of all articles sorted", () => {
    return request(app)
      .get("/api/articles?sort_by=votes&order=desc")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles.length).toBe(13);
        expect(articles[0].votes).toBe(100);
      });
  });
});

describe("GET /api/articles?sort_by=votes&order=desc&topic=cats", () => {
  test("200: responds with a list of all articles sorted", () => {
    return request(app)
      .get("/api/articles?sort_by=votes&order=desc&topic=cats")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles.length).toBe(1);
        expect(articles[0].topic).toBe("cats");
      });
  });
});

describe("GET /api/articles/:id", () => {
  test("200: responds with an array of comments", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article).toMatchObject({
          author: expect.any(String),
          title: expect.any(String),
          article_id: 2,
          body: expect.any(String),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String),
          comment_count: expect.any(String),
        });
      });
  });
});

describe("GET /api/articles/:id/comments", () => {
  test("200: responds with an array of comments", () => {
    return request(app)
      .get("/api/articles/9/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments.length).toBe(2);
        comments.forEach((comment) => {
          expect(comment).toMatchObject({
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            article_id: 9,
          });
        });
      });
  });
});

describe("GET /api/articles/:id", () => {
  test("404: responds with an empty object", () => {
    return request(app)
      .get("/api/articles/5000")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("not found");
      });
  });
});

describe("GET /api/articles/:id/comments", () => {
  test("200: responds with an empty array when no comments exist for the article", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toEqual([]);
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("201: Responds with posted comment", () => {
    const testComment = {
      username: "icellusedkars",
      body: "Hello World",
    };

    return request(app)
      .post("/api/articles/2/comments")
      .send(testComment)
      .expect(201)
      .then(({ body }) => {
        const { comment } = body;

        expect(comment).toMatchObject({
          comment_id: expect.any(Number),
          body: "Hello World",
          article_id: 2,
          author: "icellusedkars",
          votes: 0,
          created_at: expect.any(String),
        });
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("200: Responds with updated article", () => {
    const testArticle = {
      inc_votes: 1,
    };

    return request(app)
      .patch("/api/articles/1")
      .send(testArticle)
      .expect(200)
      .then(({ body }) => {
        const { article } = body;

        expect(article.votes).toBe(101);
      });
  });
});

describe("DELETE /api/articles/:article_id", () => {
  test("204: Deletes the specified article and responds with no content", () => {
    return request(app)
      .delete("/api/articles/1")
      .expect(204)
      .then(() => {
        return db.query("SELECT * FROM articles WHERE article_id = 1;");
      })
      .then(({ rows }) => {
        expect(rows.length).toBe(0);
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("204: Deletes the specified comment and responds with no content", () => {
    return request(app)
      .delete("/api/comments/3")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });
});

describe("GET /api/users", () => {
  test("200: responds with a list of all users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users.length).toBe(4);
        users.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          });
        });
      });
  });
});

describe("GET /api/users/:username", () => {
  test("200: responds with a specific user", () => {
    return request(app)
      .get("/api/users/lurker")
      .expect(200)
      .then(({ body }) => {
        const { user } = body;

        expect(user.username).toBe("lurker");
      });
  });
});

describe("UPDATE /api/comments/:comment_id", () => {
  test("200: Updates the specified comment and increment the votes property of it", () => {
    const testArticle = {
      inc_votes: 1,
    };

    return request(app)
      .patch("/api/comments/1")
      .send(testArticle)
      .expect(200)
      .then(({ body }) => {
        const { comment } = body;
        expect(comment.votes).toEqual(17);
      });
  });
});

// test("201: Responds with the posted article", () => {
//   const testArticle = {
//     author: "lurker",
//     title: "How to test for Dummies",
//     body: "It's a bad sign if you're only just learning this now",
//     topic: "paper",
//     article_img_url: "https://tinyurl.com/testing-for-dummies",
//   };
//   return request(app)
//     .post("/api/articles")
//     .send(testArticle)
//     .expect(201)
//     .then(({ body: { article } }) => {
//       expect(article).toMatchObject({
//         article_id: 14,
//         title: "How to test for Dummies",
//         topic: "paper",
//         author: "lurker",
//         body: "It's a bad sign if you're only just learning this now",
//         created_at: expect.any(String),
//         votes: 0,
//         article_img_url: "https://tinyurl.com/testing-for-dummies",
//         comment_count: 0,
//       });
//     });
// });
