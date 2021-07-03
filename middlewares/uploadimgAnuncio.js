const multer = require("multer");

module.exports = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/upload/anuncios");
    },
    filename: (req, file, cb) => {
      const now = new Date();
      cb(
        null,
        now.getDate() +
          "-" +
          (now.getMonth() + 1).toString().padStart(2, "0") +
          "-" +
          now.getFullYear() +
          "-" +
          now.getHours() +
          "h-" +
          now.getMinutes() +
          "_" +
          file.originalname
      );
    },
  }),
  fileFilter: (req, file, cb) => {
    const extensaoImg = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/gif",
    ].find((formatoAceito) => formatoAceito == file.mimetype);

    if (extensaoImg) {
      return cb(null, true);
    }
    return cb(null, false);
  },
});
