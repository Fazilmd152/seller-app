import React, { ChangeEvent } from 'react'
import Pagination from '@mui/material/Pagination'

const Page = ({totalPages,currentPage, setCurrentPage}) => {

    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
        console.log(value);
        
    }
  return (
    <Pagination 
    sx={{width:'fit-content',mx:'auto'}} 
    count={totalPages} shape="rounded" 
    page={currentPage}
    onChange={handleChange} />
  )
}

export default Page