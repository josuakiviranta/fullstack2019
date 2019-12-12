import React from 'react'

// Renderöi redux storeen tallennetun viestin
const Notification = ({ store }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {store.getState().notification}
    </div>
  )
}

export default Notification