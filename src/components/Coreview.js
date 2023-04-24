import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Button, Form } from 'react-bootstrap';

function App() {
  const [students, setStudents] = useState([]);
  const [guides, setGuides] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);

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
      body: JSON.stringify({ studentId: selectedStudent.id,student_name:selectedStudent.name, guideId: selectedGuide.id,guide_name:selectedGuide.name })
    })
      .then(response => {
        if (response.ok) {
          alert('Selected pair stored successfully');
        } else {
          alert('Error storing selected pair');
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Students</h3>
          <ListGroup style={{ backgroundColor: '#F0F0F0', padding: '10px' }}>
            {students.map(student => (
              <ListGroup.Item
                key={student.id}
                active={selectedStudent && selectedStudent.id === student.id}
                onClick={() => setSelectedStudent(student)}
                style={{ cursor: 'pointer' }}
              >
                {student.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col>
          <h3>Guides</h3>
          <ListGroup style={{ backgroundColor: '#F0F0F0', padding: '10px' }}>
            {guides.map(guide => (
              <ListGroup.Item
                key={guide.id}
                active={selectedGuide && selectedGuide.id === guide.id}
                onClick={() => setSelectedGuide(guide)}
                style={{ cursor: 'pointer' }}
              >
                {guide.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Button type="submit" style={{ marginTop: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>Submit</Button>
      </Form>
    </Container>
  );
}

export default App;