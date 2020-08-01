const express = require('express');
const mongoose = require('mongoose'); // ODM пакет для взаимодействия с mongoDB
const bodyParser = require('body-parser'); // внимание! обязателен! И ниже его app.use -аем дважды

const { PORT = 3000 } = process.env;
const app = express();

// эти две строчки обязательные. Они собираюют из пакетов объект req.body
// без них req.body = undefined
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* **************** Соединение с локальной БД ********************** */

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true, // убираем бесячее сообщение в консоли
});

/* **************** Автозалогинивание ********************** */

// это временное решение: мы захардкодили идентификатор пользователя
// оно нужно затем, чтобы у карточек в Mesto был автор
// теперь в каждый request добавляется вот этот объект user:
app.use((req, res, next) => {
  req.user = {
    _id: '5f21d662ad61092b18ef029e', // это _id первого тестового пользователя из локальной бд
  };

  next();
});

/* **************** РОУТЫ ********************** */

// импорт роутов для карточек и базы юзеров
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

// задействуем роуты для юзеров и карточек
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// роут для плохого запроса в адресной строке
// в качестве аргумента передаём "/" - именно так обозначаем всё что не /users и не /cards
app.use('/', (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден. Возможно, вы обращаетесь к фронтенду, который в данной итерации отключён' });
});

/* ********************************************* */

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
