const mongoose = require('mongoose');
const Gridfs = require('mongoose-gridfs');
const fs = require('fs');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/mongoose-gridfs-issues-13', { useMongoClient: true});

const gridfs = Gridfs({
  collection: 'files',
  model: 'File',
  mongooseConnection: mongoose.connection,
});

const File = gridfs.model;

const fileLocalPath = path.join(__dirname, 'myfile.pdf');

File.write({
    filename: 'myfile.pdf',
    contentType: 'application/pdf',
  },
  fs.createReadStream(fileLocalPath),
  function(err, file) {
    if (err) {
      verbose(err.message);
      verbose(err.stack);
    }
});
