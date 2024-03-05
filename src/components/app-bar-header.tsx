import {
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  AppBar,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { AddCircleIcon } from '@mui/icons-material';

function AppBarHeader() {
  return (
    <>
      <Box sx={{ flexGrow: 1, paddingBottom: 2 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Products
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default AppBarHeader;
