import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercise_model.mjs';
const fetch = require('node-fetch');

const app = express();

const PORT = process.env.PORT;

app.use(express.json())

app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            // In case of an error, send back status code 400 in case of an error.
            // A better approach will be to examine the error and send an
            // error status code corresponding to the error.
            res.status(400).json({ Error: "Invalid Request" });
        });
});

app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed' });
        });

});

app.get('/exercises/', (req, res) => {

    let filter = {};
    // Is there a query parameter named year? If so add a filter based on its value.
    if(req.query.year !== undefined){
        filter = { year: req.query.year };
    }
    exercises.findExercises(filter, '', 0)
        .then(exercises => {
            res.send(exercises);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed' });
        });

});

app.put('/exercises/:_id', (req, res) => {
    
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
    .then(result => {
        if (result.modifiedCount === 1 ) {
            res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
        } else if (result.modifiedCount === 0 && result.matchedCount === 1) {
            res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
        } 
        else if(result.matchedCount === 0){
            res.status(404).json({ Error: `Not found` });
        }
        else {
            res.status(400).json({Error:`Invalid request`})
        }
    })
    .catch(error => {
        console.log(req.params._id);
        res.status(400).json({ Error: `Request failed ${error}` });
    });
});

app.delete('/exercises/:_id', async (req, res) => {
    const query = await exercises.findExerciseById(req.params._id);
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).json({deleted:`Deleted: ${query[0].title}`});
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        }); 
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});