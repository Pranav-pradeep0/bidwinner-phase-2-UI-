import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Input,
  Modal,
  Typography,
} from "@mui/material";
import Upload from "../assets/Upload.svg";
import { X } from "@phosphor-icons/react";

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

const UploadFileModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFiles([]); // Reset files when closing modal
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles([...files, ...selectedFiles]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      const droppedFiles = Array.from(event.dataTransfer.files);
      setFiles([...files, ...droppedFiles]);
    }
  };

  const preventDefault = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Box>
      <Button onClick={handleOpen}>Open modal</Button>
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
              <Input
                type="file"
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
          {files.length > 0 && (
            <Box sx={{ textAlign: "center", marginTop: "20px" }}>
              <Typography variant="subtitle1">Selected Files:</Typography>
              <ul>
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default UploadFileModal;
