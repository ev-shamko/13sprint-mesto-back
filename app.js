const express = require('express');
const path = require('path'); // динамически собирает путь до файлов
const mongoose = require('mongoose'); // ODM пакет для взаимодействия с mongoDB
const bodyParser = require('body-parser'); // внимание! обязателен! И ниже его app.use -аем

// импорт роутов для карточек и базы юзеров
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// делаем папку public публичной и корнем проекта,
// поэтому ссылки дальше пишем относительно папки public
app.use(express.static(path.join(__dirname, 'public')));

// задействуем роуты для юзеров и карточек
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// роут для плохого запроса в адресной строке
// в качестве аргумента передаём "/" - именно так обозначаем всё что не /user и не /сфквы
app.use('/', (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
