import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

interface Props {}

const Sidebar: React.FC<Props> = () => {
  return (
    <div className=''>
      <List component='nav' aria-label='main mailbox folders'>
        <ListItem button>
          <ListItemText primary='Nearest' />
        </ListItem>
        <ListItem button>
          <ListItemText primary='Wimbledon' />
        </ListItem>
        <ListItem button>
          <ListItemText primary='High Street Kensington' />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
