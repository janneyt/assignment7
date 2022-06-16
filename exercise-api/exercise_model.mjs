import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

const exerciseSchema = mongoose.Schema(
    {
        name: {type:String, required:true},
        reps: {type:Number, required:true},
        weight: {type:Number, required:true},
        unit: {type:String, required:true},
        date: {type:String, required:true}
    }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

function validate (name, reps, weight, unit, date) {
    try{ 
        reps = parseInt(reps);
        weight = parseInt(weight);
    }
    catch {
        throw new Error("Weight or reps are not a whole number.")
    }
    if(name === undefined || name === null){
        throw new Error("Name cannot be empty or null");
    }
    if(reps === undefined || reps <= 0 || !Number.isInteger(reps)){
        throw new Error("Reps must be an integer greater than zero");
    }
    if(weight === undefined || weight <= 0 || !Number.isInteger(weight)){
        throw new Error("Weight must be an integer greater than zero");
    }
    if(unit !== 'kgs' && unit !== "lbs"){
        throw new Error(`Unit ${unit} must be of the form 'kgs' or the form 'lbs'`);
    }
    if(!isDateValid(date)){
        throw new Error("Date must be of the format mm-dd-yy");
    }
    return true;
}

const createExercise = async (name, reps, weight, unit, date) => {
    
    const valInputs = validate (name, reps, weight, unit, date);

    const exercise = new Exercise({ 
        name: name, 
        reps: reps,
        weight: weight,
        unit: unit,
        date: date
     });
    // Call save to persist this object as a document in MongoDB
    return exercise.save();
}

const findExercises = async (filter) => {
    const query = Exercise.find(filter);
    return query.exec();
}

const findExerciseById = (id) => {
    return Exercise.find({_id:id});
}

const replaceExercise = async (id, name, reps, weight, unit, date) => {

    const valInputs = validate(name, reps, weight, unit, date);
    console.log(valInputs);
    
    const update = {name:name,reps:reps,weight:weight, unit:unit, date:date};
    const result = await Exercise.updateOne({_id:id}, update);

    return result;
}

const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    return result.deletedCount;
}



db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

export {createExercise, findExercises, replaceExercise, findExerciseById, deleteById};