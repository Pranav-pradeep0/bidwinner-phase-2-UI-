import { Box, Modal } from "@mui/material";
import React from "react";
import DocumentSerchBar from "./SelectDocumentComponents/DocumentSerchBar";
import DocumentAccordians from "./SelectDocumentComponents/DocumentAccordians";
import { X } from "@phosphor-icons/react";
import DrawerImage from '../assets/SECURITY.png'
import ButtonGradient from "./reusableComponents/Button";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  gap: "10px"
};

interface DocumentModalProps {
  open: boolean;
  setOpen: any;
}

const SelectDcoumentModal: React.FC<DocumentModalProps> = ({
  open,
  setOpen,
}) => {
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
          <Box sx={{ flex: 1 }}>
            <DocumentSerchBar />
            <DocumentAccordians />
          </Box>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ width: "100%", height: "70%" }}>
              <img src={DrawerImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Box>
          </Box>
          <Box sx={{ position: "absolute", top: "20px", right: "20px", cursor: "pointer", fontSize: "25px", color: "gray" }} onClick={() => setOpen(false)} >
            <X />
          </Box>
          <Box sx={{ position: "absolute", bottom: "40px", right: "40px", cursor: "pointer" }}>
            <ButtonGradient handleClick={() => console.log("hello")} title="Rename" />
          </Box>
        </Box>

      </Modal>
    </Box>
  );
};

export default SelectDcoumentModal;
