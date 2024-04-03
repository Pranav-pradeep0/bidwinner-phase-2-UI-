import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import Upload from "../assets/Upload.svg";
import { X } from "@phosphor-icons/react";
import axios, { CancelTokenSource } from "axios";
import { API_TOKEN, BASE_URL } from "../utils/environment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  width: "500px",
  boxShadow: 24,
  borderRadius: "12px",
};

interface UploadFileModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadFileModal: React.FC<UploadFileModalProps> = ({ open, setOpen }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [cancelToken, setCancelToken] = useState<CancelTokenSource | null>(
    null
  );

  const handleUpload = async () => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("app_token", API_TOKEN);
      formData.append("pdf_file", file ? file : "");
      formData.append("pdf_title", file ? file.name : "");

      const cancelTokenSource = axios.CancelToken.source();
      setCancelToken(cancelTokenSource);

      const response = await axios.post(
        `${BASE_URL}/add-convert-pdf-image/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent: any) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
          cancelToken: cancelTokenSource.token,
        }
      );

      console.log("API Response:", response);
      setUploadSuccess(true);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Upload canceled", error.message);
      } else {
        console.error("Error while uploading PDF file:", error);
      }
    } finally {
      setUploading(false);
      setCancelToken(null);
    }
  };

  const handleClose = () => {
    if (cancelToken) {
      cancelToken.cancel("Upload canceled by user");
    }
    setOpen(false);
    setFile(null);
  };

  const handleFileInputChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const preventDefault = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  console.log(file);

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: "24px",
                paddingBottom: "15px",
                paddingTop: "25px",
              }}
            >
              Upload Files
            </Typography>
            <IconButton
              sx={{
                position: "absolute",
                top: 20,
                right: 10,
                color: "#9F9F9F",
              }}
              onClick={handleClose}
            >
              <X size={28} />
            </IconButton>
            <Divider />
          </Box>
          <Box
            sx={{
              backgroundColor: "#F1F8FF",
              width: "420px",
              border: "#ACACAC 1px dashed",
              marginInline: "auto",
              marginBlock: "30px",
              paddingBlock: "50px",
              borderRadius: "7px",
            }}
            onDrop={handleDrop}
            onDragOver={preventDefault}
          >
            <Box
              sx={{
                display: "grid",
                placeItems: "center",
              }}
            >
              <input
                type="file"
                accept="application/pdf"
                id="fileInput"
                onChange={handleFileInputChange}
                style={{ display: "none" }}
              />
              <label htmlFor="fileInput">
                <img
                  src={Upload}
                  alt="upload icon"
                  style={{ cursor: "pointer" }}
                />
              </label>
              <Typography sx={{ color: "rgba(0, 0, 0, 0.5)" }}>
                Drag & Drop your files here
              </Typography>
              <Typography sx={{ color: "rgba(0, 0, 0, 0.5)" }}>OR</Typography>
              <label htmlFor="fileInput">
                <Typography
                  sx={{
                    color: "#3153CD",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  Browse Files
                </Typography>
              </label>
            </Box>
          </Box>
          {file && (
            <Box>
              <Typography
                sx={{
                  color: "rgba(0, 0, 0, 0.7)",
                  marginBlock: "20px",
                  textAlign: "center",
                }}
              >
                Selected File:{" "}
                <span style={{ color: "#3153CD" }}>{file.name}</span>
              </Typography>
            </Box>
          )}
          {uploading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <CircularProgress
                variant="indeterminate"
                value={uploadProgress}
              />
              {/* <Typography sx={{ marginLeft: "10px" }}>
                {uploadProgress}%
              </Typography> */}
            </Box>
          ) : uploadSuccess ? (
            <Typography
              sx={{ textAlign: "center", color: "green", marginBlock: "20px" }}
            >
              Upload successful!
            </Typography>
          ) : (
            <Button
              onClick={handleUpload}
              sx={{
                display: "flex",
                marginBottom: "20px",
                marginInline: "auto",
              }}
              variant="contained"
            >
              Upload
            </Button>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default UploadFileModal;
