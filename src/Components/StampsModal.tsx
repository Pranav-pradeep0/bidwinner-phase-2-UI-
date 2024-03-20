import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Modal,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import {
  ArrowCircleUpRight,
  ArrowsOutSimple,
  Article,
  Bank,
  Check,
  CheckCircle,
  Circle,
  Clock,
  HandPointing,
  Hexagon,
  Hourglass,
  Info,
  Lightbulb,
  MagnifyingGlass,
  Square,
  StopCircle,
  TagChevron,
  TagSimple,
  TrashSimple,
  Triangle,
  UserCircle,
  UserSquare,
  Wallet,
  Warning,
  WheelchairMotion,
  X,
} from "@phosphor-icons/react";
import { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  paddingBlock: "20px",
  borderRadius: "10px",
};

const iconSets = [
  {
    label: "Shapes",
    icons: [
      { name: "Hexagon", icon: Hexagon },
      { name: "Pentagon", icon: "" },
      { name: "Outlined Square", icon: Square },
      { name: "Contained Square", icon: Square },
      { name: "Stop circle", icon: StopCircle },
      { name: "Circle", icon: Circle },
      { name: "Workspaces", icon: "" },
      { name: "Circle", icon: Circle },
    ],
  },
  {
    label: "Communications",
    icons: [
      { name: "Accessible forward", icon: WheelchairMotion },
      { name: "Add shopping cart", icon: "" },
      { name: "Bank", icon: Bank },
      { name: "Account", icon: UserSquare },
      { name: "Account balance wallet", icon: Wallet },
      { name: "Account circle", icon: UserCircle },
      { name: "Account circle", icon: "" },
      { name: "Article", icon: Article },
      { name: "Query builder", icon: Clock },
      { name: "Check circle outline", icon: CheckCircle },
      { name: "Outbond", icon: ArrowCircleUpRight },
      { name: "Circle notifications", icon: "" },
      { name: "Info", icon: Info },
      { name: "Pan tool alt", icon: HandPointing },
      { name: "Change history", icon: Triangle },
      { name: "Report problem", icon: "" },
      { name: "Hourglass empty", icon: Hourglass },
      { name: "Label", icon: TagSimple },
      { name: "Offline bolt", icon: "" },
      { name: "Lightbulb", icon: Lightbulb },
      { name: "Offline pin", icon: "" },
      { name: "Pending", icon: "" },
      { name: "Next plan", icon: "" },
      { name: "Open in new", icon: "" },
    ],
  },
  {
    label: "Electrical",
    icons: [
      { name: "Report problem", icon: Warning },
      { name: "Delete", icon: TrashSimple },
      { name: "Done", icon: Check },
      { name: "Play for work", icon: "" },
      { name: "Label important outline", icon: TagChevron },
      { name: "Segment", icon: "" },
      { name: "Label outline", icon: TagSimple },
      { name: "Open in full", icon: ArrowsOutSimple },
    ],
  },
];

const StampsModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
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
              alignItems: "center",
              justifyContent: "space-between",
              paddingInline: "20px",
            }}
          >
            <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
              Stamps
            </Typography>

            <Box sx={{ display: "flex", gap: "5px" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#F2F6F9",
                  borderRadius: "8px",
                }}
              >
                <IconButton aria-label="search" disabled>
                  <MagnifyingGlass />
                </IconButton>
                <InputBase
                  placeholder="Search Document"
                  style={{
                    color: "inherit",
                    width: "100%",
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </Box>

              <IconButton color="inherit" onClick={handleClose}>
                <X size={26} />
              </IconButton>
            </Box>
          </Box>
          <Divider sx={{ paddingBlock: "5px" }} />

          <Box
            sx={{
              overflow: "auto",
              padding: "20px",
              display: "grid",
              gap: "20px",
            }}
          >
            {iconSets?.map((iconSet, index) => (
              <Box key={index} sx={{ display: "grid", gap: "5px" }}>
                <Typography
                  sx={{
                    color: "#3153CD",
                    fontSize: "14px",
                  }}
                >
                  {iconSet.label}
                </Typography>
                <Box>
                  {iconSet?.icons?.map(
                    ({ name, icon: Icon }, i) =>
                      typeof Icon != "string" && (
                        <Tooltip
                          TransitionComponent={Zoom}
                          placement="top"
                          title={name}
                          slotProps={{
                            popper: {
                              modifiers: [
                                {
                                  name: "offset",
                                  options: {
                                    offset: [0, -10],
                                  },
                                },
                              ],
                            },
                          }}
                        >
                          <IconButton color="inherit" key={i}>
                            <Icon size={28} />
                          </IconButton>
                        </Tooltip>
                      )
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default StampsModal;
