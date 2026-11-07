import { useState } from 'react';

function App() {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Validation: Missing registration number
    //if (!data.regNumber) {
    // setError('Registration number is required');
    // return;
    //}
    
    // Validation: Invalid URL
    try {
      new URL(data.url);
    } catch (_) {
      setError('Invalid submission URL');
      return;
    }

    // If valid, save the submission and clear form/errors
    setSubmissions([...submissions, data]);
    setError('');
    e.target.reset();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Assignment Submission Portal</h1>
      
      {/* Error message display */}
      {error && <div role="alert" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
      
      {/* Submission Form */}
      <form onSubmit={handleSubmit} data-testid="submit-form" style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <input name="name" placeholder="Name" required />
        <input name="regNumber" placeholder="Registration Number" />
        <input name="title" placeholder="Assignment Title" required />
        <input name="url" placeholder="Submission URL" required />
        <button type="submit">Submit</button>
      </form>

      <h2>Saved Submissions</h2>
      {/* List of valid submissions */}
      <ul data-testid="submission-list">
        {submissions.map((sub, i) => (
          <li key={i}>{sub.name} ({sub.regNumber}) - {sub.title} - <a href={sub.url}>Link</a></li>
        ))}
      </ul>
    </div>
  );
}

export default App;