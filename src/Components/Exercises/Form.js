import React, { useState, useContext } from 'react'
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@material-ui/core'
import { MyContext } from '../../context'

export default ({ onSubmit, exercise: ex }) => {
  const initExercise = {
    id: null,
    title: '',
    description: '',
    muscles: ''
  }

  const [exercise, setExcercise] = useState(ex ? ex : initExercise)

  const handleChangeTitle = e =>
    setExcercise({ ...exercise, title: e.target.value })

  const handleChangeDescription = e =>
    setExcercise({ ...exercise, description: e.target.value })

  const handleChangeMuscle = e =>
    setExcercise({ ...exercise, muscles: e.target.value })

  const handleSubmit = ex => {
    const id_ = ex ? ex.id : ex.title.toLocaleLowerCase().replace(/ /g, '-')
    const ex_ = { ...ex, id: id_ }
    onSubmit(ex_)

    setExcercise(initExercise)
  }

  const { muscles } = useContext(MyContext)

  return (
    <form>
      <TextField
        id="title"
        label="Title"
        value={exercise.title}
        onChange={handleChangeTitle}
        margin="normal"
        fullWidth
      />
      <br />
      <FormControl fullWidth>
        <InputLabel id="muscle">Muscle</InputLabel>
        <Select value={exercise.muscles} onChange={handleChangeMuscle}>
          {muscles.map(muscle => (
            <MenuItem key={muscle} value={muscle}>
              {muscle}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <TextField
        id="description"
        label="description"
        value={exercise.description}
        multiline
        rows="4"
        onChange={handleChangeDescription}
        margin="normal"
        fullWidth
      />
      <br />
      <br />
      <FormControl>
        <Button
          onClick={() => handleSubmit(exercise)}
          color="primary"
          variant="contained"
          disabled={exercise.title === '' || exercise.muscles === ''}
        >
          {exercise.id ? 'Edit' : 'Create'}
        </Button>
      </FormControl>
    </form>
  )
}
