import React, { useState ,useEffect} from 'react';
import './Review1.css'; // Import CSS file
import { useSelector, useDispatch } from 'react-redux';

const Review1 = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [email, setEmail] = useState('');

  const [panel, setPanel] = useState(null);
  const [rollno, setRollno] = useState(null);
  const [prn, setPrn] = useState(null);
  const [studata, setStudata] = useState([]);
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
    console.log(studentEmail)
    setStudentEmail(studentEmail);
  }, [pairs]);


//   useEffect(() => {
//     fetch('http://localhost:5000/getstudentdetails', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ email:studentEmail })
//     })
//       .then(response => response.json())
//       .then(data => {setStudata(data);console.log(data)})
//       .catch(error => console.error(error));
//   }, []);
//   useEffect(() => {
//      const panels = studata.map(pair => pair.PANEL);
//      const [panel] = panels;
//       const rollnos = studata.map(pair => pair.RollNo);
//       const [rollno] = rollnos;
//       const prns = studata.map(pair => pair.PRN);
//       const [prn] = prns;
//       console.log(panel,"--",prn,"--",rollno)
//      setPanel(panel);
//      setPrn(prn);
//      setRollno(rollno);
//   }, [studata]);

//  const  guideEmail = localStorage.getItem('guideEmail')

//   const handleSubmit = async (event) => {
//     //
//     event.preventDefault();
//     const response = await fetch('http://localhost:5000/topicpost', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ guideEmail:guideEmail,studentEmail:studentEmail ,PANEL:panel,RollNo:rollno,PRN:prn, topic1: input1 , topic2: input2, topic3: input3 }),
//       });
//       const json = await response.json();
    
//       if (json.success) {
//        alert("Successfully submitted in")
//       } else {
//         const errorKey = Object.keys(json)[0];
//         alert(`The Field is Already Taken: ${errorKey} `);
     
//       }
//   };

const handleSubmit = async (event) => {
  event.preventDefault();

  const guideEmail = localStorage.getItem('guideEmail');
  // const studentEmail = pairs.length > 0 ? pairs[0].student_email : null;
  if (!studentEmail) {
    alert('No student email found.');
    return;
  }

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

  const topic1 = input1;
  const topic2 = input2;
  const topic3 = input3;

  const submitResponse = await fetch('http://localhost:5000/topicpost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      guideEmail,
      studentEmail,
      PANEL: panel,
      RollNo: rollno,
      PRN: prn,
      topic1,
      topic2,
      topic3,
    }),
  });

  const submitJson = await submitResponse.json();

  if (submitJson.success) {
    alert('Successfully submitted in');
  } else {
    const errorKey = Object.keys(submitJson)[0];
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
