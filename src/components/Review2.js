
import React, { useState,useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

function Review2() {

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
    // const email = 'example@example.com'
  
  console.log(file.name);
    try {
      const response = await fetch('http://localhost:5000/sendppt', {
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
      <h1>Review 2</h1>
      <h3>Upload Presentation</h3>
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

export default Review2;