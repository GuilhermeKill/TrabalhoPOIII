import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

export default function SuccessModal({
  open = false,
  title,
  message,
  onModalClosedCallback,
}) {
  return (
    <>
      <Dialog open={open} onClose={onModalClosedCallback}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{message}</DialogContent>
        <DialogActions>
          <Button onClick={onModalClosedCallback} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
