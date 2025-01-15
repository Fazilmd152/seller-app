import Grid from '@mui/material/Grid2'
import React from 'react'
import SellerCard from './card/SellerCard.tsx'
import Typography from '@mui/material/Typography'
import { useAppSelector } from '../../customHooks/reduxHooks.ts'
import Skeletons from './skeletons/Skeletons.tsx'

const SellerSection = ({ commentDialog, setCommentDialog, reviewDialog, setReviewDialog }) => {

    const { loading, sellers }
        = useAppSelector(state => state.sellerState)

    return (
        <>

            <Typography sx={{ width: "fit-content", mx: 'auto', fontSize: "2rem", fontWeight: 500 }}
            >Seller Lists
            </Typography>

            <Grid container rowSpacing={1} p={2} px={4}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                rowGap={3}
            >

                {
                    sellers && sellers.length > 0  ? (sellers?.map(seller => {

                        return <Grid key={seller?._id} size={{ md: 4, sm: 6, xs: 12 }}>
                            {
                                loading ? <Skeletons /> : (<SellerCard reviewDialog={reviewDialog} setReviewDialog={setReviewDialog} loading={loading} seller={seller} commentDialog={commentDialog} setCommentDialog={setCommentDialog} />
                                )
                            }


                        </Grid>
                    })) : <Typography textAlign={'center'} mx={'auto'} fontSize={'1.5rem'} fontWeight={"500"}>No sellers found</Typography>
                }

            </Grid>
        </>
    )
}

export default SellerSection