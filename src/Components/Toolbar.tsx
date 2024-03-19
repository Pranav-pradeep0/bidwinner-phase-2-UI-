import { Box, Button, IconButton, styled } from "@mui/material";
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
import { useState } from "react";

type IconProps = {
  weight?: "fill" | "regular";
  fill?: string;
};

type IconData = {
  name: string;
  icon: any;
};

const StyledIconButton = styled(IconButton)(() => ({
  color: "Black",
  "&:hover": {
    color: "#3153CD",
  },
}));

const iconData: IconData[] = [
  { name: "Hand", icon: Hand },
  { name: "Cursor", icon: Cursor },
  { name: "SelectionAll", icon: SelectionAll },
  { name: "Return", icon: ArrowCounterClockwise },
  { name: "Copy", icon: CopySimple },
  { name: "Cloud", icon: Cloud },
  { name: "Text", icon: TextT },
  { name: "Stamp", icon: Stamp },
  { name: "Ruler", icon: Ruler },
  { name: "LineSegment", icon: LineSegment },
  { name: "Circle", icon: HighlighterCircle },
  { name: "Note", icon: Note },
  { name: "Calendar", icon: CalendarCheck },
  { name: "ArrowsOut", icon: ArrowsOut },
  { name: "Frame", icon: FrameCorners },
  { name: "Grid", icon: GridNine },
  { name: "PIP", icon: PictureInPicture },
  { name: "Fader", icon: Faders },
];

const Toolbar = () => {
  const [selectedTool, setSelectedTool] = useState("Cursor");

  const onToolSelect = (tool: any) => {
    setSelectedTool(selectedTool === tool ? null : tool);
  };

  const setToolProperty = (tool: any): IconProps => ({
    weight: selectedTool === tool ? "fill" : "regular",
    fill: selectedTool === tool ? "#3153CD" : "inherit",
  });

  return (
    <Box
      sx={{
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
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
        {iconData?.map(({ name, icon: Icon }) => (
          <StyledIconButton onClick={() => onToolSelect(name)}>
            <Icon {...setToolProperty(name)} />
          </StyledIconButton>
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
