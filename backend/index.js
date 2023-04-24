
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const JWT_SECRET = "Parasisgoodb$oi"
const {students, guides, coordinators,Ppt3} = require('./models/User');
// const Sequelize = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');

const { body, validationResult } = require('express-validator');
//const mysql = require('mysql');

const cors = require('cors');

  const app = express();
  app.use(bodyParser.json());
  app.use(cors());
  const bcrypt = require('bcryptjs');

// signup actaul student
app.post('/studentpost', [
  // Validate the name field
  body('name').notEmpty().isLength({ max: 255 }),

  // Validate the email field
  body('email').notEmpty().isEmail(),

  // Validate the password field
  body('cpassword').notEmpty().isLength({ min: 6 }),

  // Validate the confirm password field
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.cpassword) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
], async  (req, res) => {
  var success=false;
  // Check if there are any validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }

 // Hash the password
 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(req.body.cpassword, salt);


  // Insert the user data into the MySQL database
  const { name, email, cpassword  ,confirmPassword } = req.body;
 
  students.create({ name, email, cpassword : hashedPassword ,confirmPassword })
  .then((students) => {
    const token = jwt.sign(students.id, JWT_SECRET);
    console.log(token);
    success=true;
            res.status(201).json({success,students,token});
          })
          .catch((error) => {
           console.log("Error :",error);
              });
 
});

// signup actaul guide
app.post('/guidepost', [
    // Validate the name field
    body('name').notEmpty().isLength({ max: 255 }),
  
    // Validate the email field
    body('email').notEmpty().isEmail(),
  
    // Validate the password field
    body('cpassword').notEmpty().isLength({ min: 6 }),
  
    // Validate the confirm password field
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.cpassword) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  ], async  (req, res) => {
    var success=false;
    // Check if there are any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
  
   // Hash the password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.cpassword, salt);
  
  
    // Insert the user data into the MySQL database
    const { name, email, cpassword  ,confirmPassword } = req.body;
   
    guides.create({ name, email, cpassword : hashedPassword ,confirmPassword })
    .then((guides) => {
      const token = jwt.sign(guides.id, JWT_SECRET);
      console.log(token);
      success=true;
              res.status(201).json({success,guides,token});
            })
            .catch((error) => {
             console.log("Error :",error);
                });
   
  });

  // signup actaul coordinator
app.post('/coordinatorpost', [
    // Validate the name field
    body('name').notEmpty().isLength({ max: 255 }),
  
    // Validate the email field
    body('email').notEmpty().isEmail(),
  
    // Validate the password field
    body('cpassword').notEmpty().isLength({ min: 6 }),
  
    // Validate the confirm password field
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.cpassword) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  ], async  (req, res) => {
    var success=false;
    // Check if there are any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
  
   // Hash the password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.cpassword, salt);
  
  
    // Insert the user data into the MySQL database
    const { name, email, cpassword  ,confirmPassword } = req.body;
   
    coordinators.create({ name, email, cpassword : hashedPassword ,confirmPassword })
    .then((coordinators) => {
      const token = jwt.sign(coordinators.id, JWT_SECRET);
      console.log(token);
      success=true;
              res.status(201).json({success,coordinators,token});
            })
            .catch((error) => {
             console.log("Error :",error);
                });
   
  });









// login actaul // student
app.post('/login', async (req, res) => {
  var success = false ;
  const { email, cpassword } = req.body;

  // Find the user in the MySQL database
  const user = await students.findOne({ where: { email: email } });
  if (!user) {
    return res.status(400).json({success, message: 'Invalid credentials' });
  }

  // Compare the password with the hashed password in the database
  const isValidPassword = await bcrypt.compare(cpassword, user.cpassword);
  if (!isValidPassword) {
    return res.status(400).json({success, message: 'Invalid credentials' });
  }

  // Create and send a JWT token as a response
  success=true;
  const token = jwt.sign({ id: user.id }, JWT_SECRET);
  res.json({success, token });
});

