import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExerciseToEdit }) {
    const history = useHistory();
    const [exercises, setExercises] = useState([]);

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE' });

        if(response.status === 204){
            setExercises(exercises.filter(m => m._id !== _id));
        } else {
            console.error(`Failed to delete service with id ${_id}, status is ${response.status()}`)
        }
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        history.push("/edit-exercise");
    }

    const loadExercises = async () => {
        const response = await fetch("/exercises");
        const data = await response.json();
        setExercises(data);
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h2>List of exercises</h2>
            <ExerciseList exercises={exercises} 
                    onDelete={onDelete}
                    onEdit={onEdit}>
            </ExerciseList>
        </>
    );
}

export default HomePage;