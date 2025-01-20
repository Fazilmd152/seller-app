import React from 'react'
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button } from '@mui/material';

interface ButtonProps {
    edit: boolean;
    setEdit: (edit: boolean) => void,
    isEditing?:boolean,
    isDeleting?:boolean,
    handleDelete?:()=>void
  }
  

const  Buttons = ({edit,setEdit,isEditing,handleDelete,isDeleting}:ButtonProps) => {



// useEffect(() => {
//     if(isEditing)
//         setLoading(isEditing)
//   }, [isEditing]);

    return (
        <>
           {
           edit?<Box >
           <LoadingButton variant='outlined' size="small" type='submit' loading={isEditing}>
               Update
           </LoadingButton>
           <Button variant='text' color='error'  size="small" disabled={isEditing} onClick={()=>setEdit(!edit)}>
               cancel
           </Button>
       </Box>:
       <Box >
           <IconButton size="small" onClick={()=>setEdit(!edit)} disabled={isDeleting}>
               <ModeEditIcon />
           </IconButton>
           <IconButton size="small" onClick={handleDelete} disabled={isDeleting}>
               <DeleteIcon color="error" />
           </IconButton>
       </Box>
           } 
        </>
    )
}

export default Buttons