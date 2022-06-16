import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import  Dropdown  from '../components/Dropdown.js';

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const options = [
        { label: 'kgs', value: 'kgs' },
        { label: 'lbs', value: 'lbs' },
      ];

    const history = useHistory();

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

    const handleReps = (reps) => {
        try { parseInt(reps);
            if(reps < 0){
                alert("Reps must be greater than zero");
            }
            return reps;
        } catch {
            alert("Reps must be a whole number");
        }
    }

    const handleWeight = (weight) => {
        try{ parseInt(weight); 

            if(weight < 1){
                alert("Weight must be greater than zero");
            }
            return weight;
        }
        catch{
            alert("Weight must be a whole number.");
        }

    }

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the exercise!");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <h1>Add Exercise</h1>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)} required/>
            <input
                type="number"
                value={reps}
                placeholder="Enter # of reps here"
                onChange={e => setReps(handleReps(e.target.value))} required/>
            <input
                type="number"
                min="1"
                placeholder="Enter weight here"
                value={weight}
                onChange={e => setWeight(handleWeight(e.target.value))} required />
            <Dropdown 
                        options={options}
                        value={unit}
                        onChange={e => changeUnit(e.target.value)}
                />
            <input 
                type="text"
                placeholder="Set date"
                value={date}
                onChange={e => setDate(e.target.value)} required/>
            <button
                onClick={addExercise}
            >Add</button>
            <Link class="Link" to="/">Cancel</Link>
        </div>

    );
}

export default AddExercisePage;