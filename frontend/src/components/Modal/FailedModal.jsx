import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

export default function FailedModal({
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
          <Button onClick={onModalClosedCallback} color="error" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
