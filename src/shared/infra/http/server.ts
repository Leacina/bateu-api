// eslint-disable-next-line import/no-unresolved
import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import AppError from '@shared/errors/AppError';
import cors from 'cors';
// import webpush from 'web-push';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container/providers/index';

const app = express();

app.use(express.json());
app.use(cors());

// const PUBLIC_VAPID =
//   'BI7Y-hWEdlwRD3fl6nnwQ3mqgT9T5DlL-ZYORK02sqb4F3Y56OrNA_DNqFoS4a79Fgkk0X2988fDmU8MVvT09Mc';
// const PRIVATE_VAPID = 'KD80Krf-VDw8DbX1iF7YixowDbNNSft6JCutcAs9tpk';

// webpush.setVapidDetails('mailto:val@.io', PUBLIC_VAPID, PRIVATE_VAPID);

// app.get('/subscribe', (req, res) => {
//   const subscription = req.body;
//   res.status(201).json({});
//   const payload = JSON.stringify({ title: 'test' });

//   console.log(subscription);

//   webpush.sendNotification(subscription, payload).catch(error => {
//     console.error(error.stack);
//   });
// });

app.use((req, res, next) => {
  const oldSend = res.send;

  res.send = data => {
    const { pagination } = req.query;

    res.send = oldSend; // set function back to avoid the 'double-send'

    if (!pagination && req.method === 'GET' && data) {
      const obj = JSON.parse(data);

      if (obj.items) {
        return res.send(obj.items);
      }

      return res.send(obj);
    }

    return res.send(data);
  };
  next();
});

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      error: err.message,
    });
  }
  console.log(`${err}`);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

const http = app.listen(process.env.PORT || 3333, () => {
  console.log(`Rodando backend...${process.env.PORT}` || 3333);
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
});

io.on('connection', socket => {
  socket.on('subscribe', room => {
    socket.join(room);
  });

  socket.on('send notify', data => {
    socket.broadcast.to(data.room).emit('observer notify', {
      data,
    });
  });
});
