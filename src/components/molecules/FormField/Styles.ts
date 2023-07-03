import { StyleProps } from "../../utils/CommonTypes";

const inputFieldContainer: StyleProps = {
  alignItems: "center",
  p: "10px 0px",
  "&.withBorder": {
    borderBottom: "1px solid #e6e6e6",
  },
  "& > .MuiGrid-root:first-of-type": {
    display: "flex",
    alignItems: "flex-end",
    "&.checkbox-label": {
      alignItems: "flex-start",
      paddingTop: "9px",
    },
    "& .MuiTypography-root": {
      fontWeight: 600,
      fontSize: "15px",
    },
  },
  "@media (max-width: 768px)": {
    "& .breakable": {
      flexBasis: "100%",
      maxWidth: "100%",
    },
    "& .MuiTypography-root": {
      fontSize: "14px !important",
    },
  },
};

export const ImageFieldStyle: StyleProps = {
  "& img": {
    height: 100,
    width: 100,
    m: "2px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  "& .CustomDropZone": {
    boxSizing: "content-box",
    maxWidth: 105,
    borderRadius: "50% !important",
    borderColor: "rgba(0, 0, 0, 0.87) !important",
  },
};

export const RadioFieldStyle: StyleProps = {
  gap: 1,
  "& .MuiFormGroup-root": {
    gap: 1,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    "& .MuiTypography-body1": {
      bgcolor: "#ebebeb",
      fontSize: "14px",
      lineHeight: "30px",
      height: "30px",
      pl: 1,
      pr: 1,
      borderRadius: "15px",
    },
    "& .Mui-checked + .MuiTypography-body1": {
      bgcolor: "#ff4f00",
      color: "#ffffff",
    },
  },
  "& .MuiRadio-root": {
    display: "none",
  },
  "& .MuiFormControlLabel-root": {
    ml: 0,
    mr: 0,
  },
};

export default inputFieldContainer;
