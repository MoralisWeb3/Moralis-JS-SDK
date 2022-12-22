import express from 'express';
import db from './db';

const app = express();

app.get('/backend/users', async (req, res) => {
  // const users = db.getUsers();
  res.json(null);
});

export default app;
