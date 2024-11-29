# BE NC News

This project is a **backend API** for a news website. It provides endpoints to interact with articles, comments, users, and topics. Users can fetch data, filter, sort, and paginate results, as well as perform CRUD operations on some entities.

The project was built using **Node.js**, **Express**, and **PostgreSQL**.

---

## Hosted Version

You can find the hosted version of the API at: [https://your-api-hosted-link.com](https://your-api-hosted-link.com)

---

## Features

- Retrieve articles, topics, comments, and users.
- Filter articles by topic.
- Sort and paginate articles.
- Post new comments and delete comments by ID.
- Full test suite using **Jest**.

---

## Requirements

- **Node.js**: `>=16.0.0`
- **PostgreSQL**: `>=12.0`

---

## Installation and Setup

Follow these steps to set up the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/northcoders/be-nc-news.git
cd be-nc-news
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

You need to create two `.env` files to store your database connection details:

#### `.env.development`

```
PGDATABASE=nc_news
```

#### `.env.test`

```
PGDATABASE=nc_news_test
```

**Note**: Ensure the database names match those in your `setup.sql` file.

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

---

## API Endpoints

### Base URL

All endpoints are relative to the base URL: `/api`.

### Example Endpoints

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

If you'd like to contribute:

1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Submit a pull request with a clear description of changes.

---

## License

This project is licensed under the ISC License. See the `LICENSE` file for details.
