const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const produtoRouter = require('./routers/produtoRouter');
const procedimentoRouter = require('./routers/procedimentoRouter');
const equipamentoRouter = require('./routers/equipamentoRouter');
const userRouter = require('./routers/userRouter');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());

app.use(morgan('dev'));

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

app.use('/api/v1/produtos', produtoRouter);
app.use('/api/v1/procedimentos', procedimentoRouter);
app.use('/api/v1/equipamentos', equipamentoRouter);
app.use('/api/v1/users', userRouter);

//Routing react-route-dom
app.all('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.all('/api/v1/*', (req, res, next) => {
  next(new AppError(`Could not find ${req.originalUrl} in this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
