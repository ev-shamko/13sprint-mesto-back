const User = require('../models/user'); // модель пишем с заглавной буквы

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(400).send({ message: err.message }));
  // на будущее: надо думать лучше про то, какой статус ошибки нужно выставлять
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: `Пользователя с id${req.params.userId} нет в базе данных`,
        });
      }
      return res.send(user); // если всё нормально нашлось, возвращаем юзердату
    })
    .catch((err) => res.status(400).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: err.message }));
};
