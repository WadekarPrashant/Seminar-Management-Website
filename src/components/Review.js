import React, { useState } from 'react';
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

function Review() {
  const [review1, setReview1] = useState(false);
  const [review2, setReview2] = useState(false);
  const [review3, setReview3] = useState(false);
  const [review1_results, setReview1_results] = useState(false);
  const [review2_results, setReview2_results] = useState(false);
  const [review3_results, setReview3_results] = useState(false);
  const navigate = useNavigate();

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
  return (
    <>
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
            <h1>MIT-WPU</h1>
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