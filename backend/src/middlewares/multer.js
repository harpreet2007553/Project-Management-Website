import multer from "multer";
import cuid from "cuid";

const id = cuid();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}_${id}`);
  },
});

export const upload = multer({ storage: storage });
