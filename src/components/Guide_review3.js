import { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Form, Table } from 'react-bootstrap';
import './Guide_review2.css';
import { useSelector, useDispatch } from 'react-redux';


function Guide_review3() {
  const [email, setEmail] = useState('');
  const [filename, setFilename] = useState('');
  const [pptBuffer, setPptBuffer] = useState(null);
  const [marks, setMarks] = useState(null);

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
  const guideEmail = localStorage.getItem('guideEmail')
  
  const [pptData, setPptData] = useState([]);
 
  useEffect(() => {
    fetch('http://localhost:5000/getppt3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentEmail: studentEmail,guideEmail:guideEmail ,filename: 'Seminar.pptx' })
    }).then(response => response.json())
      .then(data => {
        setPptData(data);
      })
      .catch(error => console.log(error));
  }, [guideEmail, studentEmail]);

  function handleDownload() {
    if (pptBuffer) {
      const url = window.URL.createObjectURL(new Blob([pptBuffer]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }


  function handleMarksSubmit(e) {
    e.preventDefault();
    // Send marks data to server
    fetch('http://localhost:5000/entermarks3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: studentEmail, marks: marks })
    }).then(response => {console.log(response); alert("marks alloted successfully")})
      .catch(error => console.log(error));
  }
  return (
    <Container>
      <Row>
        <Col>
          <h1 style={{textAlign: "center", margin: "40px"}}>Review 3 (Guide : ({guideEmail}))</h1>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>PRN No.</th>
            <th>Panel</th>
            <th>Roll No.</th>
            <th>Filename</th>
            <th>Enter Marks</th>
          </tr>
        </thead>
       <tbody>
  {pptData.map((data, index) => (
    <tr key={index}>
      <td>{studentEmail}</td>
      <td>{data.PRN}</td>
      <td>{data.PANEL}</td>
      <td>{data.RollNo}</td>
      <td>{data.filename}</td>
      <td>
        <Form onSubmit={(e) => handleMarksSubmit(e, studentEmail)}>
          <Form.Group controlId="marks">
            <Form.Control type="number" onChange={(e) => setMarks(e.target.value)} />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </td>
    </tr>
  ))}
</tbody>

<div className='download-buttons'   style={{
            position: "absolute",
            right:"0px",
            bottom: "0",
            margin: "40px",
          }}>
  {pptData.map((data, index) => (
    <td key={index}>  <Button variant="success" onClick={() => handleDownload(data.pptBuffer, data.filename)}>
    Download
  </Button></td>
  ))}
</div>
      </Table>
    </Container>
  );
}

export default Guide_review3;