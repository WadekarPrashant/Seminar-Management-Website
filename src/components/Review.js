import React, { useState,useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Model from './Model';
import Review1 from './Review1';
import { Link } from "react-router-dom";
import Review1_results from './Review1_results';
import Review2 from './Review2';
import Review2_results from './Review2_results';
import Review3_results from './Review3_results';
import Review3 from './Review3';
import Navbar from './Navbar';
import { useSelector, useDispatch } from 'react-redux';



function Review() {
  const [review1, setReview1] = useState(false);
  const [review2, setReview2] = useState(false);
  const [review3, setReview3] = useState(false);
  const [review1_results, setReview1_results] = useState(false);
  const [review2_results, setReview2_results] = useState(false);
  const [review3_results, setReview3_results] = useState(false);
  const navigate = useNavigate();

  //  
  const [pairs, setPairs] = useState([]);
  // const [guideEmail, setGuideEmail] = useState(null);
  // const [studentEmail, setStudentEmail] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/get-pair')
      .then(response => response.json())
      .then(data => setPairs(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const guideEmails = pairs.map(pair => pair.guide_email);
    // const [guideEmail] = guideEmails;
    // setGuideEmail(guideEmail);

    // const studentEmails = pairs.map(pair => pair.student_email);
    // const [studentEmail] = studentEmails;
    // setStudentEmail(studentEmail);
  }, [pairs]);


   const studentEmail = localStorage.getItem('userEmail')
  
  const signUp = () => {
    navigate('/prelogin');
  };

  //review1
  const openReview1 = () => {
    setReview1(true);
  };

  const closeReview1 = () => {
    setReview1(false);
  };
//result 1
  const openReview1_results = () => {
    setReview1_results(true);
  };

  const closeReview1_results = () => {
    setReview1_results(false);
  };


  // review2
  const openReview2 = () => {
    setReview2(true);
  };

  const closeReview2 = () => {
    setReview2(false);
  };
  //result 2
  const openReview2_results = () => {
    setReview2_results(true);
  };

  const closeReview2_results = () => {
    setReview2_results(false);
  };


   // review3
   const openReview3 = () => {
    setReview3(true);
  };

  const closeReview3 = () => {
    setReview3(false);
  };
  //result 3
  const openReview3_results = () => {
    setReview3_results(true);
  };

  const closeReview3_results = () => {
    setReview3_results(false);
  };
  
  const [guideEmail, setGuideEmail] = useState('');
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5000/get_pair', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ studentEmail:studentEmail}),
        });
        const data = await response.json();
        setGuideEmail(data[0].guide_email);
        console.log(data[0].guide_email)
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
  console.log(guideEmail)

  return (
    <>
   <Navbar _email={studentEmail}/>
  
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
          >     <h1>MIT-WPU</h1>
          <hr />
             <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              Guide Email
            </div>
            <div className="card-body">
              {guideEmail ? (
                <p className="lead">Your guide email is <strong>{guideEmail}</strong>.</p>
              ) : (
                <p className="lead">You have not been assigned a guide yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
            <hr />
            <Row className="justify-content-center mt-5">
              <Col md={4}>
                <Card className="login-card">
                  <Card.Body>
                    <Card.Title onClick={openReview1}>Review 1</Card.Title>
                  <Link onClick={openReview1_results} >see results</Link>  
                    {review1 ? (
                      <Model onClose={closeReview1}>
                        <Review1 />
                      </Model>
                    ) : null}
                    {review1_results ? (
                      <Model onClose={closeReview1_results}>
                        <Review1_results />
                      </Model>
                    ) : null}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="login-card">
                  <Card.Body>
                    <Card.Title onClick={openReview2}>Review 2</Card.Title>
                    <Link onClick={openReview2_results} >see results</Link> 
                    {review2 ? (
                      <Model onClose={closeReview2}>
                        <Review2 />
                      </Model>
                    ) : null}
                     {review2_results ? (
                      <Model onClose={closeReview2_results}>
                        <Review2_results />
                      </Model>
                    ) : null}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="login-card">
                  <Card.Body>
                    <Card.Title onClick={openReview3}>Review 3</Card.Title>
                    <Link onClick={openReview3_results} >see results</Link>
                    {review3 ? (
                      <Model onClose={closeReview3}>
                        <Review3 />
                      </Model>
                    ) : null}
                     {review3_results ? (
                      <Model onClose={closeReview3_results}>
                        <Review3_results />
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

export default Review;