import { useMemo } from "react";
import { Box, Theme } from "@mui/material";
import { useDropzone, DropzoneOptions, FileWithPath } from "react-dropzone";
import { SxProps } from "@mui/system";

const dropzone = {
  baseStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  },
  activeStyle: {
    borderColor: "#2196f3",
  },
  acceptStyle: {
    borderColor: "#00e676",
  },
  rejectStyle: {
    borderColor: "#ff1744",
  },
};

const base64 = (file: FileWithPath, cb: (v: string) => void) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result as string);
    console.log(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}

interface Props extends DropzoneOptions {
  b64Fn?: (s: string) => void;
  setFile: (f: FileWithPath | null) => void;
  containerSx?: SxProps<Theme>;
  children?: React.ReactChild;
}

function DropZone({
  b64Fn,
  setFile,
  containerSx,
  children,
  maxFiles = 1,
  maxSize = 5_000_000,
  accept = "image/*",
  onDropAccepted,
  onDropRejected,
  onFileDialogCancel,
}: Props) {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxFiles,
    maxSize,
    accept,
    onDropAccepted: (f, e) => {
      if(onDropAccepted) onDropAccepted(f, e);
      else {
        if(b64Fn) base64(f[0], b64Fn);
        setFile(f[0]);
      }
    },
    onDropRejected,
    onFileDialogCancel: () => {
      if(onFileDialogCancel) onFileDialogCancel();
      else {
        if(b64Fn) b64Fn("");
        setFile(null);
        acceptedFiles.length = 0;
      }
    },
  });

  const style = useMemo(
    () => ({
      ...dropzone.baseStyle,
      ...(isDragActive ? dropzone.activeStyle : {}),
      ...(isDragAccept ? dropzone.acceptStyle : {}),
      ...(isDragReject ? dropzone.rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <Box {...getRootProps({ style })} className="CustomDropZone" sx={containerSx}>
      <input {...getInputProps()} />
      {children}
    </Box>
  );
}

export default DropZone;
