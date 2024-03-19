import { Box } from "@mui/material";
import { useState } from "react";
import UploadFileModal from "./UploadFileModal";
import AutoRenameModal from "./AutoRenameModal";
import SelectDcoumentModal from "./SelectDcoumentModal";
import ButtonGradient from "./reusableComponents/Button";

const DisplayPage = () => {
  const [UploadModalopen, setUploadModalOpen] = useState(false);
  const [ListModalOpen, setListModalOpen] = useState(false);
  const [renameModalState, setRenameModalState] = useState(false);

  return (
    <Box
      sx={{
        height: "95vh",
        width: "95vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "50px",
        margin: 0,
      }}
    >
      <Box>
        <ButtonGradient
          handleClick={() => setUploadModalOpen(true)}
          title="Upload Pdf"
        />
      </Box>
      <Box>
        <ButtonGradient
          handleClick={() => setListModalOpen(true)}
          title="List Pdf"
        />
      </Box>
      <Box>
        <ButtonGradient
          handleClick={() => setRenameModalState(true)}
          title="Rename"
        />
      </Box>
      <Box>
        <UploadFileModal open={UploadModalopen} setOpen={setUploadModalOpen} />
        <AutoRenameModal
          open={renameModalState}
          setOpen={setRenameModalState}
        ></AutoRenameModal>
        <SelectDcoumentModal
          open={ListModalOpen}
          setOpen={setListModalOpen}
        ></SelectDcoumentModal>
      </Box>
    </Box>
  );
};

export default DisplayPage;
