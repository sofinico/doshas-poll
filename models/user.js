const fs = require('fs');
const path = require('path');
const rootDir = require('../helpers/path');
const p = path.join(rootDir, 'data', 'users.json');
const Question = require('../models/question');

const getUsersFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
}

module.exports = class User {
  constructor(b) {
    this.name = b.name,
    this.surname = b.surname,
    this.apodo = b.apodo,
    this.borndate = b.borndate
  }

  // metodo para guardar el usuario que llenó el start-form en el users.json file
  save() {
    getUsersFromFile(users => {
      users.push(this);
      fs.writeFile(p, JSON.stringify(users), err => {
        if (err) { 
          console.log(err); 
        } else {
          console.log('nuevo usuario en user.json');
        }
      });
    });
  }

  static savePollResults(body, parsed=false) {
    getUsersFromFile(users => {
      if (!parsed) { 
        users[users.length - 1].pollResults = body;
      } else {
        users[users.length - 1].parsedResults = body;
      }
      fs.writeFile(p, JSON.stringify(users), err => {
        if (err) { 
          console.log(err); 
        } else {
          console.log('resultados del poll en users.json');
        }
      });
    });
  }

  parseResults(cb) {
    Question.fetchAll(questions => {
      let v = 0; let p = 0; let k = 0;
      for (const [id, value] of Object.entries(this.pollResults)) {
        questions.forEach(q => {
          if (q.id === id) {
            if (q.dosha === 'v') {
              v += parseInt(value);
            } else if (q.dosha === 'p'){
              p += parseInt(value);
            } else {
              k += parseInt(value);
            }
          }
        });
      }
      //console.log('printeo adentro de la call-back:', {'v': v, 'k': k, 'p': p});
      cb({'v': v, 'k': k, 'p': p});
    });
  }
  
  static getUsers(cb) {
    getUsersFromFile(cb);
  }

}
