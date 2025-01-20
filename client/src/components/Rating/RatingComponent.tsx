import Rating from '@mui/material/Rating'
import React, { useEffect, useState } from 'react'

interface RatingComp {
  getValue?: (data: any) => void,
  readOnly?: boolean,
  rating:number,
  large?:boolean
}

const RatingComponent = ({large, getValue, readOnly=true,rating }: RatingComp) => {

  const [value, setValue] = useState<number | null>(1)

  useEffect(()=>{
  if (getValue) getValue(value)
  },[getValue,value])

  return (
    <Rating
      name="simple-controlled"
      readOnly={readOnly}
      size={large?"large":"small"}
      value={rating}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
    />
  )
}

export default RatingComponent