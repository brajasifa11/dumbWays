const express = require('express');
const db = require('./connection');
const app = express();

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('login')
})

app.get('/login', (req, res) => {
  res.render('login', {alert: req.query})
})

app.get('/register', (req, res) => {
  res.render('register', {alert: req.query})
})

app.get('/add', (req, res) => {
  res.render('add')
})

app.get('/school', (req, res) => {
  let sql = 'SELECT * FROM school_tb'
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      // console.log(result)
      res.render('school', {schools: result})
    }
  })
})

app.get('/logout', (req, res) => {
  let sql = "SELECT * FROM user WHERE islogin = 'true'"
  db.query(sql, (err, result) => {
    if (err) {
      throw err
    } else {
      let sql = `UPDATE user SET islogin = 'false' WHERE id = '${result[0].id}}'`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/')
      })
    }
  })
})

app.get('/edit/:id', (req, res) => {
  let sql = "SELECT * FROM user WHERE islogin = 'true'"
  let userId;
  db.query(sql, (err, result) => {
    if (err) {
      throw err
    } else {
      userId = result[0].id;
      let sql = `SELECT * FROM school_tb WHERE id = '${req.params.id}'`;
      db.query(sql, (err, result) => {
        if (err) {
          throw err
        } else {
          if (result[0].user_id === userId) {
            res.render('edit', {school: result[0]})
          } else {
            console.log('User tidak memiliki akses')
          }
        }
      })
    }
  })
})

app.post('/edit/:id', (req, res) => {
  let sql = "SELECT * FROM user WHERE islogin = 'true'"
  let userId;
  db.query(sql, (err, result) => {
    if (err) {
      throw err
    } else {
      userId = result[0].id
      let sql = `SELECT * FROM school_tb WHERE id = '${req.params.id}'`
      db.query(sql, (err, result) => {
        if (err) throw err;
        if (result[0].user_id === userId) {
          const { npsn, name, address, level, status } = req.body;
          let sql = `UPDATE school_tb SET NPSN = '${npsn}', name_school = '${name}', address = '${address}', school_level = '${level}', status_school = '${status}' WHERE id = ${req.params.id}`;
          let query = db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.redirect('/school');
          });
        }
      })
    }
  })
})

app.get('/delete/:id', (req, res) => {
  let sql = "SELECT * FROM user WHERE islogin = 'true'"
  let userId;
  db.query(sql, (err, result) => {
    if (err) {
      throw err
    } else {
      userId = result[0].id
      let sql = `SELECT * FROM school_tb WHERE id = '${req.params.id}'`
      db.query(sql, (err, result) => {
        if (result[0].user_id === userId) {
          let sql = `DELETE FROM school_tb WHERE id = '${result[0].id}'`
          db.query(sql, (err, result) => {
            if (err) throw err;
            res.redirect('/school');
          })
        } else {
          console.log('user tidak memiliki akses')
          res.redirect('/school')
        }
      })
    }
  })
})

app.get('/home', (req, res) => {
  let sql = 'SELECT * FROM school_tb'
  db.query(sql, (err, result) => {
    if (err) throw err
    res.render('home', { school: result })
  })

})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  let sql = `SELECT * FROM user WHERE email = '${email}'`;
  let query = db.query(sql, (err, result) => {
    if(err) {
      console.log(err)
    } else {
      if (result.length > 0) {
        if (result[0].email === email && result[0].password === password) {
          let sql = `UPDATE user SET islogin = 'true' WHERE id = '${result[0].id}}'`;
          let query = db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.redirect('/home')
          });
        } else {
          console.log('Email atau password salah')
        }
      } else {
        console.log('Email tidak ada')
      }
    }
  });
})

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const user = {
    name,
    email,
    password
  }
  let sql = 'INSERT INTO user SET ?';
  let query = db.query(sql, user, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.redirect('/login');
  });
})

app.post('/add', (req, res) => {
  const { npsn, name, address, level, status, user_id } = req.body;
  
  let sql = "SELECT * FROM user WHERE islogin = 'true' "
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      const school = {
        NPSN: npsn,
        name_school: name,
        address: address,
        school_level: level,
        status_school: status,
        user_id: result[0].id
      }
      let sql = 'INSERT INTO school_tb SET ?';
      let query = db.query(sql, school, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.redirect('/school')
      });
    }
  })
})

app.get('/add', (req, res) => {
  let post = {name: 'dummyUser', email:'email@mail.com', password: '12345'};
  let sql = 'INSERT INTO user SET ?';
  let query = db.query(sql, post, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('user 1 added...');
  });
});

app.listen('3000', () => {
  console.log('Server started on port 3000');
});

