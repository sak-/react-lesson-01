import React, { Fragment, useContext } from 'react'
import {
  Paper,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import Form from './Form'
import { MyContext } from '../../context'

export default ({
  exercises,
  exercise,
  exercise: {
    id,
    title = 'Welcome!',
    description = 'Please select an exercise from the list of left.'
  }
}) => {
  const {
    muscles,
    editMode,
    category,
    onSelect,
    onDelete,
    onSelectEdit,
    onEdit
  } = useContext(MyContext)

  const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(1),
      overflowY: 'scroll',
      [theme.breakpoints.up('sm')]: {
        marginTop: 5,
        height: '100%'
      },
      [theme.breakpoints.down('xs')]: {
        height: '100%'
      }
    },
    container: {
      [theme.breakpoints.up('sm')]: {
        height: 'calc(100% - 64px - 48px)'
      },
      [theme.breakpoints.down('xs')]: {
        height: 'calc(100% - 56px - 48px)'
      }
    },
    item: {
      [theme.breakpoints.up('sm')]: {
        height: 'calc(100% - 10px)'
      },
      [theme.breakpoints.down('xs')]: {
        height: '50%'
      }
    }
  }))
  const classes = useStyles()

  const handleSubmit = exercise => {
    onEdit(exercise)
  }

  return (
    <Grid container className={classes.container}>
      <Grid item className={classes.item} xs={12} sm={6}>
        <Paper className={classes.paper}>
          {exercises.map(([group, exercises]) =>
            !category || category === group ? (
              <Fragment key={group}>
                <Typography
                  varient="h2"
                  color="secondary"
                  style={{ textTransform: 'capitalize' }}
                >
                  {group}
                </Typography>
                <List component="ul">
                  {exercises.map(({ id, title }) => (
                    <ListItem key={id} button>
                      <ListItemText
                        primary={title}
                        onClick={() => onSelect(id)}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          color="primary"
                          onClick={() => onSelectEdit(id)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={() => onDelete(id)}
                        >
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Fragment>
            ) : null
          )}
        </Paper>
      </Grid>
      <Grid item className={classes.item} xs={12} sm={6}>
        <Paper className={classes.paper}>
          <Typography variant="h4" color="secondary" gutterBottom>
            {title}
          </Typography>
          {editMode ? (
            <Form
              key={id}
              categories={muscles}
              onSubmit={handleSubmit}
              exercise={exercise}
            />
          ) : (
            <Fragment>
              <Typography variant="subtitle1" style={{ marginTop: 20 }}>
                {description}
              </Typography>
            </Fragment>
          )}
        </Paper>
      </Grid>
    </Grid>
  )
}
