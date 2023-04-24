const Sequelize = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');


const sequelize = new Sequelize('seminar', 'root', 'root123', {
  host:'localhost',
  dialect: 'mysql'
});
sequelize.authenticate()
  .then(() => {
    console.log('User Connected to MySQL server');
  })
  .catch((error) => {
    console.error('Unable to connect to MySQL server:', error);
  });

  const students = sequelize.define('students', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,

      allowNull: false,
      unique: true
    },
    cpassword: {
      type: Sequelize.STRING,
      allowNull: false
    },
    confirmPassword :{
      type: Sequelize.STRING,
      allowNull:false
    }
  });

  const coordinators = sequelize.define('coordinators', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,

      allowNull: false,
      unique: true
    },
    cpassword: {
      type: Sequelize.STRING,
      allowNull: false
    },
    confirmPassword :{
      type: Sequelize.STRING,
      allowNull:false
    }
  });

  const guides = sequelize.define('guides', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,

      allowNull: false,
      unique: true
    },
    cpassword: {
      type: Sequelize.STRING,
      allowNull: false
    },
    confirmPassword :{
      type: Sequelize.STRING,
      allowNull:false
    }
  });

  const review1 = sequelize.define('review1', {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    topic1: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
      
    },
    topic2: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    
    }, 
    topic3: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
     
    },
  });

  const  review1_results = sequelize.define('review1_results', {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    topic: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    marks: {
      type: Sequelize.STRING,
      allowNull: false,
    }
   
  });
  const  review2_results = sequelize.define('review2_results', {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    marks: {
      type: Sequelize.STRING,
      allowNull: false,
    }
   
  });
  const  review3_results = sequelize.define('review3_results', {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    marks: {
      type: Sequelize.STRING,
      allowNull: false,
    }
   
  });


  const Ppt = sequelize.define('Ppt', {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    filename: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pptData : {
      type: Sequelize.BLOB('long'),
      allowNull: false,
    },
  });
  const Ppt3 = sequelize.define('Ppt3', {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    filename: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pptData : {
      type: Sequelize.BLOB('long'),
      allowNull: false,
    },
  });

  sequelize.sync()
  .then(() => {
    console.log('Schema synchronized with database');
  })
  .catch((error) => {
    console.error('Unable to synchronize schema with database:',error);
  });
module.exports =  {students,coordinators,guides,review1,review1_results,Ppt,Ppt3,review2_results ,review3_results} 