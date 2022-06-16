import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import Dropdown from "../components/Dropdown.js";

export const EditExercisePage = ({ exerciseToEdit}) => {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const history = useHistory();

    const options = [
        { label: 'kgs', value: 'kgs' },
        { label: 'lbs', value: 'lbs' },
      ];


    const changeUnit = (newVal) => {
        console.log(newVal);
        if(newVal === 'kgs'){
            const newWeight = Math.floor(weight/2.205);
            setWeight(newWeight);
            setUnit(newVal);

        } else {
            const newWeight = Math.ceil(weight * 2.205);
            setWeight(newWeight);
            setUnit(newVal);


        }
    }

   const editExercise = async () => { 
      const editedExercise = {name, reps, weight, unit, date};
      const response = await fetch(`/exercises/${exerciseToEdit._id}`, {         
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'content-type':'application/json',
            }
        }
      );
      if(response.status === 200) {
            alert( `Successfully edited ${editedExercise.name}`);
      } else {
            alert( `Could not edit exercise, reponse code is ${response.status}`);
      }
      history.push('/');
    };

    return (
        <div>
            <h1>Edit exercise</h1>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <Dropdown 
                        options={options}
                        value={unit}
                        onChange={e => changeUnit(e.target.value)}
                />
            <input
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={editExercise}
            >Save</button>
        </div>
    );
}


export default EditExercisePage;