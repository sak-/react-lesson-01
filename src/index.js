import React from 'react'
import ReactDOM from 'react-dom'
import App from './Components/App'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { green, red } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: {
      main: green.A400,
      light: green[200],
      dark: green[700]
    },
    type: 'dark'
  },
  spacing: 5
})

const rootElement = document.getElementById('root')
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  rootElement
)
