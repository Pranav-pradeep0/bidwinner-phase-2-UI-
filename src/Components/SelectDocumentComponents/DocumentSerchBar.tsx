import { Box, IconButton, InputBase } from "@mui/material";
import { MagnifyingGlass } from "@phosphor-icons/react";

const DocumentSerchBar = () => {
  return (
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
  );
};

export default DocumentSerchBar;
