
import React, { useState,useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

function Review3() {

  //
  const [panel, setPanel] = useState(null);
  const [rollno, setRollno] = useState(null);
  const [prn, setPrn] = useState(null);
  const [studata, setStudata] = useState([]);

  //guide
  const [pairs, setPairs] = useState([]);
  // const [guideEmail, setGuideEmail] = useState(null);
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


  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {

    const response = await fetch('http://localhost:5000/getstudentdetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: studentEmail }),
    });
  
    const data = await response.json();
    const panels = data.map((pair) => pair.PANEL);
    const rollnos = data.map((pair) => pair.RollNo);
    const prns = data.map((pair) => pair.PRN);
  
    const panel = panels.length > 0 ? panels[0] : null;
    const rollno = rollnos.length > 0 ? rollnos[0] : null;
    const prn = prns.length > 0 ? prns[0] : null;
  
    event.preventDefault();
  
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    const guideEmail = localStorage.getItem('guideEmail')
 
    const formData = new FormData();
    formData.append('ppt', file);
    formData.append('filename', file.name);
    formData.append('studentEmail', studentEmail );
    formData.append('guideEmail', guideEmail );
    formData.append('PRN', prn );
    formData.append('PANEL', panel );
    formData.append('RollNo', rollno );

  
  console.log(file.name);
    try {
      const response = await fetch('http://localhost:5000/sendppt3', {
        method: 'POST',
        body: formData
      });
      localStorage.setItem("filename",file.name)
  //JSON.stringify({ email: email, file:file , filename:file.name }),
      if (response.ok) {
        setMessage('File uploaded successfully.');
        setFile(null);
      } else {
        setMessage('Failed to upload file.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while uploading the file.');
    }
  };
  return (
    <Container>
      <h1>Review 3</h1>
      <h3>Upload Research Paper</h3>
      <Form onSubmit={handleSubmit} enctype="multipart/form-data">
        <Form.Group controlId="formFile">
          <Form.Label>Select a PowerPoint file</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Upload
        </Button>
        {message && <p>{message}</p>}
      </Form>
    </Container>
  );
}

export default Review3;