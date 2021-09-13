import mysqlx from '@mysql/xdevapi';
import express, { json } from 'express';
import cors from 'cors';

import { execute, mapRows } from './database.js';

const url = 'mysqlx://app:pass@localhost:33060/social';
const port = process.env.PORT ?? 9999;

const client = mysqlx.getClient(url);

const app = express();

app.use(cors());
app.use(json());

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await execute(client, async session => {
      const table = await session.getDefaultSchema().getTable('posts');
      const result = await table.select(['id', 'content', 'likes', 'created'])
        .where('removed != true')
        .orderBy('id DESC')
        .execute();

      return mapRows(result);
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id) || !Number.isFinite(id)) {
      res.sendStatus(400);
      return;
    }

    const [post] = await execute(client, async session => {
      const table = await session.getDefaultSchema().getTable('posts');
      const result = await table.select(['id', 'content', 'likes', 'created'])
        .where('id = :id AND removed != true')
        .bind('id', id)
        .execute();

      return mapRows(result);
    });

    if (post === undefined) {
      res.sendStatus(404);
      return;
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const { body } = req;
    const [post] = await execute(client, async session => {
      const table = await session.getDefaultSchema().getTable('posts');
      const insert = await table.insert('content').values(body.content).execute();
      const id = insert.getAutoIncrementValue();

      const result = await table.select(['id', 'content', 'likes', 'created'])
        .where('id = :id')
        .bind('id', id)
        .execute();

      return mapRows(result);
    });

    if (post === undefined) {
      res.sendStatus(404);
      return;
    }

    res.json(post);

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.put('/api/postLikes', async (req, res) => {
  try {
    const { body } = req;
    console.log(body)
    const [post] = await execute(client, async session => {
      const table = await session.getDefaultSchema().getTable('posts');
      await table.update().set('likes', body.likes).where('id = :id AND removed != true').bind('id', body.id).execute();

      const result = await table.select(['id', 'content', 'likes', 'created'])
        .where('id = :id')
        .bind('id', body.id)
        .execute();

      return mapRows(result);
    });

    if (post === undefined) {
      res.sendStatus(404);
      return;
    }

    res.json(post);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/postRemove', async (req, res) => {
  try {
    const { body } = req;
    console.log(body)
    const [post] = await execute(client, async session => {
      const table = await session.getDefaultSchema().getTable('posts');
      await table.update().set('removed', true).where('id = :id AND removed != true').bind('id', body.id).execute();

      const result = await table.select(['id', 'content', 'likes', 'created'])
        .where('id = :id')
        .bind('id', body.id)
        .execute();

      return mapRows(result);
    });

    if (post === undefined) {
      res.sendStatus(404);
      return;
    }

    res.json(post);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/postRestore', async (req, res) => {
  try {
    const { body } = req;
    console.log(body)
    const [post] = await execute(client, async session => {
      const table = await session.getDefaultSchema().getTable('posts');
      await table.update().set('removed', false).where('id = :id AND removed != false').bind('id', body.id).execute();

      const result = await table.select(['id', 'content', 'likes', 'created'])
        .where('id = :id')
        .bind('id', body.id)
        .execute();

      return mapRows(result);
    });

    if (post === undefined) {
      res.sendStatus(404);
      return;
    }

    res.json(post);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log('server working on port:', port);
});
