
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function Review3() {
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
    const userEmail = localStorage.getItem('userEmail')
    const formData = new FormData();
    formData.append('ppt', file);
    formData.append('filename', file.name);
    formData.append('email', userEmail );
    // const email = 'example@example.com'
  
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