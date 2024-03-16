import React from "react";
import {
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

interface ColorOptionProps {
  color: string;
}

const ColorOption: React.FC<ColorOptionProps> = ({ color = "red" }) => (
  <div
    style={{
      width: "20px",
      height: "20px",
      backgroundColor: color,
      borderRadius: "50%",
    }}
  />
);

interface ShapeOptionProps {
  shape: string;
}

const ShapeOption: React.FC<ShapeOptionProps> = ({ shape = "square" }) => (
  <div
    style={{
      width: "20px",
      height: "20px",
      backgroundColor: "lightgray",
      borderRadius: shape === "circle" ? "50%" : "0",
    }}
  />
);

interface SizeOptionProps {
  value: number;
}

const SizeOption: React.FC<SizeOptionProps> = ({ value }) => (
  <Typography>{value}</Typography>
);

const OverviewTab: React.FC = () => {

  return (
    <Box sx={{ paddingInline: "30px" }}>
      <Box sx={{ display: "grid", gap: "8px" }}>
        <Typography>Display Name</Typography>
        <TextField fullWidth size="small" sx={{ borderRadius: "12px" }} />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          gap: "20px",
          marginTop: "10px",
        }}
      >
        <Box sx={{ flexGrow: 1, display: "grid", gap: "10px" }}>
          <Box sx={{ display: "grid", gap: "8px" }}>
            <Typography>Quantity Type</Typography>
            <Select
              fullWidth
              size="small"
              labelId="quantity-type-label"
              id="quantity-type"
              defaultValue="length"
            >
              <MenuItem value="length">Length</MenuItem>
              <MenuItem value="breadth">Breadth</MenuItem>
              <MenuItem value="height">Height</MenuItem>
            </Select>
          </Box>

          <Box sx={{ display: "grid", gap: "8px" }}>
            <Typography>Display Shape</Typography>
            <Select
              fullWidth
              size="small"
              labelId="demo-simple-select-label-shape"
              id="demo-simple-select-shape"
              defaultValue="square"
              renderValue={(selected: string) => (
                <ShapeOption shape={selected} />
              )}
            >
              <MenuItem value="square">Square</MenuItem>
              <MenuItem value="circle">Circle</MenuItem>
            </Select>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1, display: "grid", gap: "10px" }}>
          <Box sx={{ display: "grid", gap: "8px" }}>
            <Typography>Display Colour</Typography>
            <Select
              fullWidth
              size="small"
              labelId="demo-simple-select-label-color"
              id="demo-simple-select-color"
              defaultValue="red"
              renderValue={(selected: string) => (
                <ColorOption color={selected} />
              )}
            >
              <MenuItem value="red">Red</MenuItem>
              <MenuItem value="green">Green</MenuItem>
              <MenuItem value="orange">Orange</MenuItem>
              <MenuItem value="blue">Blue</MenuItem>
            </Select>
          </Box>

          <Box sx={{ display: "grid", gap: "8px" }}>
            <Typography>Display Size</Typography>
            <Select
              fullWidth
              size="small"
              labelId="demo-simple-select-label-size"
              id="demo-simple-select-size"
              defaultValue={1}
              renderValue={(selected: number) => (
                <SizeOption value={selected} />
              )}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </Box>
        </Box>
      </Box>

      <Box>
        <Box sx={{ display: "grid", gap: "8px", marginTop: "10px" }}>
          <Typography>Selected Assembly</Typography>
          <Select
            fullWidth
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Box>
      </Box>

      
    </Box>
  );
};

export default OverviewTab;
