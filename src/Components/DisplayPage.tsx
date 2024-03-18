import { Box, Button } from "@mui/material";
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
        {/* <Button
          onClick={() => setUploadModalOpen(true)}
          sx={{
            color: "white",
            paddingInline: "30px",
            textTransform: "none",
            borderRadius: "10px",
            background: "linear-gradient(95.67deg, #4776E6 0%, #7B54E9 95.18%)",
          }}
        >
          Upload Pdf
        </Button> */}

        <ButtonGradient handleClick={() => setUploadModalOpen(true)} title="Upload Pdf" />
      </Box>
      <Box>
        {/* <Button
          onClick={() => setListModalOpen(true)}
          sx={{
            color: "white",
            paddingInline: "30px",
            textTransform: "none",
            borderRadius: "10px",
            background: "linear-gradient(95.67deg, #4776E6 0%, #7B54E9 95.18%)",
          }}
        >
          List Pdf
        </Button> */}
        <ButtonGradient handleClick={() => setListModalOpen(true)} title="List Pdf" />

      </Box>
      <Box>
        {/* <Button
          onClick={() => setRenameModalState(true)}
          sx={{
            color: "white",
            paddingInline: "30px",
            textTransform: "none",
            borderRadius: "10px",
            background: "linear-gradient(95.67deg, #4776E6 0%, #7B54E9 95.18%)",
          }}
        >
          Rename
        </Button> */}
        <ButtonGradient handleClick={() => setRenameModalState(true)} title="Rename" />

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
