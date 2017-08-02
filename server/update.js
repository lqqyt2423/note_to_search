const fs = require('fs');
const Note = require('./models/Note');
const DIRNAME = '/Users/liqiang/Documents/programming_note/';
var timer;

const update = () => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    let files = fs.readdirSync(DIRNAME);
    files = files.filter(item => {
      if (item === 'README.md') return false;
      return /\.md$/.test(item);
    });
    const saveToDb = (file) => {
      let filepath = DIRNAME + file;
      let content = fs.readFileSync(filepath);
      let note = new Note({
        filename: file,
        content: content
      });
      return note.save();
    };
    Note.remove({})
    .then(() => {
      return Promise.all(files.map(file => saveToDb(file)));
    }).then(docs => {
      docs.forEach(doc => console.log(doc.filename));
    });
  }, 3000);
};

fs.watch(DIRNAME, update);
