import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingPage;
