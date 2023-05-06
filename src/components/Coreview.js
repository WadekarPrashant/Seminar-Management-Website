import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Model from './Model';
import Guide_review1 from './Guide_review1';


import { useDispatch ,useSelector} from 'react-redux';
import { actionCreator } from '../state/index';
import { bindActionCreators } from "redux";

import '../App.css';
function App() {
  const [students, setStudents] = useState([]);
  const [guides, setGuides] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/get-pair')
      .then(response => response.json())
      .then(data => setPairs(data))
      .catch(error => console.error(error));
      
  }, []);
  

  // retrieve the list of students and guides from the server
  useEffect(() => {
    fetch('http://localhost:5000/get-students')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error(error));
    fetch('http://localhost:5000/get-guides')
      .then(response => response.json())
      .then(data => setGuides(data))
      .catch(error => console.error(error));
  }, []);

  console.log(students)

  // handle the form submission to store the selected pair
  const handleSubmit = (event) => {
    event.preventDefault();

    // check that both a student and guide have been selected
    if (!selectedStudent || !selectedGuide) {
      alert('Please select both a student and a guide');
      return;
    }


    // store the selected pair in the new table using the API endpoint
    fetch('http://localhost:5000/store-selected-pair', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ studentId: selectedStudent.id,student_name:selectedStudent.name,student_email:selectedStudent.email ,guideId: selectedGuide.id,guide_name:selectedGuide.name ,guide_email:selectedGuide.email,deadline:deadline})
    })
      .then(response => {
        if (response.ok) {
          alert('Selected pair stored successfully');
        } else {
          alert('Error storing selected pair');
        }
      })
      .catch(error => console.error(error));

      actions.addToCart({ userEmail:selectedStudent.email ,guideEmail: selectedGuide.email});
      console.log(`Added to cart: ${selectedStudent.email},  ${selectedGuide.email}`);
  };

  //
  const navigate = useNavigate();
  
  const coEmail = localStorage.getItem('coEmail')

  const [review1, setReview1] = useState(false);
  
  const openReview1 = () => {
    setReview1(true);
  };

  const closeReview1 = () => {
    setReview1(false);
  };

  //
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreator, dispatch);

  //
  const defaultPanels = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 3, name: 'C' },
    { id: 4, name: 'D' },
    { id: 5, name: 'E' },
    { id: 6, name: 'F' },
    { id: 7, name: 'G' },
    { id: 8, name: 'H' },
  ];
  const [selectedPanel, setSelectedPanel] = useState(null);
  const [panels, setPanels] = useState(defaultPanels);

  //
  const defaultDomains = [
    { id: 1, name: 'AI' },
    { id: 2, name: 'ML' },
    { id: 3, name: 'WEB DEVELOPMENT' },
    { id: 4, name: 'BLOCKCHAIN' },
    { id: 5, name: 'CYBER SECURITY' },
    { id: 6, name: 'IOT' }
  ];
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [domains, setDomains] = useState(defaultDomains);

  //
  const [deadline, setDeadline] = useState("");
  console.log(deadline)

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (e) => {
    setDeadline(e.target.value);
    setSelectedDate(e.target.value);
  };
  return (
    <>
   <Navbar _email={coEmail}/>
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
    <Container>
      <Row>
        <Col>
  <h3>Students</h3>
  <hr />
  <Form>
    <Form.Group controlId="panelSelect">
      <Form.Label>Select Panel</Form.Label>
      <Form.Control as="select" onChange={event => setSelectedPanel(event.target.value)}>
        <option value="">-- Select Panel --</option>
        {panels.map(panel => (
          <option key={panel.id} value={panel.name}>{panel.name}</option>
        ))}
      </Form.Control>
    </Form.Group>
  </Form>
  {selectedPanel && (
  <ListGroup style={{ backgroundColor: '#F0F0F0', padding: '10px' }}>

    {students.filter(student => !selectedPanel || student.PANEL === selectedPanel).map(student => (
      <ListGroup.Item
        key={student.email}
        active={selectedStudent && selectedStudent.email  === student.email}
        onClick={() => setSelectedStudent(student)}
        style={{ cursor: 'pointer' }}
      >
         
         <tbody style={{left:"0px"}}>
                  <tr>
                <td>Name : {student.name}</td>
                </tr>
                </tbody>
                <tbody style={{left:"0px"}}>
                <tr>
                  <td>PRN : {student.PRN}</td>
                  </tr>
                  </tbody>
                 
                 
                  <tbody style={{left:"0px"}}> 
                  <tr>
                  <td> Roll No. : {student.RollNo}</td>
                  </tr>
                   </tbody>
                  
      

      </ListGroup.Item>
     
    ))}
  </ListGroup>
  )}
</Col>
        <Col>
          <h3>Guides</h3>
          <hr />
          <Form>
    <Form.Group controlId="domainSelect">
      <Form.Label>Select Domain</Form.Label>
      <Form.Control as="select" onChange={event => setSelectedDomain(event.target.value)}>
        <option value="">-- Select Domain --</option>
        {domains.map(domains => (
          <option key={domains.id} value={domains.name}>{domains.name}</option>
        ))}
      </Form.Control>
    </Form.Group>
  </Form>
  {selectedDomain && (
          <ListGroup style={{ backgroundColor: '#F0F0F0', padding: '10px' }}>
             {guides.filter(guide => !selectedDomain || guide.DOMAIN === selectedDomain).map(guide => (
           
              <ListGroup.Item
                key={guide.email}
                active={selectedGuide && selectedGuide.email === guide.email}
                onClick={() => setSelectedGuide(guide)}
                style={{ cursor: 'pointer' }}
              >
                <tbody>
                <tr >
                <td>Name </td>
                
                  <td>Qualification </td>
                 
                  <td> Experience</td>
                    </tr>
                   </tbody>
                   <tbody>
                <tr >
                <td> {guide.name}</td>
               
                  <td>{guide.QUALIFICATION}</td>
                  
                  <td>{guide.EXPERICENCE} Yrs</td>
                    </tr>
                   </tbody>
              </ListGroup.Item>
           
            ))}
          </ListGroup>
          
            )}
        </Col>
      </Row>
      <hr />
      <div className="form-group">
      <label htmlFor="deadline">Deadline:</label>
      <input
        type="date"
        id="deadline"
        name="deadline"
        value={deadline}
        onChange={handleDateSelect}
        className="form-control"
      />
    </div>
      <Form onSubmit={handleSubmit}>
      {selectedDate ? (
        <Button type="submit"  style={{ marginTop: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>Submit</Button>
        ) : (
          <p>(Please assign a deadline to selected pair to continue)</p>
        )}
        </Form>
      {review1 ? (
                      <Model onClose={closeReview1}>
                        <Guide_review1 />
                      </Model>
                    ) : null}
                    <hr />
      <Button type="submit" onClick={openReview1} style={{ marginTop: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>Review 1</Button>
    </Container>
    
    </div>
    </div>
    <div className='container'>
    <h3>Previous Selected Pair</h3>
    <hr />
      <Row>
        <Col>
          <h3>Students</h3>
          <hr />
          <ListGroup style={{ backgroundColor: '#F0F0F0', padding: '10px' }}>
            {pairs.map(pair => (
              <ListGroup.Item
              key={pair.student_id}
                style={{ cursor: 'pointer' }}
              >
                {pair.student_name} 
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        -
        <Col>
          <h3>Guides</h3>
          <hr />
          <ListGroup style={{ backgroundColor: '#F0F0F0', padding: '10px' }}>
            {pairs.map(pair => (
              <ListGroup.Item
              key={pair.student_id}
                style={{ cursor: 'pointer' }}
              >
                {pair.guide_name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
    </>
  );
}

export default App;

