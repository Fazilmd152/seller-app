import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, Switch, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import ReviewList from '../reviewContent/ReviewList.tsx';
import DummyComment from '../dummy/DummyComment.tsx';
import { useAppSelector } from '../../../customHooks/reduxHooks.ts';

const ReviewDialogPopUp = ({ commentDialog, setCommentDialog, reviewDialog, setReviewDialog }) => {
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [showDummyReview, setShowDummyReview] = useState<boolean>(false);

  const { seller } = useAppSelector(state => state.commentState)


  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setCommentDialog(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setCommentDialog(false);
  };
  const addReview = () => {
    setReviewDialog(!reviewDialog);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (commentDialog) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [commentDialog])
  return (
    <Dialog
      open={commentDialog}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"

    >
      <DialogTitle id="scroll-dialog-title" >Reviews <Tooltip title="Click to see Dummy reviews"><Switch
        checked={showDummyReview}
        onChange={() => setShowDummyReview(!showDummyReview)}
        name="loading"
        color="primary"
      /></Tooltip></DialogTitle>
      <DialogContent dividers={scroll === 'paper'} sx={{ minHeight: '200px', minWidth: { xs: 300, sm: 400, md: 500 } }}>

        {
        !showDummyReview &&( seller && seller.reviews && seller.reviews.length > 0 ? (
            seller.reviews.map((r) => (
              <Box>
                <DialogContentText id="scroll-dialog-description">
                  <ReviewList c={r} />
                </DialogContentText>
              </Box>
            ))
          ) : (
            <Typography textAlign="center" display="flex" justifyContent="center" alignItems="center">
              Be the first one to comment ! <br/>or look the duy comments by clicking the switch
            </Typography>))

          }
        <DummyComment showDummyReview={showDummyReview} />
      </DialogContent>
      <DialogActions>
        <Button onClick={addReview}>Give Review</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ReviewDialogPopUp