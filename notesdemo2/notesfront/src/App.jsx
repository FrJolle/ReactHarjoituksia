// Import statements
import axios from 'axios';
import { useState, useEffect } from 'react';
import NotesForm from './components/NotesForm';
import './App.css';


// Component Definition
const App = () => {
  // State variables
  const baseURL = 'http://localhost:3001/notes';
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Functions to interact with the server
  // Fetch notes
  const startHook = () => {
    axios.get(baseURL)
      .then(response => {
        setNotes(response.data);
      });
  };

  // Add a note
  const addNote = (e, newNote, newImportance) => {
    const note = { content: newNote, date: new Date().toISOString(), important: newImportance };
    axios.post(baseURL, note).then(response => {
      setNotes(notes.concat(response.data));
      setMessage("Muistiinpanon lisääminen onnistui");
    });
  };

  // Delete a note
  const deleteNote = (e, id) => {
    axios.delete(`${baseURL}/${id}`)
      .then(response => {
        setNotes(notes.filter(note => note.id !== id));
        setMessage("Muistiinpanon poistaminen onnistui");
      });
  };

  // Change the importance of a note
  const changeImportance = (e, id) => {
    const tempNote = notes.find(note => note.id === id);
    tempNote.important = !tempNote.important;
    axios.put(`${baseURL}/${id}`, tempNote)
      .then(response => {
        setNotes(notes.map(note => note.id === id ? tempNote : note));
        setMessage("Muistiinpanon tärkeys muutettu");
      });
  };

  // Component for displaying notes
  function NoteList({ notes }) {
    return (
      <ul>
        {notes.map(note => (
          <li className={note.important ? "important" : "normal"} key={note.id}>
            {note.content}
            <button onClick={e => deleteNote(e, note.id)}>Poista</button>
            <button onClick={e => changeImportance(e, note.id)}>Vaihda tärkeys</button>
          </li>
        ))}
      </ul>
    );
  };

  

  // useEffect hooks for side-effects
  useEffect(startHook, []);
  
  const messageHook = () => {
    if (message !== "") {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  };
  useEffect(messageHook, [message]);

  const errorHook = () => {
    if (errorMessage !== "") {
      const timer = setTimeout(() => setErrorMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  };
  useEffect(errorHook, [errorMessage]);

  // Component return (render)
  return (
    <div className="App">
      <h1>Notesdemo</h1>
      <NoteList notes={notes} />
      <NotesForm submitHandler={addNote} />
      <div className="userSuccess">{message}</div>
      <div className="userError">{errorMessage}</div>
    </div>
  );
};

export default App;
