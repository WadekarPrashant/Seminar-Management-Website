
// import React, { useState, useEffect } from 'react';
// import './guide_review1.css'

// function GuideReview() {
//   const [topics, setTopics] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5000/gettopics')
//       .then(response => response.json())
//       .then(data => setTopics(data))
//       .catch(error => console.error(error));
//   }, []);

//   const [selectedTopics, setSelectedTopics] = useState({});

//   const handleTopicSubmit = (event) => {
//     event.preventDefault();
//     // TODO: implement logic to submit selected topic
//   }

//   const handleTopicSubmit2 = (event, email, topic1, topic2, topic3) => {
//     event.preventDefault();
//     const selectedTopic = prompt(`Select a topic for ${email}`, `${topic1}, ${topic2}, ${topic3}`);
//     alert(`Successfully alloted topic : ${selectedTopic} to ${email}`)
//     // TODO: implement logic to store selectedTopic in a variable
//     setSelectedTopics(prevState => ({
//       ...prevState,
//       [email]: selectedTopic
//     }));
//   }

//   return (
//     <div className="container">
//       <h1>Guide Review 1</h1>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Email</th>
//             <th>Topic 1</th>
//             <th>Topic 2</th>
//             <th>Topic 3</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {topics.map(topic => (
//             <tr key={topic.id}>
//               <td>{topic.email}</td>
//               <td className={selectedTopics[topic.email] === topic.topic1 ? 'selected' : ''}>{topic.topic1}</td>
//               <td className={selectedTopics[topic.email] === topic.topic2 ? 'selected' : ''}>{topic.topic2}</td>
//               <td className={selectedTopics[topic.email] === topic.topic3 ? 'selected' : ''}>{topic.topic3}</td>
//               <td>
//                 <form onSubmit={handleTopicSubmit}>
//                   <input type="hidden" name="email" value={topic.email} />
//                   <input type="hidden" name="topic1" value={topic.topic1} />
//                   <input type="hidden" name="topic2" value={topic.topic2} />
//                   <input type="hidden" name="topic3" value={topic.topic3} />
//                   <button type="submit" onClick={(e) => handleTopicSubmit2(e, topic.email, topic.topic1, topic.topic2, topic.topic3)} className="btn btn-primary">Select</button>
//                 </form>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default GuideReview;

import React, { useState, useEffect } from 'react';
import './guide_review1.css'

function GuideReview() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/gettopics')
      .then(response => response.json())
      .then(data => setTopics(data))
      .catch(error => console.error(error));
  }, []);

  const [selectedTopics, setSelectedTopics] = useState({});

  const handleTopicSubmit = (event) => {
    event.preventDefault();
    
  }

  const handleTopicSubmit2 = (event, email, topic1, topic2, topic3) => {
    event.preventDefault();
    const selectedTopic = prompt(`Select a topic for ${email}`, `${topic1}, ${topic2}, ${topic3}`);
    const marks = prompt(`Enter marks for ${email} (${selectedTopic}):`);
  var topic = selectedTopic ;
  console.log(topic)
    // POST request
    fetch('http://localhost:5000/result_1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        topic,
        marks
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Response:', data);
        alert(`Successfully added marks for ${email} (${selectedTopic}): ${marks}`);
      })
      .catch(error => {
        console.error('Error:', error);
        alert(`Failed to add marks for ${email} (${selectedTopic}): ${marks}`);
      });
  
    // Update selectedTopics state
    setSelectedTopics(prevState => ({
      ...prevState,
      [email]: selectedTopic
    }));
  }

  return (
    <div className="container">
      <h1>Guide Review 1</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Topic 1</th>
            <th>Topic 2</th>
            <th>Topic 3</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {topics.map(topic => (
            <tr key={topic.id}>
              <td>{topic.email}</td>
              <td className={selectedTopics[topic.email]?.topic === topic.topic1 ? 'selected' : ''}>{topic.topic1}</td>
              <td className={selectedTopics[topic.email]?.topic === topic.topic2 ? 'selected' : ''}>{topic.topic2}</td>
              <td className={selectedTopics[topic.email]?.topic === topic.topic3 ? 'selected' : ''}>{topic.topic3}</td>
              <td>
                <form onSubmit={handleTopicSubmit}>
                  <input type="hidden" name="email" value={topic.email} />
                  <input type="hidden" name="topic1" value={topic.topic1} />
                  <input type="hidden" name="topic2" value={topic.topic2} />
                  <input type="hidden" name="topic3" value={topic.topic3} />
                  <button type="submit" onClick={(e) => handleTopicSubmit2(e, topic.email, topic.topic1, topic.topic2, topic.topic3)} className="btn btn-primary">Select</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GuideReview;