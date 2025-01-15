import { Alert, FormControl, Rating, Stack, TextField } from '@mui/material'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { useAppSelector } from '../../../customHooks/reduxHooks.ts';

const ReviewAddForm = ({ formData, setFormData}) => {
    const [value, setValue] = React.useState<number | null>(2)

    const {fulfilled,error}=useAppSelector(state=>state.reviewState)
    
    return (
        <Stack direction={'column'} gap={2} sx={{minWidth:{xs:300,sm:400,md:500}}} component={'form'} onSubmit={() => console.log("works")}>
         { fulfilled&& <Alert  icon={<CheckIcon fontSize="inherit" />} severity="success">
  Review has been succes fully added
</Alert>}
         { error&& <Alert  icon={<CheckIcon fontSize="inherit" />} severity="error">
  You have already iven review to this seller
</Alert>}
            <FormControl>
                <TextField id="standard-basic" 
                label="Enter review" 
                variant="standard" 
                onChange={(e)=>setFormData({...formData,review:e.target.value})}
                />
            </FormControl>
            <FormControl>
            <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          setFormData({...formData,rating:newValue})
        }}
      />
            </FormControl>
            
        </Stack>
    )
}

export default ReviewAddForm