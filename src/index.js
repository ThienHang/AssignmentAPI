import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import models, { connectDb } from './models';
import routes from './routes';

const app = express();

// Application-Level Middleware

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin('rwieruch'),
  };
  next();
});

// Routes

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/employees', routes.employees);

// Start

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.employees.deleteMany({}),
    ]);

    createUsersWithMessages();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

const createUsersWithMessages = async () => {
  const user1 = new models.User({
    username: 'Hoàng',
  });

  const user2 = new models.User({
    username: 'Tuấn',
  });

  const employees1 = new models.employees({
    text: 'ABC',
    user: user1.id,
  });

  const employees2 = new models.employees({
    text: 'XYZ',
    user: user2.id,
  });

  const employees3 = new models.employees({
    text: '....',
    user: user2.id,
  });

  await employees1.save();
  await employees2.save();
  await employees3.save();

  await user1.save();
  await user2.save();
};