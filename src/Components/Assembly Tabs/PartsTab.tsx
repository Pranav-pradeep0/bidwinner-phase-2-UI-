import { Box, Typography } from "@mui/material";
import { Pencil, Trash } from "@phosphor-icons/react";

interface dataProps {
  name: string;
  quantity: number;
  fct1: number;
  fct2: number;
  catalogueNo: string;
}

const data: dataProps[] = [
  {
    name: "4x1 1/2” SQ Box 1/2” KO",
    quantity: 10,
    fct1: 1,
    fct2: 2,
    catalogueNo: "AJK883KM",
  },
  {
    name: "4x1 1/2” SQ Box 1/2” KO",
    quantity: 10,
    fct1: 1,
    fct2: 2,
    catalogueNo: "AJK883KM",
  },
];

const PartsTab = () => {
  return (
    <Box
      sx={{
        overflow: "auto",
        height: "403px",
        scrollBehavior: "smooth",
        paddingInline: "5px",
        marginInline: "10px",
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
      {data?.map((data) => (
        <Box
          sx={{
            display: "grid",
            backgroundColor: "#F2F6F9",
            gap: "10px",
            paddingInline: "15px",
            paddingBlock: "12px",
            borderRadius: "11px",
            marginBottom: "10px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Typography>1.</Typography>
              <Typography sx={{ fontWeight: 600 }}>{data.name}</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Pencil style={{ cursor: "pointer" }} />
              <Trash style={{ cursor: "pointer" }} />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Typography sx={{ fontSize: "12px", color: "#808080" }}>
                Qty
              </Typography>
              <Typography
                sx={{ color: "black", fontSize: "16px", fontWeight: "400" }}
              >
                {data.quantity}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Typography sx={{ fontSize: "12px", color: "#808080" }}>
                Fct 1
              </Typography>
              <Typography
                sx={{ color: "black", fontSize: "16px", fontWeight: "400" }}
              >
                {data.fct1}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Typography sx={{ fontSize: "12px", color: "#808080" }}>
                Fct 2
              </Typography>
              <Typography
                sx={{ color: "black", fontSize: "16px", fontWeight: "400" }}
              >
                {data.fct2}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Typography sx={{ fontSize: "12px", color: "#808080" }}>
                Catalogue No
              </Typography>
              <Typography
                sx={{ color: "black", fontSize: "16px", fontWeight: "400" }}
              >
                {data.catalogueNo}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default PartsTab;
