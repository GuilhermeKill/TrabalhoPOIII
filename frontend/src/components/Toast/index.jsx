import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';

export default function Toast({ message, type = 'success' }) {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <Snackbar
        open={visible}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setVisible(false)}
      >
        <Alert
          severity={type}
          variant="filled"
          sx={{ width: '100%' }}
          onClose={() => setVisible(false)}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
