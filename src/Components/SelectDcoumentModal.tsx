import { Box, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import DocumentSerchBar from "./SelectDocumentComponents/DocumentSerchBar";
import DocumentAccordians from "./SelectDocumentComponents/DocumentAccordians";
import { X } from "@phosphor-icons/react";
// import DrawerImage from "../assets/SECURITY.png";
import ButtonGradient from "./reusableComponents/Button";
import { BASE_URL } from "../utils/environment";
import AutoRenameModal from "./AutoRenameModal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  minHeight: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  gap: "10px",
};

interface DocumentModalProps {
  open: boolean;
  setOpen: any;
}

const SelectDcoumentModal: React.FC<DocumentModalProps> = ({
  open,
  setOpen,
}) => {
  const [imgURL, setImgURL] = useState("");
  const [pdfId, setPdfId] = useState("");
  const [autoRenameModalOpen, setAutoRenameModalOpen] = useState(false);

  console.log(pdfId);

  const handleClose = () => setOpen(false);

  const handleRenameClick = () => {
    setAutoRenameModalOpen(true);
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ flex: 1 }}>
            <DocumentSerchBar />
            <DocumentAccordians setImgURL={setImgURL} setPdfId={setPdfId} />
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "100%", height: "70%" }}>
              {imgURL ? (
                <img
                  src={`${BASE_URL}${imgURL}`}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  Select a image to preview
                </Typography>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "20px",
              right: "20px",
              cursor: "pointer",
              fontSize: "25px",
              color: "gray",
            }}
            onClick={() => setOpen(false)}
          >
            <X />
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: "40px",
              right: "40px",
              cursor: "pointer",
            }}
          >
            <ButtonGradient handleClick={handleRenameClick} title="Rename" />
            <AutoRenameModal
              open={autoRenameModalOpen}
              setOpen={setAutoRenameModalOpen}
              imgURL={imgURL}
              pdfId={pdfId}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default SelectDcoumentModal;
