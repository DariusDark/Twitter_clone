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
      const result = await table.select(['id', 'content', 'likes', 'created', 'creatorId'])
        .where('removed != true')
        .execute();

      return mapRows(result);
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.put('/api/updateContent', async (req, res) => {
  try {
    const { body } = req;
    const [post] = await execute(client, async session => {
      const table = await session.getDefaultSchema().getTable('posts');
      await table.update().set('content', body.content).where('id = :id AND removed != true').bind('id', body.id).execute();

      const result = await table.select(['id', 'content', 'likes', 'created', 'creatorId'])
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

app.post('/api/posts', async (req, res) => {
  try {
    const { body } = req;
    const [post] = await execute(client, async session => {
      const table = await session.getDefaultSchema().getTable('posts');
      const insert = await table.insert('content', 'creatorId').values(body.content, body.userId).execute();
      const id = insert.getAutoIncrementValue();

      const result = await table.select(['id', 'content', 'likes', 'created', 'creatorId'])
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
    const [post] = await execute(client, async session => {
      const table = await session.getDefaultSchema().getTable('posts');
      await table.update().set('likes', body.likes).where('id = :id AND removed != true').bind('id', body.id).execute();

      const result = await table.select(['id', 'content', 'likes', 'created', 'creatorId'])
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

app.delete('/api/postRemove', async (req, res) => {
  try {
    const { body } = req;
    const [post] = await execute(client, async session => {
      const table = await session.getDefaultSchema().getTable('posts');
      await table.update().set('removed', true).where('id = :id AND removed != true').bind('id', body.id).execute();

      const result = await table.select(['id', 'content', 'likes', 'created', 'creatorId'])
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

app.get('/api/allUsers', async (req, res) => {
  try {
    const users = await execute(client, async session => {
      const table = await session.getDefaultSchema().getTable('users');
      const result = await table.select(['id', 'userName', 'userPassword'])
        .execute();
        return mapRows(result);
      });
    res.json(users);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const { name } = req.query;
    const { password } = req.query;
    if (name === '') {
      res.sendStatus(400);
      return;
    }

    const [users] = await execute(client, async session => {
      const table = await session.getDefaultSchema().getTable('users');
      const result = await table.select(['id', 'userName', 'userPassword'])
        .where(`userName = '${name}' AND userPassword = '${password}'`)
        .execute();
        let check = mapRows(result);
      if (!check.length) {
        return [{
          userName: false
        }]
      }
      return check;
    });

    if (users === undefined) {
      res.sendStatus(404);
      return;
    }

    res.json(users);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post('/api/users/add', async (req, res) => {
  try {
    const { body } = req;
    const [user] = await execute(client, async session => {
      const table = await session.getDefaultSchema().getTable('users');
      let check = await table.select(['userName']).where('userName = :name').bind('name', body.name).execute();
      check = mapRows(check);
      if (check[0]?.userName) {
        return [{
          userName: true
        }]
      }
      const insert = await table.insert('userName', 'userPassword').values(body.name, body.password).execute();
      const id = insert.getAutoIncrementValue();

      const result = await table.select(['id', 'userName', 'userPassword'])
        .where('id = :id')
        .bind('id', id)
        .execute();

      return mapRows(result);
    });

    if (user === undefined) {
      res.sendStatus(404);
      return;
    }

    res.json(user);

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log('server working on port:', port);
});
