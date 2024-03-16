import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Tab,
  Typography,
} from "@mui/material";
import { DotsThreeVertical, X } from "@phosphor-icons/react";
import { useState } from "react";
import OverviewTab from "./Assembly Tabs/OverviewTab";
import PartsTab from "./Assembly Tabs/PartsTab";
import Drawings from "./Assembly Tabs/Drawings";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "530px",
  bgcolor: "background.paper",
  boxShadow: 24,
  height: "620px",
  borderRadius: "12px",
};

const AssemblyInfoModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setAnchorEl(null)
  };

  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    event;
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
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
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: "24px",
                paddingBlock: "20px  ",
              }}
            >
              Assembly Info
            </Box>
            <IconButton sx={{ position: "absolute", right: 5, top: 15 }} onClick={handleClose}>
              <X size={30} />
            </IconButton>
          </Box>

          <Box
            sx={{
              position: "absolute",
              width: "100%",
              left: 0,
              bottom: 0,
              height: "65px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#E3F3FF",
              borderBottomLeftRadius: "12px",
              borderBottomRightRadius: "12px",
            }}
          >
            <Box
              sx={{
                paddingInline: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexGrow: 1,
              }}
            >
              <Box>
                <Typography>
                  Quantity Entered :{" "}
                  <span style={{ fontWeight: "700", color: "#3153CD" }}>
                    10
                  </span>
                </Typography>
              </Box>
              <Box>
                <Button
                  id="basic-button"
                  aria-controls={menuOpen ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={menuOpen ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ color: "black", fontSize: "13.5px" }}
                >
                  More Options
                  <DotsThreeVertical size={20} />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Option 3</MenuItem>
                </Menu>
              </Box>
            </Box>
          </Box>

          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box
                sx={{
                  borderRadius: "50px",
                  boxShadow: "0px 2px 9px 0px rgba(0, 0, 0, 0.15) inset",
                  width: "max-content",
                  marginInline: "auto",
                  "& .MuiTabs-indicator": {
                    height: "100%",
                    backgroundColor: "#3153CD",
                  },
                }}
              >
                <TabList
                  onChange={handleChange}
                  sx={{
                    borderRadius: "50px",
                    border: "none",
                  }}
                >
                  <Tab
                    sx={{
                      color: value === "1" ? "white !important" : "black",
                      zIndex: 1,
                      textTransform: "none",
                      fontSize: "18px",
                      paddingInline: "35px",
                    }}
                    label="Overview"
                    value="1"
                  />
                  <Tab
                    sx={{
                      color: value === "2" ? "white !important" : "black",
                      zIndex: 1,
                      textTransform: "none",
                      fontSize: "18px",
                      paddingInline: "35px",
                    }}
                    label="Parts"
                    value="2"
                  />
                  <Tab
                    sx={{
                      color: value === "3" ? "white !important" : "black",
                      zIndex: 1,
                      textTransform: "none",
                      fontSize: "18px",
                      paddingBlock: "15px",
                      paddingInline: "35px",
                    }}
                    label="Drawings"
                    value="3"
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <OverviewTab />
              </TabPanel>
              <TabPanel value="2">
                <PartsTab />
              </TabPanel>
              <TabPanel value="3">
                <Drawings/>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AssemblyInfoModal;
