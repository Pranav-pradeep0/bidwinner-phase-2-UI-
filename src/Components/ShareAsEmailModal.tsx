import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "530px",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "12px",
};

interface EmailModalData {
  to: string;
  bcc: string;
  subject: string;
  message: string;
}

const ShareAsEmailModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const [shareAsEmailData, setShareAsEmailData] = useState<EmailModalData>({
    to: "",
    bcc: "",
    subject: "",
    message: "",
  });

  const isEmailValid = (email: string) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isfieldValid = (text: string) => {
    return text.trim().length > 0;
  };

  const isFormValid = () => {
    return (
      isEmailValid(shareAsEmailData.to) &&
      isEmailValid(shareAsEmailData.bcc) &&
      isfieldValid(shareAsEmailData.subject) &&
      isfieldValid(shareAsEmailData.message)
    );
  };

  const handleInputChange = (field: keyof EmailModalData, e: any) => {
    const { value } = e.target;
    setShareAsEmailData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleClose = () => {
    setShareAsEmailData({
      to: "",
      bcc: "",
      subject: "",
      message: "",
    });
    setOpen(false);
  };

  console.log(shareAsEmailData);

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
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "600",
              fontSize: "24px",
              paddingBottom: "15px",
              paddingTop: "25px",
            }}
          >
            Share as Email
          </Typography>
          <Divider />

          <Box
            sx={{
              paddingBlock: "10px",
              paddingInline: "40px",
              display: "grid",
              gap: "15px",
            }}
          >
            <Box sx={{ display: "grid", gap: "8px" }}>
              <Typography>To</Typography>
              <TextField
                fullWidth
                placeholder="Enter Email"
                size="small"
                value={shareAsEmailData.to}
                onChange={(e) => handleInputChange("to", e)}
                sx={{ borderRadius: "12px" }}
              />
            </Box>

            <Box sx={{ display: "grid", gap: "8px" }}>
              <Typography>Bcc</Typography>
              <TextField
                fullWidth
                placeholder="Example@gmail.com"
                size="small"
                value={shareAsEmailData.bcc}
                onChange={(e) => handleInputChange("bcc", e)}
                sx={{ borderRadius: "12px" }}
              />
            </Box>

            <Box sx={{ display: "grid", gap: "8px" }}>
              <Typography>Subject</Typography>
              <TextField
                fullWidth
                placeholder="Enter Subject"
                size="small"
                value={shareAsEmailData.subject}
                onChange={(e) => handleInputChange("subject", e)}
                sx={{ borderRadius: "12px" }}
              />
            </Box>

            <Box sx={{ display: "grid", gap: "8px" }}>
              <Typography>Message</Typography>
              <TextField
                fullWidth
                placeholder="Enter Message"
                multiline
                rows={3}
                value={shareAsEmailData.message}
                onChange={(e) => handleInputChange("message", e)}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                marginBlock: "15px",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  width: "140px",
                  textTransform: "none",
                  color: "#3153CD",
                  borderColor: "#3153CD",
                  borderRadius: "12px",
                }}
                onClick={handleClose}
              >
                Discard
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: "140px",
                  textTransform: "none",
                  backgroundColor: "#3153CD",
                  borderRadius: "10px",
                }}
                disabled={!isFormValid()}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ShareAsEmailModal;
