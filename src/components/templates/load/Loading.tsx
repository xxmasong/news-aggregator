import { Stack, CircularProgress } from "@mui/material";

function Loading() {
  return (
    <Stack height={1} justifyContent="center" alignItems="center">
      <CircularProgress />
    </Stack>
  );
}

export default Loading;
