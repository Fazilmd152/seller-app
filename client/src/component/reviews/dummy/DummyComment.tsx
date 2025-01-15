import { Box, DialogContentText } from '@mui/material'
import React from 'react'
import ReviewList from '../reviewContent/ReviewList.tsx'

const DummyComment = ({ showDummyReview }) => {
    const comments = [{
        postedBy:{"name": "Emma Wilson"},
        "text": "This is some awesome thinking!",
        "rating": 1,
        "dummy": true
    },
    {
        postedBy:{"name": "Cameron Perez"},
        "text": "What terrific math skills you're showing!",
        "rating": 3,
        "dummy": true
    },
    {
        postedBy:{"name": "Emily Johnson"},
        "text": "You are an amazing writer!",
        "rating": 3,
        "dummy": true
    },
    {
        postedBy:{"name": "Brayden Fleming"},
        "text": "Wow! You have improved so much!",
        "rating": 3,
        "dummy": true
    }, {
        postedBy:{"name": "Wyatt Perry"},
        "text": "Nice idea!",
        "rating": 5,
        "dummy": true
    },
    {
        postedBy:{"name": "Daniel Taylor"},
        "text": "You are showing excellent understanding!",
        "rating": 4,
        "dummy": true
    },
    {
        postedBy:{"name": "James Davis"},
        "text": "This is clear, concise, and complete!",
        "rating": 1,
        "dummy": true
    },
    {
        postedBy:{"name": "Luke Cooper"},
        "text": "What a powerful argument!",
        "rating": 1,
        "dummy": true
    },
    {
        postedBy:{"name": "Jace Smith"},
        "text": "I knew you could do it!",
        "rating": 1,
        "dummy": true
    },]
    return (
        comments.map(c => {
            return showDummyReview && (<Box>
                <DialogContentText key={c.text} id="scroll-dialog-description">
                    <ReviewList c={c} />
                </DialogContentText>
            </Box>)
        })

    )
}

export default DummyComment