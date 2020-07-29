const User = require('../models/user'); // модель пишем с заглавной буквы

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка в обработке GET-запроса списка всех пользователей' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: `Пользователя с id${req.params.id} нет в базе данных`,
        });
      }
      return res.send(user); // если всё нормально нашлось, возвращаем юзердату
    })
    .catch((err) => res.status(500).send(err.message));
};

module.exports.createUser = (req, res) => {
  console.log(req.body);
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ error: err.message }));
};
