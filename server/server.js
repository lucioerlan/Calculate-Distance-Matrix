
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const ip = require('ip');
const helmet = require('helmet');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const {
  responseMiddleware,
  unauthorizedMiddleware,
} = require('./src/middlewares');
require('dotenv').config();
require('colors');
const PORT = process.env.PORT || 5020;

const DistanceRoutes = require('./src/routes/distance-routes');

app.use(cors());
app.use(helmet());
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(responseMiddleware);
app.use(unauthorizedMiddleware);

app.use('/files',express.static(path.resolve(`${process.env.FOLDER_PATH}`)));
app.use('/api', DistanceRoutes);

app.use((req, res) =>res.parseReturn({status: 404, errors:
   [{ message: `Invalid Route, Access http://${ip.address()}:${PORT}/api` }],
  }));

app.use((err, req, res) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;
  return res.status(status).json(error);
});

server.listen(PORT, () => {
  console.log(
    `Server is running at port ${PORT}, see more about the application on: http://${ip.address()}:${PORT}/api`
      .bgBlue
  );
});
