import React from 'react'
import Pagination from '@mui/material/Pagination'

const Page = ({totalPages,currentPage,handleChange}) => {
  return (
    <Pagination 
    sx={{width:'fit-content',mx:'auto'}} 
    count={totalPages} shape="rounded" 
    page={currentPage}
    onChange={handleChange} />
  )
}

export default Page