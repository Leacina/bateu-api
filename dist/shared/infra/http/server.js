"use strict";

require("reflect-metadata");

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = _interopRequireDefault(require("./routes"));

require("../typeorm");

require("../../container/providers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/no-unresolved
const app = (0, _express.default)();
app.use(_express.default.json());
app.use((0, _cors.default)());
app.use((req, res, next) => {
  const oldSend = res.send;

  res.send = data => {
    const {
      pagination
    } = req.query;
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
app.use(_routes.default);
app.use((err, request, response, _) => {
  if (err instanceof _AppError.default) {
    return response.status(err.statusCode).json({
      status: 'error',
      error: err.message
    });
  }

  console.log(`${err}`);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});
const http = app.listen(process.env.PORT || 3333, () => {
  console.log(`Rodando backend...${process.env.PORT}` || 3333);
}); // eslint-disable-next-line @typescript-eslint/no-var-requires

const io = require('socket.io')(http, {
  cors: {
    origin: '*'
  }
});

io.on('connection', socket => {
  socket.on('subscribe', room => {
    socket.join(room);
  });
  socket.on('send notify', data => {
    socket.broadcast.to(data.room).emit('observer notify', {
      data
    });
  });
});