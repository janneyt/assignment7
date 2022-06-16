import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import Navigation from './components/Navigation';

import { useState } from 'react';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState([]);
  return (
    <div className="App">

      <Router>
      <Navigation links={["/","/add-exercise"]} linkNames={["Home","Add Exercise"]}/>
        <div className="App-header">
          
        <header>
          <h1>Exercise Database</h1>
          <p>This is an exercise tracker meant to help you keep track of when you exercise and how you exercise.</p>
          
        </header>
        
          <Route path="/" exact>
            <HomePage setExerciseToEdit={setExerciseToEdit} />
          </Route>
          <Route path="/add-exercise">
            <AddExercisePage />
          </Route>
          <Route path="/edit-exercise">
            <EditExercisePage exerciseToEdit={exerciseToEdit} setExerciseToEdit={setExerciseToEdit} />
          </Route>
        </div>
      </Router>
      <footer>
        <p>© 2022 Ted Janney</p>
      </footer>
    </div>

  );
}

export default App;