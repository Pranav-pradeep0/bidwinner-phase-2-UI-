import { ReactNode, useState } from "react";
import Drawing from "../../assets/SECURITY.png";
import { Box, Button, MenuItem, Select } from "@mui/material";
import {
  CaretLeft,
  CaretRight,
  FileArrowDown,
  ShareNetwork,
} from "@phosphor-icons/react";
import ImageZoomcomponent from "../ImageZoomcomponent";
import Toolbar from "../Toolbar";

const styles = {
  container: { width: "100%", height: "100%" },
  toolNavbar: {
    width: "calc(100% - 24px)",
    height: "40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    position: "sticky",
    top: "0",
    left: "0",
    backgroundColor: "white",
    padding: "8px 12px",
  },
  arrowBox: {
    width: "36px",
    height: "36px",
    border: "1px solid #cccccc",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
};

const GrayBox = ({ children }: { children: ReactNode }) => {
  return <div style={styles.arrowBox}>{children}</div>;
};

const TakeoffMainPage = () => {
  const [toolMethods, setToolMethod] = useState({
    pan: false,
    select: false,
    dot: false,
  });

  const [rectCoordinates, setRectCoordinates] = useState({});
  console.log(rectCoordinates);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.toolNavbar}>
        <Box sx={{ display: "flex", gap: "15px" }}>
          <GrayBox>
            <CaretLeft size={23} />
          </GrayBox>
          <Select
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                {
                  padding: "6px 10px !important",
                  width: "400px",
                  height: "26px",
                },
            }}
          >
            <MenuItem value={10}>First floor guest room drawing.pdf</MenuItem>
            <MenuItem value={20}>Fourth floor guest room drawing.pdf</MenuItem>
            <MenuItem value={30}>Fifth floor guest room drawing.pdf</MenuItem>
          </Select>
          <GrayBox>
            <CaretRight size={23} />
          </GrayBox>
          <Button
            color="primary"
            variant="contained"
            sx={{
              "&.MuiButton-contained": {
                boxShadow: "none !important",
                borderRadius: "5px",
              },
              backgroundColor: "#3153CD",
              ":hover": {
                backgroundColor: "#3153CD",
              },
            }}
          >
            Compare
          </Button>
          <GrayBox>
            <ShareNetwork size={23} />
          </GrayBox>
          <GrayBox>
            <FileArrowDown size={23} />
          </GrayBox>
        </Box>
        <Box>
          <Select
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                {
                  padding: "6px 10px !important",
                  width: "250px",
                  height: "26px",
                  color: "#3153CD",
                },
            }}
          >
            <MenuItem value={10}>Drawing Scale 1:80</MenuItem>
            <MenuItem value={20}>Drawing Scale 1:100</MenuItem>
            <MenuItem value={30}>Drawing Scale 1:200</MenuItem>
          </Select>
        </Box>
      </Box>
      <ImageZoomcomponent
        src={Drawing}
        setRectCoordinates={setRectCoordinates}
        toolMethods={toolMethods}
      />
      <Toolbar setToolMethod={setToolMethod} />
    </Box>
  );
};

export default TakeoffMainPage;
