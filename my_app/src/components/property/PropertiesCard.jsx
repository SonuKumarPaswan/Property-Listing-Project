import React, { useContext } from 'react'
import { PropetiesContext } from '../../context/PropertiesContext'

const PropertiesCard = () => {
    const {properties}= useContext(PropetiesContext)
    console.log(properties);
  return (
    <div>
      <h1>{properties[0].buildingNumber}</h1>
    </div>
  )
}

export default PropertiesCard
