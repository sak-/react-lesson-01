import React, { Fragment, useState } from 'react'
import { CssBaseline } from '@material-ui/core'
import { Header, Footer } from './Layouts'
import Exercises from './Exercises'
import { muscles, exercises as ex } from '../store'
import { MyContext } from '../context'

export default () => {
  const [exercises, setExercises] = useState(ex)
  const [exercise, setExercise] = useState({})
  const [editMode, setEditMode] = useState(false)
  const [category, setCategory] = useState('')

  const getExercisesByMuscles = () => {
    const initExercises = muscles.reduce(
      (exercises_, category_) => ({
        ...exercises_,
        [category_]: []
      }),
      {}
    )

    return Object.entries(
      exercises.reduce((exercises_, exercise_) => {
        const { muscles } = exercise_
        exercises_[muscles] = [...exercises_[muscles], exercise_]
        return exercises_
      }, initExercises)
    )
  }

  const handleCategorySelected = category => setCategory(category)

  const handleExerciseSelected = id => {
    setExercise(exercises.find(ex => ex.id === id))
    setEditMode(false)
  }

  const handleExerciseCreate = ({ id, title, description, muscles }) => {
    const exercise_ = { id, title, description, muscles }
    setExercises([...exercises, exercise_])
    setEditMode(false)
    setExercise({})
  }

  const handleExerciseDelete = id => {
    setExercises(exercises.filter(ex => ex.id !== id))
    setEditMode(exercise.id === id ? false : editMode)
    setExercise(exercise.id === id ? {} : exercise)
  }

  const handleExerciseSelectEdit = id => {
    setExercise(exercises.find(ex => ex.id === id))
    setEditMode(true)
  }

  const handleExerciseEdit = exercise_ =>
    setExercises([...exercises.filter(ex => ex.id !== exercise_.id), exercise_])

  const getContext = () => ({
    muscles,
    onCreate: handleExerciseCreate
  })

  return (
    <MyContext.Provider value={getContext()}>
      <Fragment>
        <CssBaseline />
        <Header />
        <Exercises
          category={category}
          exercise={exercise}
          exercises={getExercisesByMuscles()}
          editMode={editMode}
          onSelect={handleExerciseSelected}
          onDelete={handleExerciseDelete}
          onSelectEdit={handleExerciseSelectEdit}
          onEdit={handleExerciseEdit}
        />
        <Footer onSelect={handleCategorySelected} />
      </Fragment>
    </MyContext.Provider>
  )
}
