const express = require('express');
const WorkoutRouter = express.Router()

const User = require('../../models/user')
const Workout = require('../../models/workout')
const Completion = require('../../models/completion')

const Exercise = require('../../models/exercises').exercise
const Set = require('../../models/set')

const mongoose = require('mongoose')

// a workout is an object that has an array of exercise objects and should be
// pushed to the user.workouts property
// should exercises be an array of strings, and not created until a user adds it
// to a workout? ["dips", "pushups", "bench press"] --->
// let prepToAdd;
// exercises.forEach(exercise => {
//   if (exercise => {
//     prepToAdd = {
//       name: exercise,
//       muscleGroup: String,
//       set:
//     }
//   }
// })

// test: localhost:5000/api/account/verify/5c461fd326035e1220096be5/workouts

WorkoutRouter.route('/account/verify/:user_id/workouts')
  .post((req, res, next) => {
    User.findById(req.params.user_id, (err, user) => {
      if (err) res.send(err)
      const { body } = req
      body.user = user._id
      Workout.create(body, (err, workout) => {
        if (err) res.send(err)
        user.workouts.push(workout)
        user.save(err => {
          if (err) res.send(err)
          res.json({ msg: 'workout created' })
        })
      })
    })
  })

WorkoutRouter.route('/account/verify/:user_id/workouts/:workout_id/completions')
  .post((req, res, next) => {
    Workout.findById(req.params.workout_id, (err, workout) => {
      if (err) res.send(err)
      const { body } = req
      body.workout = workout._id
      Completion.create(body, (err, completion) => {
        if (err) res.send(err)
        workout.completions.push(completion)
        workout.save(err => {
          if (err) res.send(err)
          res.json({ msg: 'you completed your workout' })
        })
      })
    })
  })


// figure out how to create multiple exercises simultaneously.
WorkoutRouter.route('/account/verify/:user_id/workouts/:workout_id/exercises')
  .post((req, res) => {
    Workout.findById(req.params.workout_id, (err, workout) => {
      if (err) {
        res.send(err)
      } else {
        const { body } = req
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
          savedExercises.forEach((exercise) => {
            workout.exercises.push(exercise)
          })
          workout.save((err) => {
            if (err) res.send(err)
            res.json({msg: 'exercise added'})
          })
        })

        // takes each mapped exercise from array of submitted exercises
        // and builds them out
        function formatExercise( singleExercise ) {
          const exercise = {}
          exercise.name = singleExercise.name
          exercise.workout = workout._id
          exercise.muscleGroup = singleExercise.muscleGroup
          return exercise
        }
      }
    })
  })

WorkoutRouter.route('//account/verify/:user_id/workouts/:workout_id/exercises/:exercise_id/sets')
  .post((req, res, next) => {
    Exercise.findById(req.params.exercise_id, (err, exercise) => {
      if (err) res.send(err)
      const { body } = req
      body.exercise = exercise._id
      Set.create(body, (err, set) => {
        if (err) res.send(err)
        set.reps = body.reps
        set.weight = body.weight
        exercise.sets.push(set)
        exercise.save(err => {
          if (err) res.send(err)
          res.json({ msg: 'you completed your workout' })
        })
      })
    })
  })




module.exports = WorkoutRouter
