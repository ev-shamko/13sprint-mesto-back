const mongoose = require('mongoose');

// регулярное выражение для валидации ссылки на аватар юзера.
// Начинается на http:// или https://  --- затем адрес --- заканчивается на что-то типа /ava123.jpg (обязательно слеш, затем буквы и/или цифры, точка, формат из 3+ букв)
// Подробнее рассмотреть регулярку можно на https://extendsclass.com/regex-tester.html
const regExpImgUrl = /^(http:\/\/|https:\/\/)(www\.)?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\w+\d*-*\w*\d*-*\w*\d*(\.\w+|:\d{2,5}))((\.\w+)*|(:\d{2,5})?)(\/\w*\W*)*(\/((\w|\d)(\w|\d)*)\.\w{3,})$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    // кастомная валидация ссылки на аватар
    validate: {
      validator: (url) => regExpImgUrl.test(url), // Пришедший url проверяется регуляркой
      message: (props) => `${props.value} - это некорректный url для аватара. Пример корректного url: https://my.site/ava123.jpg`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
