import React, { ChangeEvent, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from "../../../customHooks/reduxHooks.ts";
import { EditReviewModel } from "../../../InterfaceModels/userInterfaceModels.ts";
import { deleteReviewRequest, editReviewRequest } from "../../../redux/actions/reviewAction.ts";
import  TextField  from "@mui/material/TextField";

const ReviewList = ({ c }) => {

  const { user } = useAppSelector(state => state.authState)
  const isHisComment = user?._id === c.postedBy._id

  const [edit, setEdit] = useState<boolean>(false)

  const [formData, setFormData] = useState<EditReviewModel>({ text: c.text, rating: 1, reviewId: c._id })


  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, text: event.target.value })
  }

  const dispatch = useAppDispatch()
  const handleSubmit = () => {
    dispatch(editReviewRequest(formData))
    setEdit(!edit)
  }


  return (
    <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
      <ListItem sx={{ width: '100%' }}>
        <ListItemAvatar>
          <Avatar alt={c.postedBy.name} src="sdfdsf" />
        </ListItemAvatar>
        <Stack sx={{ width: '100%' }}>
          <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}>
            <Box sx={{ display: { sm: 'flex' }, gap: { sm: 5 }, }}>
              <Typography>{c.postedBy.name}</Typography>

              <Rating
                name="simple-controlled"
                readOnly={!edit}
                size="small"
                value={c.rating}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, rating: newValue })
                }}
              />

              {/* <ReadOnlyRating rating={c.rating} /> */}
            </Box>
            {isHisComment && (
              edit ? <Box >
                <IconButton size="small" onClick={handleSubmit}>
                  <SaveIcon />
                </IconButton>
                <IconButton size="small" onClick={() => setEdit(!edit)}>
                  <CloseIcon color="error" />
                </IconButton>
              </Box> : <Box >
                <IconButton size="small" onClick={() => setEdit(!edit)}>
                  <ModeEditIcon />
                </IconButton>
                <IconButton size="small" onClick={()=>dispatch(deleteReviewRequest(c._id))}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            )}


          </Stack>
          {edit ? <TextField onChange={handleInput} value={formData.text} variant="standard" /> : <ListItemText secondary={c.text} />}
        </Stack>
      </ListItem>
      <Divider variant="inset" component="li" />

    </List>
  );
}

export default ReviewList