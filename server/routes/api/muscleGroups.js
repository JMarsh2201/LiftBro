const express = require('express');
// importing mongoose schemas
const MuscleGroup = require('../../models/exercises.js').muscleGroup;
const Exercise = require('../../models/exercises.js').exercise;

const muscleGroupsRouter = express.Router()

muscleGroupsRouter.route('/muscle_groups')
  // route to view list of muscle groups. Populates exercises array so that
  // exercise names are available from this route.
  .get((req, res) => {
    MuscleGroup.find()
      .populate('exercises')
      .exec((err, muscleGroups) => {
        console.log(muscleGroups)
        if (err)res.send(err)
        res.json(muscleGroups);
      });
  })
  // internal use only. users will not post. adds {name: <muscle group>}
  // cannot post exercises here
  .post((req, res) => {
    const muscleGroup = new MuscleGroup()
    const { body } = req
    muscleGroup.name = body.name
    muscleGroup.exercises = body.exercises
    muscleGroup.save(err => {
      if (err) res.send(err)
      res.json(muscleGroup)
    })
  })


  muscleGroupsRouter.route('/muscle_groups/:group_id/exercises')
  // get all exercises for specific muscle group.
  .get((req, res) => {
    MuscleGroup.findById(req.params.group_id, (err, muscleGroups) => {
        if (err) res.send(err);
      })
      .populate('exercises')
      .exec((err, muscleGroups) => {
        if (err) res.send(err)
        res.json(muscleGroups.exercises)
      })
  })
  // internal use only. users will not post. adds {exercise: <exercise name>}
  .post((req, res) => {
    MuscleGroup.findById(req.params.group_id, (err, muscleGroups) => {
      if (err) {
        res.send(err)
      } else {
        const { body } = req
        // allows exercises to be bulk uploaded as an array of objects
        // rather than one at a time
        let exercises;
        if (Array.isArray(body)) {
          exercises = body.map((exercise) => {
            return formatExercise(exercise)
          })
        } else {
          exercises = formatExercise(body)
        }
        Exercise.create(exercises, (err, savedExercises) => {
          if (err) res.send(err)
          // adds new exercises to array of exercises attached to specific muscle group
          savedExercises.forEach((exercise) => {
            muscleGroups.exercises.push(exercise)
          })
          muscleGroups.save((err) => {
            if (err) res.send(err)
            res.json({msg: 'execise added'})
          })
        })

        // takes each mapped exercise from array of submitted exercises
        // and builds them out
        function formatExercise( singleExercise ) {
          const exercise = {}
          exercise.exercise = singleExercise.exercise
          exercise.muscleGroups = muscleGroups._id
          return exercise
        }
      }
    })
  })

module.exports = muscleGroupsRouter
