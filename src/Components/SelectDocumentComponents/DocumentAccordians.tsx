import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { CaretDown, FolderNotch } from "@phosphor-icons/react";
import axios from "axios";
import { useEffect } from "react";

interface dataProps {
  title: string;
  items: string[];
}

const data: dataProps[] = [
  {
    title: "Al Hasan Building Drawing Electrical Estimation Document.pdf",
    items: ["Page No 1", "Page No 2", "Page No 3", "Page No 4", "Page No 5"],
  },
];

const DocumentAccordians = () => {
  const fetchData = async () => {
    console.log("abc");

    try {
      const response = await axios.post(
        "http://64.227.165.222:8000/list-pdf-details/",
        { app_token: "wda1E2CphYPXTsELRe0D" }
      );
      console.log("response", response.data);
    } catch (error) {
      console.error("Error while fetching document details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      {data?.map((data, ind) => (
        <Accordion
          key={ind}
          sx={{
            marginTop: "20px",
            boxShadow: "none",
            "::before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary
            sx={{
              borderBottom: "rgba(0, 0, 0, 0.3) 1px solid",
            }}
            expandIcon={<CaretDown size={26} />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <FolderNotch size={22} />
            <Typography sx={{ fontWeight: 500, marginInline: "10px" }}>
              {data.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {data?.items?.map((items, ind) => (
              <Box
                key={ind}
                sx={{
                  padding: "10px 5px",
                  marginBottom: "5px",
                  cursor: "pointer",
                  ":hover": { backgroundColor: "#f2f6f9" },
                }}
              >
                {items}
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default DocumentAccordians;
