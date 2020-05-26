const fs = require('fs');
const path = require('path');
const rootDir = require('../helpers/path');
const p = path.join(rootDir, 'data', 'questions.txt');

module.exports = class Question {
  constructor(id, d, c) {
    this.id = id;
    this.dosha = d;
    this.content = c;
  }

  // lee el txt y devuelve un array con objetitos Question
  static fetchAll(cb) {
    fs.readFile(p, 'utf8', (err, fileContent) => {
      if (err) { console.log(err) }
      
      cb(fileContent
        .split('\n')
        .map(e => { 
          if (e[1] == ',') { return new Question(e[0], e[2], e.slice(4)) }
          else { return new Question(e[0]+e[1], e[3], e.slice(5)) }
        })
      );
    });
  }

}