// login actaul guide
app.post('/guidelogin', async (req, res) => {
    var success = false ;
    const { email, cpassword } = req.body;
  
    // Find the user in the MySQL database
    const user = await guides.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).json({success, message: 'Invalid credentials' });
    }
  
    // Compare the password with the hashed password in the database
    const isValidPassword = await bcrypt.compare(cpassword, user.cpassword);
    if (!isValidPassword) {
      return res.status(400).json({success, message: 'Invalid credentials' });
    }
  
    // Create and send a JWT token as a response
    success=true;
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.json({success, token });
  });


  // login actaul // co
app.post('/cologin', async (req, res) => {
    var success = false ;
    const { email, cpassword } = req.body;
  
    // Find the user in the MySQL database
    const user = await coordinators.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).json({success, message: 'Invalid credentials' });
    }
  
    // Compare the password with the hashed password in the database
    const isValidPassword = await bcrypt.compare(cpassword, user.cpassword);
    if (!isValidPassword) {
      return res.status(400).json({success, message: 'Invalid credentials' });
    }
  
    // Create and send a JWT token as a response
    success=true;
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.json({success, token });
  });




  // ***************************** Review ***********************

  const {review1,review1_results,Ppt,review2_results,review3_results} = require('./models/User');

  // post topics
app.post('/topicpost', async  (req, res) => {
  var success=false;

  // Insert the user data into the MySQL database
  const { email , topic1 , topic2 , topic3 } = req.body;
 
  review1.create({ email, topic1 , topic2 , topic3})
  .then((review1) => {
    success=true;
            res.status(201).json({success,review1});
          })
          .catch((error) => {
            success = false;
           console.log("Error hai :",error.fields);
           res.status(201).json(error.fields);
              });
 
});



//chatgpt
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'seminar',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get('/gettopics', async (req, res) => {
  try {
    const [rows, fields] = await pool.execute('SELECT * FROM review1s');
    const result = JSON.parse(JSON.stringify(rows));
  
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving data from database');
  }
});

  // post result 1
  app.post('/result_1', async  (req, res) => {
    var success=false;
  
    // Insert the user data into the MySQL database
    const { email , topic ,marks } = req.body;
   
    review1_results.create({ email, topic ,marks})
    .then((result_1) => {
      success=true;
              res.status(201).json({success,result_1});
            })
            .catch((error) => {
             console.log("error hai : ",error)
                });
   
  });

  // get result 1
  app.post('/getresult1', async (req, res) => {
    try {
      const email = req.body.email;
      const [rows, fields] = await pool.execute(`SELECT * FROM review1_results WHERE email='${email}'`);
      const result = JSON.parse(JSON.stringify(rows));
      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error retrieving data from database');
    }
  });

  //sendppt review 2
// configure multerconst storage = multer.diskStorage({
  const multer = require('multer');
const fs = require('fs');
const path = require('path');
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'C:\\Users\\Dell\\OneDrive\\Desktop\\seminar\\backend\\uploads');
    },
    filename: (req, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    }
  });

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'application/vnd.ms-powerpoint' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only ppt and pptx files are allowed.'));
    }
  }
}).single('ppt');

// review 2
app.post('/sendppt', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err.message);
      return res.status(400).send(err.message);
    }

    // File is uploaded successfully
    const ppt = req.file;
    const email = req.body.email;
    const filename = req.body.filename

    // Store the file in the database
    const pptData = fs.readFileSync(path.join(__dirname, `uploads/${ppt.filename}`));
    // Your database code here...
    Ppt.create({ email,filename, pptData })
    .then((result) => {
      success=true;
              res.status(201).json({success,result});
            })
            .catch((error) => {
             console.log("error hai : ",error)
                });
  });
});

//chatgpt get ppt

// app.post('/getppt', async (req, res) => {
//   const email = req.body.email;
//   const filename = req.body.filename;

//   // Validate the email and filename here...

