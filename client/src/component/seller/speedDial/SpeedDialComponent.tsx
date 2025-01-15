import React from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import { useAppDispatch } from '../../../customHooks/reduxHooks.ts';
import { setId } from '../../../redux/slices/commentState.ts';

const SpeedDialComponent = ({ reviewDialog, setReviewDialog, seller }) => {

  const dispatch = useAppDispatch()

  const action = {
    name: "Add Review",
    icon: <EditNoteIcon />,
    onclick: () => {
      dispatch(setId(seller._id))
      setReviewDialog(!reviewDialog)
    }
  }
  return (
    <>
      <SpeedDial
        direction='right'
        ariaLabel="SpeedDial basic example"
        sx={{
          '& .MuiFab-root': {
            width: '25px',
            height: '25px',
            minHeight: '20px',
            //bgcolor: 'warning.main',

          },
          '& .MuiButtonBase-root': {
            width: '25px', height: '25px'
          }
        }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onclick}
        />

      </SpeedDial>
    </>

  )
}

export default SpeedDialComponent