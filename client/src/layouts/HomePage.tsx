import React, { ChangeEvent, useEffect } from 'react'
import SellerSection from '../component/seller/SellerSection.tsx'
import Page from '../component/pagination/Page.tsx'
import Hero from '../component/hero/Hero.tsx'
import Stack from '@mui/material/Stack'
import ReviewDialogPopUp from '../component/reviews/dialog/ReviewDialogPopUp.tsx'
import AddReviewDialogPopUp from '../component/reviews/dialog/AddReviewDialog.tsx'
import { useAppDispatch, useAppSelector } from '../customHooks/reduxHooks.ts'
import { getSellerRequest } from '../redux/actions/sellerActions.ts'

const HomePage = () => {
const {count:totalSeller}=useAppSelector(state=>state.sellerState)

    const sellersPerPage: number = 8;
    const totalPages: number = Math.ceil(totalSeller / sellersPerPage);// replace with your total pages
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [commentDialog, setCommentDialog] = React.useState<boolean>(false);
    const [reviewDialog, setReviewDialog] = React.useState<boolean>(false);

    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }

    const dispatch=useAppDispatch()

    useEffect(()=>{
       //dispatch(clearSellerError())
       dispatch(getSellerRequest({currentPage}))
    },[dispatch,currentPage])

    return (
        <>
            <Hero currentPage={currentPage}/>

            <Stack direction={'column'} gap={2} py={2}>
                <SellerSection commentDialog={commentDialog}setCommentDialog ={setCommentDialog} reviewDialog={reviewDialog} setReviewDialog={setReviewDialog}/>
                <Page totalPages={totalPages} currentPage={currentPage} handleChange={handleChange} />
            </Stack>
           
                            <AddReviewDialogPopUp  reviewDialog={reviewDialog} setReviewDialog={setReviewDialog} />
                            <ReviewDialogPopUp  reviewDialog={reviewDialog} setReviewDialog={setReviewDialog} commentDialog={commentDialog} setCommentDialog={setCommentDialog} />
        </>
    )
}

export default HomePage