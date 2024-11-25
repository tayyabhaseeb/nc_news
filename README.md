<h1>How to Run This Project Locally</h1>

<h3>Clone the repository:</h3>

```
git clone <repository-url>
cd <repository-directory>
```

<h3>Install dependencies:</h3>

```
npm install
```

<h3>Set up the databases:</h3>

```
npm run setup-dbs
```

<h3>Seed the development database:</h3>

```
npm run seed
```

<h3>Check that the database is set up correctly:</h3>

<li>Write psql in your terminal
</li>

```
psql
```

<li>Connect to the database:</li>

```
\c <database_name>
```

<li>List the tables:</li>

```
\dt
```

<p>If you see the expected tables, you're ready to make queries.</p>
