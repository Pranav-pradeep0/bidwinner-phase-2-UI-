import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import Upload from "../assets/Upload.svg";
import { X } from "@phosphor-icons/react";
import axios from "axios";

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
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    try {

      const formData = new FormData();
      formData.append("app_token", "n4hBAXMO0t3eo1IYAEd3");
      formData.append("pdf_file", file ? file : "");

      const response = await axios.post(
        "http://192.168.1.19:8000/add-convert-pdf-image/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error while uploading PDF file:", error);
    }
  };

  // const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFile(null); // Reset file when closing modal
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
        </Box>
      </Modal>
    </Box>
  );
};

export default UploadFileModal;
