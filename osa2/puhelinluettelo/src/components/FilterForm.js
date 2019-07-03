import React from 'react'

const FilterForm = ({newFilter, handleFilterChange}) => {
    return (
        <form>
        filter shown with: <input value={newFilter} onChange={handleFilterChange} />
      </form>
    )
  }

export default FilterForm