//   try {
//     const [result] = await pool.execute(`SELECT * FROM ppts WHERE email=? AND filename=?`, [email, filename]);
//     if (result && result.length > 0) {
//       const pptData = result[0].pptData;
//       const pptBuffer = Buffer.from(pptData, 'binary');

//       const responseData = {
//         email: email,
//         filename: filename,
//         pptBuffer: pptBuffer
//       };

//       res.status(200).json(responseData);
//       console.log(`File ${filename} sent successfully`);
//     } else {
//       res.status(404).json({ message: 'File not found' });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
app.post('/getppt', async (req, res) => {
  try {
    const email = req.body.email;
    const [rows, fields] = await pool.execute(`SELECT * FROM ppts `);
    const result = JSON.parse(JSON.stringify(rows));
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving data from database');
  }
});

//send ppt reviwe3 
app.post('/sendppt3', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err.message);
      return res.status(400).send(err.message);
    }

    // File is uploaded successfully
    const ppt = req.file;
    const email = req.body.email;
    const filename = req.body.filename

    // Store the file in the database
    const pptData = fs.readFileSync(path.join(__dirname, `uploads/${ppt.filename}`));
    // Your database code here...
    Ppt3.create({ email,filename, pptData })
    .then((result) => {
      success=true;
              res.status(201).json({success,result});
            })
            .catch((error) => {
             console.log("error hai : ",error)
                });
  });
});


app.post('/getppt3', async (req, res) => {
  try {
    const email = req.body.email;
    const [rows, fields] = await pool.execute(`SELECT * FROM ppt3s `);
    const result = JSON.parse(JSON.stringify(rows));
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving data from database');
  }
});
//post result 2
app.post('/entermarks', async  (req, res) => {
  var success=false;

  // Insert the user data into the MySQL database
  const { email ,marks } = req.body;
 
  review2_results.create({ email,marks})
  .then((result_2) => {
    success=true;
            res.status(201).json({success,result_2});
          })
          .catch((error) => {
           console.log("error hai : ",error)
              });
 
});

 // get result 2
 app.post('/getresult2', async (req, res) => {
  const email = req.body.email;
  try {
    const [result] = await pool.execute(`SELECT * FROM review2_results WHERE email='${email}'`);
    const t = JSON.parse(JSON.stringify(result)); // JSON must be capital
    res.send(t);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});


//post result 3
app.post('/entermarks3', async  (req, res) => {
  var success=false;

  // Insert the user data into the MySQL database
  const { email ,marks } = req.body;
 
  review3_results.create({ email,marks})
  .then((result_2) => {
    success=true;
            res.status(201).json({success,result_2});
          })
          .catch((error) => {
           console.log("error hai : ",error)
              });
 
});


 // get result 3
 app.post('/getresult3', async (req, res) => {
  const email = req.body.email;
  try {
    const [result] = await pool.execute(`SELECT * FROM review3_results WHERE email='${email}'`);
    const t = JSON.parse(JSON.stringify(result)); // JSON must be capital
    res.send(t);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// //
app.post('/store-selected-pair', async (req, res) => {
  const { studentId, student_name, guideId, guide_name } = req.body;

  try {
    const conn = await pool.getConnection();
    await conn.query('CREATE TABLE IF NOT EXISTS selected_pairs (student_id INT, student_name VARCHAR(30), guide_id INT, guide_name VARCHAR(30))');
    await conn.query('INSERT INTO selected_pairs (student_id,student_name, guide_id,guide_name) VALUES (?,?,?,?)', [studentId, student_name, guideId, guide_name]);
    conn.release();
    return res.status(200).json({ message: 'Selected pair stored successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/get-students', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.execute('SELECT * FROM students');
    connection.release();

    res.send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving students');
  }
});

// API endpoint to get the list of guides
app.get('/get-guides', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.execute('SELECT * FROM guides');
    connection.release();

    res.send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving guides');
  }
});


app.listen(5000, () => {
    console.log(`Server started on port 5000`);
  });