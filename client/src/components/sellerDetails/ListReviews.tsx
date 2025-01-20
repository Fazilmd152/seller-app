import React, { FormEvent, useState } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import RatingComponent from '../Rating/RatingComponent.tsx'
import TextField from '@mui/material/TextField'
import Buttons from '../reviewComponents/Buttons.tsx'
import useReviewStore from '../../store/useReviewStore.ts'
import useAuthStore from '../../store/useAuthStore.ts'

const ListReviews = ({ d }) => {
    const { authUser } = useAuthStore()
    const [edit, setEdit] = useState(false)
    const [text, setText] = useState(d.text)
    const [rating, setRating] = useState(1)
    const isYourReview = authUser._id === d.postedBy._id
    const getValue = (e: number) => {
        setRating(e)
    }

    const { editReview, isEditingReview, deleteReview } = useReviewStore()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        editReview({ reviewId: d._id, rating: d.rating ?? rating, text })
        setText("")
        setEdit(false)
    }

    const handleDelete = () => {
        deleteReview(d._id)
        setText("")
    }


    return (
        <><ListItem component={'form'} onSubmit={handleSubmit}>
            {
                edit ? (<Box sx={{ display: 'flex', gap: 2 }}>
                    <Avatar
                        sx={{
                            bgcolor: '#0057b7',
                            mr: { xs: 1, sm: 3 }
                        }}
                    />
                    <Box display={'flex'} flexDirection={'column'} gap={1}>
                        <TextField variant='standard' value={text} onChange={(e) => setText(e.target.value)} />
                        <RatingComponent rating={rating} getValue={getValue} readOnly={false} />
                    </Box>

                    <Buttons edit={edit} setEdit={setEdit} />
                </Box>) : (
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Avatar
                            sx={{
                                bgcolor: '#0057b7',
                                mr: { xs: 1, sm: 3 }
                            }}
                        ></Avatar>
                        <ListItemText
                            primary={
                                <Box alignItems={'center'} display={'flex'} gap={2}>
                                    {d.postedBy.name}
                                    <RatingComponent rating={d.rating} getValue={getValue} readOnly={true} />
                                </Box>
                            }
                            secondary={
                                <>{d.text}
                                </>
                            }
                        />
                        <Box sx={{ display: isYourReview ? '' : 'none' }}>
                            <Buttons handleDelete={handleDelete} edit={edit} setEdit={setEdit} isEditing={isEditingReview} />
                        </Box>
                    </Box>
                )
            }
        </ListItem>

            {!edit && <Divider />}
        </>
    )
}

export default ListReviews