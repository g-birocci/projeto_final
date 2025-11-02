const multer = require('multer');
const storage = multer.memoryStorage(); // mantém arquivos na memória
const upload = multer({ storage });

module.exports = upload;
