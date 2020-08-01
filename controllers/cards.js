const Card = require('../models/card');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка в обработке GET-запроса списка всех карточек' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id; // внимание, в данной итерации id пользовалея захаркоден в app.js

  Card.create({ name, link, owner: ownerId })
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: `Card with id ${req.params.cardId} was not found, so could not delete it` });
      }
      return res.send({ message: 'Эта карточка успешно удалена:', data: card });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
