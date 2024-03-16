import {
  Box,
  Button,
  Checkbox,
  Divider,
  Fade,
  FormControlLabel,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import DemoImage1 from "../assets/DemoImage1.png";
import DemoImage2 from "../assets/DemoImage2.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "490px ",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "12px",
};

interface Item {
  title: string;
  img: string;
}

const itemData = [
  {
    title: "Demo Title 1",
    img: DemoImage1,
  },
  {
    title: "Demo Title 2",
    img: DemoImage2,
  },
  {
    title: "Demo Title 3",
    img: DemoImage1,
  },
  {
    title: "Demo Title 4",
    img: DemoImage2,
  },
  {
    title: "Demo Title 5",
    img: DemoImage1,
  },
  {
    title: "Demo Title 6",
    img: DemoImage2,
  },
];

const DrawingScaleModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setShowImageList(false);
  };

  const [showImagelist, setShowImageList] = useState(false);

  const handleImageList = () => {
    setShowImageList(!showImagelist);
  };

  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const toggleSelectItem = (item: Item) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.some((selectedItem) => selectedItem === item)) {
        return prevSelected.filter((selectedItem) => selectedItem !== item);
      } else {
        return [...prevSelected, item];
      }
    });
  };

  const [editRatio, setEditRatio] = useState(false);
  const [selectedRatio, setSelectedRatio] = useState("1:200");

  const handleEditRatio = () => {
    setEditRatio(!editRatio);
  };

  const handleRatioChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedRatio(event.target.value as string);
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
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "max-content",
              alignItems: "center",
              marginInline: "auto",
              marginBlock: "20px",
              position: "relative",
              marginBottom: showImagelist ? 0 : "90px",
            }}
          >
            <Typography>Select Drawing Scale</Typography>
            {editRatio ? (
              <TextField
                size="small"
                variant="outlined"
                value={selectedRatio}
                onChange={(e) => setSelectedRatio(e.target.value)}
                onBlur={handleEditRatio}
                sx={{ width: "100px" }}
              />
            ) : (
              <Select
                size="small"
                value={selectedRatio}
                onChange={(e: any) => handleRatioChange(e)}
                inputProps={{ "aria-label": "Select" }}
                sx={{ width: "100px" }}
              >
                <MenuItem value="1:200">1:200</MenuItem>
                <MenuItem value="1:300">1:300</MenuItem>
                <MenuItem value="1:400">1:400</MenuItem>
              </Select>
            )}
            <Typography
              sx={{
                textDecoration: "underline",
                color: "#3153CD",
                cursor: "pointer",
              }}
              onClick={handleEditRatio}
            >
              Edit Ratio
            </Typography>
            <FormControlLabel
              control={<Checkbox onClick={handleImageList} />}
              label="Apply to multiple pages"
            />
          </Box>

          {/* {showImagelist && ( */}
          <Fade in={showImagelist} timeout={400}>
            <Box
              sx={{
                paddingBlock: "1px",
                backgroundColor: "#F3F3F3",
                borderBottomRightRadius: "12px",
                borderBottomLeftRadius: "12px",
                display: showImagelist ? "block" : "none",
              }}
            >
              <ImageList
                cols={3}
                sx={{
                  height: 300,
                  paddingInline: "10px",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#F3F3F3",
                  gap: "10px !important",
                }}
              >
                {itemData.map((item) => (
                  <ImageListItem
                    key={item.img}
                    onClick={() => toggleSelectItem(item)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <img
                      srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        border: selectedItems.includes(item)
                          ? "2px solid #3153CD"
                          : "2px solid transparent",
                        borderRadius: "8px",
                        position: "relative",
                      }}
                    />
                    {selectedItems.includes(item) && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "102%",
                          height: "78%",
                          backgroundColor: "rgba(49, 83, 205, 0.2)",
                          borderRadius: "8px",
                        }}
                      ></div>
                    )}
                    <ImageListItemBar
                      position="below"
                      title={item.title}
                      style={{
                        color: selectedItems.includes(item)
                          ? "#3153CD"
                          : "inherit",
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </Fade>
          {/* )} */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              position: "absolute",
              bottom: "25px",
              width: "100%",
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
                paddingBlock: "8px",
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "white",
                },
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
                paddingBlock: "8px",
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default DrawingScaleModal;
