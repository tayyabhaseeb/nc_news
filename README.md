# BE NC News

This project is a **backend API** for a news website. It provides endpoints to interact with articles, comments, users, and topics. Users can fetch data, filter, sort, and paginate results, as well as perform CRUD operations on some entities.

The project was built using **Node.js**, **Express**, and **PostgreSQL**.

---

## Hosted Version
<<<<<<< HEAD

=======
>>>>>>> 61a13119e03253bac5db42f3f06778281cdad59b
You can find the hosted version of the API at: [https://nc-news-1-vwa9.onrender.com/api](https://nc-news-1-vwa9.onrender.com/api)

---

## Features
<<<<<<< HEAD

=======
>>>>>>> 61a13119e03253bac5db42f3f06778281cdad59b
- Retrieve articles, topics, comments, and users.
- Filter articles by topic.
- Sort and paginate articles.
- Post new comments and delete comments by ID.
- Full test suite using **Jest**.

---

## Requirements
<<<<<<< HEAD

- **Node.js**: `>=16.0.0`
- **PostgreSQL**: `>=12.0`

---

## Installation and Setup

Follow these steps to set up the project locally:

### 1. Clone the repository

=======
- **Node.js**: `>=16.0.0`
- **PostgreSQL**: `>=12.0`

---

## Installation and Setup

Follow these steps to set up the project locally:

### 1. Clone the repository
>>>>>>> 61a13119e03253bac5db42f3f06778281cdad59b
```bash
git clone https://github.com/northcoders/be-nc-news.git
cd be-nc-news
```

### 2. Install dependencies
<<<<<<< HEAD

=======
>>>>>>> 61a13119e03253bac5db42f3f06778281cdad59b
```bash
npm install
```

### 3. Set up environment variables
<<<<<<< HEAD

You need to create two `.env` files to store your database connection details:

#### `.env.development`
=======
You need to create two `.env` files to store your database connection details:
>>>>>>> 61a13119e03253bac5db42f3f06778281cdad59b

#### `.env.development`
```
PGDATABASE=nc_news
```

#### `.env.test`
<<<<<<< HEAD

=======
>>>>>>> 61a13119e03253bac5db42f3f06778281cdad59b
```
PGDATABASE=nc_news_test
```

**Note**: Ensure the database names match those in your `setup.sql` file.
<<<<<<< HEAD

### 4. Set up the database

Run the following commands to create and seed your databases:

```bash
npm run setup-dbs
npm run seed
```

### 5. Run tests

Run the test suite to ensure everything is working:

```bash
npm test
```

---

## Scripts

- `npm run setup-dbs`: Creates the development and test databases using the `setup.sql` file.
- `npm run seed`: Seeds the development database with test data.
- `npm test`: Runs the Jest test suite.
- `npm start`: Starts the server in production mode.
- `npm run seed-prod`: Seeds the production database.

=======

### 4. Set up the database
Run the following commands to create and seed your databases:
```bash
npm run setup-dbs
npm run seed
```

### 5. Run tests
Run the test suite to ensure everything is working:
```bash
npm test
```

---

## Scripts

- `npm run setup-dbs`: Creates the development and test databases using the `setup.sql` file.
- `npm run seed`: Seeds the development database with test data.
- `npm test`: Runs the Jest test suite.
- `npm start`: Starts the server in production mode.
- `npm run seed-prod`: Seeds the production database.

>>>>>>> 61a13119e03253bac5db42f3f06778281cdad59b
---

## API Endpoints

### Base URL
<<<<<<< HEAD

All endpoints are relative to the base URL: `/api`.

### Example Endpoints

=======
All endpoints are relative to the base URL: `/api`.

### Example Endpoints
>>>>>>> 61a13119e03253bac5db42f3f06778281cdad59b
- **GET /api/articles**: Retrieve all articles with optional queries for sorting and pagination.
- **GET /api/topics**: Retrieve all topics.
- **POST /api/articles/:article_id/comments**: Post a comment to a specific article.
- **DELETE /api/comments/:comment_id**: Delete a comment by its ID.

For full documentation, visit the hosted `/api` endpoint.

---

## Troubleshooting

- Ensure PostgreSQL is running locally and the databases are correctly set up.
- If tests fail, check the `.env.test` file and database connection.
- Use `console.log` or debugging tools for troubleshooting issues.

---

## Contributing
<<<<<<< HEAD

If you'd like to contribute:

1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Submit a pull request with a clear description of changes.

---

## License

This project is licensed under the ISC License. See the `LICENSE` file for details.
=======
If you'd like to contribute:
1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Submit a pull request with a clear description of changes.

>>>>>>> 61a13119e03253bac5db42f3f06778281cdad59b
