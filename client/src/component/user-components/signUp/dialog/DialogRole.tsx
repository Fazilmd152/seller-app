import React from 'react'
import { Avatar, Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemText } from '@mui/material';


const DialogRole = ({ openDialog, setOpenDialog, formData, setFormData }) => {

    const handleClick = (role: String) => {
        setFormData({ ...formData, role })
        setOpenDialog(!openDialog)
    }

    return (
        <Dialog open={openDialog}>
            <DialogTitle>Choose your account Type</DialogTitle>
            <List>
                <ListItem>
                    <ListItemButton onClick={() => handleClick("user")}>
                        <Avatar sx={{mr:2,bgcolor:'green'}}>U</Avatar>
                        <ListItemText sx={{ textTransform: 'capitalize' }} primary={"just user Account"} />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton onClick={() => handleClick("seller")}>
                        <Avatar sx={{mr:2,bgcolor:'primary.main'}}>S</Avatar>
                        <ListItemText sx={{ textTransform: 'capitalize' }} primary={"seller account"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Dialog>
    )
}

export default DialogRole