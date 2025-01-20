import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import PasswordIcon from '@mui/icons-material/Password';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DescriptionIcon from '@mui/icons-material/Description';
import useAuthStore from '../../store/useAuthStore.ts';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


const menuButtons = [
    {
        type: "Update profile",
        Icon: AssignmentIndIcon,
        action: () => { }
    },
    {
        type: "Add Description",
        Icon: DescriptionIcon,
        action: () => { }
    },
    {
        type: "Change Password",
        Icon: PasswordIcon,
        action: () => { }
    },
    {
        type: "Signout",
        Icon: LogoutIcon,
        action: () => {}
    }
]

const MenuButtons = () => {
  const {signOut}=useAuthStore()

  menuButtons[3].action=signOut

  return (
    <List>
    {menuButtons.map((button, index) => (
      <ListItem key={index+1} disablePadding>
        <ListItemButton onClick={button.action}>
          <ListItemIcon>
            <button.Icon color={button.type === 'Signout' ? 'error' : 'primary'}/>
          </ListItemIcon>
          <ListItemText primary={button.type} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
  )
}

export default MenuButtons