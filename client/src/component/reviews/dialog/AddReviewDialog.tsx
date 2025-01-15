import {  Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import { ReviewModel } from '../../../InterfaceModels/userInterfaceModels.ts';
import { useAppDispatch, useAppSelector } from '../../../customHooks/reduxHooks.ts';
import { postReviewRequest } from '../../../redux/actions/reviewAction.ts';
import ReviewAddForm from '../dialogForm/reviewAddForm.tsx';
import { clearFulfilled, clearReviewError } from '../../../redux/slices/reviewSlice.ts';

const AddReviewDialogPopUp = ({ reviewDialog, setReviewDialog }) => {

    //Below codes are based on dialog box open and close
    const [scroll] = useState<DialogProps['scroll']>('paper');

    const dispatch = useAppDispatch()
    const { sellerId: id } = useAppSelector(state => state.commentState)
    const { loading } = useAppSelector(state => state.reviewState)

    const handleClose = () => {
        setReviewDialog(false);
        dispatch(clearFulfilled())
        dispatch(clearReviewError())
    };
    const descriptionElementRef = React.useRef<HTMLElement>(null);
    useEffect(() => {
        if (reviewDialog) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [reviewDialog])

    // Form logic
    const [formData, setFormData] = useState<ReviewModel>({ review: "", rating: 1, sellerId: id })

    useEffect(() => {
        if (id) {
            setFormData({ ...formData, sellerId: id })
        }
    }, [id,formData])


    //incomplete code need to do more
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        dispatch(postReviewRequest(formData))
    }


    return (
        < >
            <Dialog

                open={reviewDialog}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Add review</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <ReviewAddForm formData={formData} setFormData={setFormData} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='error'>discard</Button>
                    <LoadingButton loading={loading}  variant='contained' type='submit' onClick={handleSubmit}>Post Review</LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddReviewDialogPopUp