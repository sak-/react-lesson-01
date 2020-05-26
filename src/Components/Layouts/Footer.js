import React, { useContext } from 'react'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import { MyContext } from '../../context'

export default ({ onSelect }) => {
  const { muscles, category } = useContext(MyContext)

  const index = category
    ? muscles.findIndex(group => group === category) + 1
    : 0

  const onIndexSelect = (e, index) => {
    onSelect(index === 0 ? '' : muscles[index - 1])
  }

  return (
    <AppBar position="static">
      <Tabs
        value={index}
        onChange={onIndexSelect}
        variant="scrollable"
        scrollButtons="auto"
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab label="All" />
        {muscles.map(group => (
          <Tab key={group} label={group} />
        ))}
      </Tabs>
    </AppBar>
  )
}