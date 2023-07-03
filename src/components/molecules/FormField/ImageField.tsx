import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { FileWithPath } from "react-dropzone";

import DropZone from "./DropZone";
import inputFieldContainer, { ImageFieldStyle } from "./Styles";
import Image from "../../atoms/Image";

export interface ImageFieldProps {
  label?: string;
  lined?: boolean;
  imageSrc?: string;
  name?: string;
  modFn: React.Dispatch<React.SetStateAction<boolean>>;
  readOnly?: boolean;
}

const defImage =
  "data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

function ImageField({
  label,
  imageSrc,
  lined,
  name,
  modFn,
  readOnly,
}: ImageFieldProps) {
  const [image, setImage] = useState(imageSrc || defImage);
  const [, setFile] = useState<FileWithPath | null>(null);

  return (
    <Grid
      container
      item
      xs={12}
      sx={{ ...inputFieldContainer, ...ImageFieldStyle }}
      className={lined ? "withBorder" : ""}
    >
      <Grid item xs={3}>
        {label && <Typography>{label}</Typography>}
      </Grid>
      <Grid item xs={9}>
        {!readOnly ? (
          <DropZone
            setFile={(f) => {
              setFile(f);
              modFn(true);
            }}
            b64Fn={(s) => setImage(s)}
            onFileDialogCancel={() => {
              setImage(imageSrc || defImage);
              modFn(false);
            }}
          >
            <Image src={image} />
          </DropZone>
        ) : (
          <Image src={image} />
        )}
        <input
          name={name}
          style={{ display: "none" }}
          value={image}
          onChange={() => null}
        />
      </Grid>
    </Grid>
  );
}

export default ImageField;
