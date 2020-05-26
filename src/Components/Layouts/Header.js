import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import CreateDialog from '../Exercises/Dialog'
import { makeStyles } from '@material-ui/core/styles'

export default () => {
  const useStyles = makeStyles(theme => ({
    flex: {
      flex: 1
    }
  }))
  const classes = useStyles()

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="subtitle1"
            color="inherit"
            className={classes.flex}
          >
            Exercise Database
          </Typography>
          <CreateDialog />
        </Toolbar>
      </AppBar>
    </div>
  )
}
