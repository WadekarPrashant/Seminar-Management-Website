import React, { useState ,useEffect} from 'react';
import './Review1.css'; // Import CSS file
import { useSelector, useDispatch } from 'react-redux';

const Review1 = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [email, setEmail] = useState('');


  //guide
  const [pairs, setPairs] = useState([]);
  // const [guideEmail, setGuideEmail] = useState(null);
  const [studentEmail, setStudentEmail] = useState(null);

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

    const studentEmails = pairs.map(pair => pair.student_email);
    const [studentEmail] = studentEmails;
    setStudentEmail(studentEmail);
  }, [pairs]);


 const  guideEmail = localStorage.getItem('guideEmail')

  const handleSubmit = async (event) => {
    //
    event.preventDefault();
    const response = await fetch('http://localhost:5000/topicpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guideEmail:guideEmail,studentEmail:studentEmail , topic1: input1 , topic2: input2, topic3: input3 }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
       alert("Successfully submitted in")
      } else {
        const errorKey = Object.keys(json)[0];
        alert(`The Field is Already Taken: ${errorKey} `);
     
      }
  };

  

  return (
      <div className="container">
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="input1" className="form-label">Topic 1 *</label>
        <input required
          type="text"
          className="form-control"
          id="input1"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="input2" className="form-label">Topic 2 *</label>
        <input required
          type="text"
          className="form-control"
          id="input2"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="input3" className="form-label">Topic 3 *</label>
        <input
          type="text"
          className="form-control"
          id="input3"
          value={input3}
          onChange={(e) => setInput3(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  );
};

export default Review1;
