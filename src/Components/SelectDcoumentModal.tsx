import { Box, Button, Modal } from "@mui/material";
import React from "react";
import DocumentSerchBar from "./SelectDocumentComponents/DocumentSerchBar";
import DocumentAccordians from "./SelectDocumentComponents/DocumentAccordians";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "55vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface DocumentModalProps {
  open: boolean,
  setOpen: any
}

const SelectDcoumentModal: React.FC<DocumentModalProps> = ({open, setOpen}) => {
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
                  <DocumentSerchBar />
                  <DocumentAccordians/>
        </Box>
      </Modal>
    </Box>
  );
};

export default SelectDcoumentModal;
