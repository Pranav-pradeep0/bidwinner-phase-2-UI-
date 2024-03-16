import { Box, Typography } from "@mui/material";

const Drawings = () => {
  return (
    <Box>
      <Typography sx={{ marginBottom: "10px" }}>
        Drawings containing assembly
      </Typography>
      <Box
        sx={{
          height: "380px",
          overflow: "auto",
          scrollBehavior: "smooth",
          paddingRight: "5px",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: "#F2F6F9",
            borderRadius: "11px",
          }}
        >
          <Typography
            sx={{
              paddingBlock: "25px",
              paddingInline: "25px",
            }}
          >
            Fourth floor guest room drawing.pdf
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Drawings;
