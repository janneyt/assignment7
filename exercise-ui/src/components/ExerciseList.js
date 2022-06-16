import React from 'react';
import Exercise from './Exercise';

function ExerciseList({ exercises, onDelete, onEdit }) {
    return (
        <table id="exercise">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit (Kg or lbs)</th>
                    <th>Date in MM-DD-YY</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => <Exercise exercise={exercise}
                    onDelete = {onDelete}
                    onEdit = {onEdit}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default ExerciseList;
