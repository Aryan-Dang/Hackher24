const express = require('express');
const multer = require('multer');
const {Storage} = require('@google-cloud/storage');
const cors = require('cors'); // Require CORS

const app = express();
app.use(cors()); // Use CORS
const upload = multer({dest: 'uploads/'});
//add .json file at same level
const storage = new Storage({keyFilename: "hackher24-firebase-adminsdk-7krsx-7bab5ba2fd.json"});

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    await storage.bucket('sample-bucket-bucket-1').upload(req.file.path, {
      destination: `pdfs/${req.file.originalname}`,
    });
    res.send('File uploaded to Google Cloud Storage.');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
