import { Divider } from '@mui/material';

export default function DividerBold() {
  return (
    <>
      <Divider
        sx={{
          borderWidth: 2,
          borderRadius: 10,
          '&::before, &::after': {
            borderWidth: 2,
          },
        }}
      />
    </>
  );
}
