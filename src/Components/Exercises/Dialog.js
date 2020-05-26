import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Fab
} from '@material-ui/core'
import { Add } from '@material-ui/icons'
import Form from './Form'
import { MyContext } from '../../context'

export default () => {
  const { onCreate } = useContext(MyContext)
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)
  const handleToggle = () => setOpen(!open)

  const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1)
      }
    }
  }))
  const classes = useStyles()

  const handleSubmit = exercise => {
    onCreate(exercise)
    handleClose()
  }

  return (
    <div className={classes.root}>
      <Fab onClick={handleToggle} size="small" color="secondary">
        <Add />
      </Fab>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>Create a New Exercise</DialogTitle>
        <DialogContent>
          <DialogContentText>Please fill out the form below</DialogContentText>
          <Form onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
