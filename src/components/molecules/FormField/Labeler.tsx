import { Divider, Grid, Typography } from "@mui/material";

function Labeler({
  label,
  children,
  noDiv,
  compact,
  divNoMb,
  persist,
}: {
  label: string;
  children: React.ReactNode;
  noDiv?: boolean;
  compact?: boolean;
  divNoMb?: boolean;
  persist?: boolean;
}) {
  if (persist)
    return (
      <Grid container>
        <Grid item xs={3} container alignItems="center">
          <Typography variant="body2" fontWeight="bold">
            {label}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          {children}
        </Grid>
        {!noDiv && (
          <Grid item xs={12} mt={1} mb={divNoMb ? 0 : 1}>
            <Divider />
          </Grid>
        )}
      </Grid>
    );

  return (
    <Grid container>
      <Grid item xs={12} sm={compact ? 12 : 3} container alignItems="center">
        <Typography variant="body2" fontWeight="bold">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={compact ? 12 : 9}>
        {children}
      </Grid>
      {!noDiv && (
        <Grid item xs={12} mt={1} mb={divNoMb ? 0 : 1}>
          <Divider />
        </Grid>
      )}
    </Grid>
  );
}

export default Labeler;
