import { Box, Button, IconButton, Tooltip, Zoom, styled } from "@mui/material";
import {
  ArrowCounterClockwise,
  ArrowsOut,
  CalendarCheck,
  Cloud,
  CopySimple,
  Cursor,
  Faders,
  FrameCorners,
  GridNine,
  Hand,
  HighlighterCircle,
  LineSegment,
  Note,
  PictureInPicture,
  Ruler,
  SelectionAll,
  Stamp,
  TextT,
  XCircle,
} from "@phosphor-icons/react";
import React, { useState } from "react";

type IconProps = {
  weight?: "fill" | "regular";
  fill?: string;
};

type IconData = {
  name: string;
  icon: any;
  type: any;
};

const StyledIconButton = styled(IconButton)(() => ({
  color: "Black",
  "&:hover": {
    color: "#3153CD",
  },
}));

const iconData: IconData[] = [
  { name: "Pan", icon: Hand, type: "pan" },
  { name: "Edit", icon: Cursor, type: "select" },
  { name: "Multi Select", icon: SelectionAll, type: "dot" },
  { name: "Undo", icon: ArrowCounterClockwise, type: "" },
  { name: "Duplicate DWG Area", icon: CopySimple, type: "" },
  { name: "Cloud Tool", icon: Cloud, type: "" },
  { name: "Annotations", icon: TextT, type: "" },
  { name: "Symbol Stamping", icon: Stamp, type: "" },
  { name: "Quick Measurement", icon: Ruler, type: "" },
  { name: "Line Tool", icon: LineSegment, type: "" },
  { name: "Circle", icon: HighlighterCircle, type: "" },
  { name: "Notes", icon: Note, type: "" },
  { name: "Calendar", icon: CalendarCheck, type: "" },
  { name: "ArrowsOut", icon: ArrowsOut, type: "" },
  { name: "Frame", icon: FrameCorners, type: "" },
  { name: "Grid", icon: GridNine, type: "" },
  { name: "PIP", icon: PictureInPicture, type: "" },
  { name: "Fader", icon: Faders, type: "" },
];

interface ToolbarProps {
  setToolMethod: any;
}

const Toolbar: React.FC<ToolbarProps> = ({ setToolMethod }) => {
  const [selectedTool, setSelectedTool] = useState("Cursor");

  const onToolSelect = (tool: any) => {
    setSelectedTool(selectedTool === tool ? null : tool);
  };

  const setToolProperty = (tool: any): IconProps => ({
    weight: selectedTool === tool ? "fill" : "regular",
    fill: selectedTool === tool ? "#3153CD" : "inherit",
  });

  const originalValues = { pan: false, select: false, dot: false };

  const handleChangeTools = (type: any) => {
    switch (type) {
      case "pan":
        setToolMethod(() => {
          const updatedState: any = { ...originalValues }; // Reset all tools
          updatedState[type] = true; // Set the specified tool to true
          return updatedState;
        });
        break;
      case "select":
        setToolMethod(() => {
          const updatedState: any = { ...originalValues }; // Reset all tools
          updatedState[type] = true; // Set the specified tool to true
          return updatedState;
        });
        break;
      case "dot":
        setToolMethod(() => {
          const updatedState: any = { ...originalValues }; // Reset all tools
          updatedState[type] = true; // Set the specified tool to true
          return updatedState;
        });
        break;
      default:
        break;
    }
  };

  return (
    <Box
      sx={{
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        width: "max-content",
        position: "fixed",
        left: "50%",
        bottom: "100px",
        background: "white",
        transform: "translate(-50%,0)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "5px",
          padding: "10px 20px",
          borderRadius: "10px",
          position: "relative",
          zIndex: 1,
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          border: "rgba(0, 0, 0, 0.1) 1px solid",
        }}
      >
        {iconData?.map(({ name, icon: Icon, type }) => (
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
            <StyledIconButton onClick={() => onToolSelect(name)} key={name}>
              <Icon
                {...setToolProperty(name)}
                onClick={() => handleChangeTools(type)}
              />
            </StyledIconButton>
          </Tooltip>
        ))}
        <Box
          sx={{
            display: "flex",
            width: "45px",
            position: "absolute",
            left: 10,
            top: -47,
            height: "45px",
            borderRadius: "24px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
            border: "rgba(0, 0, 0, 0.1) 1px solid",
            borderBottom: "none",
            // boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Button
            color="inherit"
            sx={{
              padding: 0,
              margin: 0,
              minWidth: "45px",
              borderRadius: "24px",
              borderBottomLeftRadius: "0px",
              borderBottomRightRadius: "0px",
            }}
          >
            <XCircle color="rgba(0, 0, 0, .8)" size={23} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Toolbar;
