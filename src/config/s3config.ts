const s3config = {
  accessKeyId: import.meta.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  bucket: import.meta.env.REACT_APP_AWS_BUCKET,
  region: import.meta.env.REACT_APP_AWS_DEFAULT_REGION,
};

export default s3config;
