const Pirate = require("../models/pirate.model");

module.exports.findAllPirates = (req, res) => {
  Pirate.find()
    .then((allPirates) => {
      res.json({ pirate: allPirates });
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};

module.exports.getPirate = (request, response) => {
  Pirate.findOne({ _id: request.params.id })
    .then((pirate) => response.json(pirate))
    .catch((err) => response.json(err));
};

module.exports.createPirate = (request, response) => {
  const { firstName, position } = request.body;
  Pirate.exists({ firstName })
    .then((firstNameExists) => {
      if (firstNameExists) {
        return Promise.reject({
          errors: { firstName: { message: "This firstname is already taken" } },
        });
      } else {
        return Pirate.exists({ position: "Captain" });
      }
    })
    .then((captainExists) => {
      if (captainExists && position === "Captain") {
        return Promise.reject({
          errors: {
            position: {
              message: "A pirate with the role Captain already exists",
            },
          },
        });
      } else {
        return Pirate.create(request.body);
      }
    })
    .then((pirate) => response.json(pirate))
    .catch((err) => response.json(err));
};

module.exports.updatePirate = (request, response) => {
  const { id } = request.params;
  const {
    firstName,
    imgURL,
    phrase,
    position,
    treasures,
    pegleg,
    eyepatch,
    hookhand,
  } = request.body;

  Pirate.findById(id)
    .then((pirate) => {
      Pirate.exists({ firstName: firstName })
        .then((pirateExists) => {
          if (pirateExists && firstName !== pirate.firstName) {
            return Promise.reject({
              errors: {
                firstName: { message: "This firstname is already taken" },
              },
            });
          }
          return Pirate.exists({ position: "Captain", _id: { $ne: id } });
        })
        .then((captainExists) => {
          if (captainExists && position === "Captain") {
            return Promise.reject({
              errors: {
                position: {
                  message: "A pirate with the role Captain already exists",
                },
              },
            });
          } else {
            updatePirate(pirate);
          }
        })
        .catch((err) => response.status(500).json(err));
    })
    .catch((err) => response.status(500).json(err));

  function updatePirate(pirate) {
    pirate.firstName = firstName;
    pirate.imgURL = imgURL;
    pirate.phrase = phrase;
    pirate.position = position;
    pirate.treasures = treasures;
    pirate.pegleg = pegleg;
    pirate.eyepatch = eyepatch;
    pirate.hookhand = hookhand;

    pirate
      .save()
      .then((updatedPirate) => response.json(updatedPirate))
      .catch((err) => response.status(500).json(err));
  }
};

module.exports.deletePirate = (request, response) => {
  Pirate.deleteOne({ _id: request.params.id })
    .then((deleteConfirmation) => response.json(deleteConfirmation))
    .catch((err) => response.json(err));
};
