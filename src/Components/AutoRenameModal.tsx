import React, { useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import {
  CaretRight,
  File,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
  X,
} from "@phosphor-icons/react";
import "react-image-crop/dist/ReactCrop.css";
import SECURITY from "../assets/SECURITY.png";
import SECURITY2 from "../assets/SECURITY2.png";
import FLOOR from "../assets/FLOOR.png";
import ImageZoomcomponent from "./ImageZoomcomponent";
import axios from "axios";


const BASE_URL = "http://192.168.1.19:8000/";
const TOKEN = "9S2yi7E4CwR3T4XnUu08";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "800px",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "12px",
  pt: 2,
  px: 4,
  pb: 3,
};

const childStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  width: 300,
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

interface RenameModalProps {
  open: boolean;
  setOpen: any;
}

const AutoRenameModal: React.FC<RenameModalProps> = ({ open, setOpen }) => {
  // const [open, setOpen] = useState(false);
  const [nestedOpen, setNestedOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rectCoordinates, setRectCoordinates] = useState({});


  const [pageRange, setPageRange] = useState("");
  // const [selectedImage, setSelectedImage] = useState("");

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNestedOpen = () => {
    setNestedOpen(true);
  };

  const handleNestedClose = () => {
    setNestedOpen(false);
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoomLevel) => prevZoomLevel + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoomLevel) => Math.max(0.1, prevZoomLevel - 0.1));
  };

  const [applyOption, setApplyOption] = useState("page");

  const handleApplyOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setApplyOption(event.target.value);
  };

  const handlePageRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;
    if (value.length === 2) {
      value += "-";
    }
    if (value.length <= 5) {
      const [firstPart, secondPart] = value.split("-");
      if (firstPart.length > 2 || secondPart?.length > 2) return;
      setPageRange(value);
    }
  };

  const dummyImages = [SECURITY, SECURITY2, FLOOR];

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === dummyImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? dummyImages.length - 1 : prevIndex - 1
    );
  };
  const handleUploadPDF = async () => {

    // const values =rectCoordinates

    
    // const data = {
    //   app_token:TOKEN,
    //   pdf_id:”15”,
    //   coords:"6550,1212,5454,8778",
    // }

    // try {
    //   const res = await axios.post(`${BASE_URL}/add-auto-rename-image`, data)
    //   console.log(res.data);

    // } catch (err) {
    //   console.log(err);

    // }
  }

  return (
    <Box>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontWeight: "600", color: "#3153CD", fontSize: "16px" }}
            >
              Auto-Rename
            </Typography>
            <IconButton color="inherit" onClick={handleClose}>
              <X size={26} />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "85%",
              alignItems: "center",
              marginBlock: "10px",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <File size={26} />
              <Typography>
                Al Hasan Building Drawing Electrical Estimation Document.pdf
              </Typography>
            </Box>
            <IconButton color="inherit">
              <CaretRight size={26} />
            </IconButton>
          </Box>

          <Box
            className="image-container"
            sx={{
              position: "relative",
              overflow: "scroll",
              display: "grid",
              placeItems: "center",
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Box
              sx={{
                transform: `scale(${zoomLevel})`,
                transition: "transform 0.5s ease",
              }}
            >
              {/* <ReactCrop crop={crop} onChange={(c: any) => setCrop(c)}>
                <img
                  src={dummyImages[currentIndex]}
                  alt={`Image ${currentIndex + 1}`}
                  style={{
                    width: "100%",
                    maxHeight: "400px",
                  }}
                />
              </ReactCrop> */}
              <ImageZoomcomponent
                src={dummyImages[currentIndex]}
                rectCoordinates={rectCoordinates}
                setRectCoordinates={setRectCoordinates}

              ></ImageZoomcomponent>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              position: "absolute",
              top: "50%",
              left: 0,
            }}
          >
            <IconButton onClick={handlePrevSlide}>
              <CaretRight size={26} style={{ transform: "rotate(180deg)" }} />
            </IconButton>
            <IconButton onClick={handleNextSlide}>
              <CaretRight size={26} />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.12)",
                backgroundColor: "#F4F4F4",
                width: "max-content",
              }}
            >
              <IconButton onClick={handleZoomOut}>
                <MagnifyingGlassMinus size={24} />
              </IconButton>
              <Typography>{Math.floor(zoomLevel * 100)}</Typography>
              <IconButton onClick={handleZoomIn}>
                <MagnifyingGlassPlus size={24} />
              </IconButton>
            </Box>
            <Button
              variant="text"
              sx={{
                color: "white",
                textTransform: "none",
                paddingInline: "20px",
                background:
                  "linear-gradient(95.67deg, #4776E6 0%, #7B54E9 95.18%)",
              }}
              onClick={handleNestedOpen}
            >
              Rename
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* Nested modal for apply options */}
      <Modal
        open={nestedOpen}
        onClose={handleNestedClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={childStyle}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <RadioGroup
              row
              aria-label="applyOption"
              name="applyOption"
              value={applyOption}
              onChange={handleApplyOptionChange}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <FormControlLabel
                value="page"
                control={<Radio />}
                label="Apply for this page"
              />
              <FormControlLabel
                value="document"
                control={<Radio />}
                label="Apply for entire document"
              />
              <FormControlLabel
                value="range"
                control={<Radio />}
                label="Apply for page range"
              />
            </RadioGroup>
            {applyOption === "range" && (
              <TextField
                size="small"
                sx={{
                  width: "100px",
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                }}
                id="pageRange"
                placeholder="00 - 00"
                value={pageRange}
                onChange={handlePageRangeChange}
              />
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: "max-content",
                gap: "10px",
                marginInline: "auto",
                marginTop: "10px",
              }}
            >
              <Button
                sx={{
                  width: "50%",
                  paddingInline: "30px",
                  color: "#3153CD",
                  textTransform: "none",
                  borderColor: "#3153CD",
                  borderRadius: "10px",
                }}
                variant="outlined"
                onClick={handleNestedClose}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  width: "50%",
                  paddingInline: "30px",
                  textTransform: "none",
                  borderRadius: "10px",
                  background:
                    "linear-gradient(95.67deg, #4776E6 0%, #7B54E9 95.18%)",
                }}
                variant="contained"
                onClick={handleUploadPDF}
              >
                Apply
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AutoRenameModal;
