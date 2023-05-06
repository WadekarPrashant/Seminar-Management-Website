import React, { useState,useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Model from './Model';

import Guide_review2 from './Guide_review2';
import Guide_review3 from './Guide_review3';
import Navbar from './Navbar';
import { useSelector, useDispatch } from 'react-redux';


function Guide_review() {
 
  const [review2, setReview2] = useState(false);
  const [review3, setReview3] = useState(false);
  const navigate = useNavigate();


  //

  const signUp = () => {
    navigate('/prelogin');
  };

  //open 2
  const openReview2 = () => {
    setReview2(true);
  };

  const closeReview2 = () => {
    setReview2(false);
  };

   //open 3
   const openReview3 = () => {
    setReview3(true);
  };

  const closeReview3 = () => {
    setReview3(false);
  };

  //
  const [pairs, setPairs] = useState([]);
  // const [guideEmail, setGuideEmail] = useState(null);


  useEffect(() => {
    fetch('http://localhost:5000/get-pair')
      .then(response => response.json())
      .then(data => setPairs(data))
  }, []);

  useEffect(() => {
    const guideEmails = pairs.map(pair => pair.guide_email);
    // const [guideEmail] = guideEmails;
    // setGuideEmail(guideEmail);

    const studentEmails = pairs.map(pair => pair.student_email);
    // const [studentEmail] = studentEmails;
    // setStudentEmail(studentEmail);
  }, [pairs]);


  const guideEmail = localStorage.getItem('guideEmail')


  //
  const [studentEmail, setStudentEmail] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
     
        const response = await fetch('http://localhost:5000/getpair', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ guideEmail:guideEmail}),
        });
        const data = await response.json();
        setStudentEmail(data[0].student_email);
        // console.log(data[0].student_email)
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
  console.log(studentEmail)
  
  return (
    <>
   <Navbar _email={guideEmail}/>

      <Container fluid>
        <div
          className="container-fluid"
          style={{
            backgroundImage: 'url(bg-mit.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '100vh',
            width: '100vw',
            position: 'relative',
            marginTop: '0px',
          }}
        >
          <div
            className="btn bg-white text-success mx-1 mr-0 p"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <h3>MIT-WPU (Guide)</h3>
           
            <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              Student Email
            </div>
            <div className="card-body">
              {studentEmail ? (
                <p className="lead">Your student email is <strong>{studentEmail}</strong>.</p>
              ) : (
                <p className="lead">You have not been assigned a student yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
            <hr />
            <p>The coordinator will conduct the ( Review 1)</p>
           <hr />
            <Row className="justify-content-center mt-5">
              <Col md={4}>
                <Card className="login-card "style={{ backgroundColor: '#194d33', color: 'white' }} >
                  <Card.Body>
                    <Card.Title  onClick={openReview2} style={{ fontSize: '1rem', marginBottom: '1rem', cursor: 'pointer' }}>See Review 2</Card.Title>
                    {review2 ? (
                      <Model onClose={closeReview2}>
                        <Guide_review2 />
                      </Model>
                    ) : null}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="login-card"style={{ backgroundColor: '#194d33', color: 'white' }}>
                  <Card.Body>
                    <Card.Title onClick={openReview3} style={{ fontSize: '1rem', marginBottom: '1rem', cursor: 'pointer' }}>See Review 3</Card.Title>
                    {review3 ? (
                      <Model onClose={closeReview3}>
                        <Guide_review3 />
                      </Model>
                    ) : null}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <hr />
            <button
              onClick={signUp}
              type="submit"
              className="btn btn-warning"
            >
              Login
            </button>
          </div>
        </div>
        <style jsx>{`
          .card {
            background-color: #fff;
            border: 1px solid #eee;
            border-radius: 10px;
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          }

          .card:hover {
            transform: scale(1.02);
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          }

          .card-body {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background-color: #194d33;
            color: white;
            
          }

          .card-title {
            font-size: 20px;
          margin-bottom: 10px;
        }
        
        .removeitbtn {
          display: flex;
          justify-content: flex-end;
        }
        
        button {
          background-color: #5cb85c;
          border: none;
          color: white;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease-in-out;
        }
        
        button:hover {
          background-color: #4cae4c;
        }
      `}</style>
        </Container>
        </>
  )}

export default Guide_review;