//footer--pin
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';


function Footer() {
  const [showFooter, setShowFooter] = useState(false);

  return (
    <footer className={`footer--pin navbar navbar-expand-lg navbar-light bg-light${!showFooter ? ' fixed-bottom' : ''}`}>
      <Container>
        <Row>
          <Col lg={6} md={12} className="mb-4 mb-md-0">
            <h5 className="text-uppercase">MIT-WPU</h5>
            <p>
              Located In Pune , Kothrud
            </p>
          </Col>

          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Made With</h5>

            <ul className="list-unstyled">
              <li>
                <p className="text-dark">REACT.js</p>
              </li>
              <li>
                <p className="text-dark">JAVASCRIPT</p>
              </li>
              <li>
                <p className="text-dark">NODE.js</p>
              </li>
              <li>
                <p className="text-dark">HTML</p>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0">Links</h5>

            <ul className="list-unstyled">
              <li>
                <a href="#!" className="text-dark">Link 1</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Link 2</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Link 3</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Link 4</a>
              </li>
            </ul>
          </Col>
        </Row>
        <div className="text-center p-3 bg-dark text-white">
          &copy; {new Date().getFullYear()} MIT-WPU. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;