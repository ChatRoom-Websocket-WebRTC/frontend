import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export default responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: 'iranyekan, Arial',
    },
    palette: {
      primary: { main: '#04aa6c' },
      secondary: { main: '#289bc3' },
    },
  })
);
