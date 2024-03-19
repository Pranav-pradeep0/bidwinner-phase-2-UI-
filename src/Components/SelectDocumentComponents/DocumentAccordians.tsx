import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { CaretDown, FolderNotch } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

import Drawing1 from "../../assets/SECURITY.png";
import Drawing2 from "../../assets/SECURITY2.png";
import Drawing3 from "../../assets/FLOOR.png";
import axios from "axios";

interface dataProps {
  title: string;
  items: any;
}

const data: dataProps[] = [
  {
    title: "Al Hasan Building Drawing Electrical Estimation Document.pdf",
    items: [
      { title: "Page No 1", url: Drawing1 },
      { title: "Page No 2", url: Drawing2 },
      { title: "Page No 3", url: Drawing3 },
    ],
  },
  {
    title: "Al Jaseera Appartment Drawing Electrical Estimation Document.pdf",
    items: [
      { title: "Page No 1", url: Drawing1 },
      { title: "Page No 2", url: Drawing2 },
      { title: "Page No 3", url: Drawing3 },
    ],
  },
];

interface DocumentModalProps {
  setImgURL: any;
}

const DocumentAccordians: React.FC<DocumentModalProps> = ({ setImgURL }) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [title, setTitle] = useState("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      event;
      setExpanded(isExpanded ? panel : false);
      setTitle("");
    };

  const handleClickTitle = (title: string, url: string) => {
    setImgURL(url);
    setTitle(title);
  };

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
      {data.map((data, ind) => (
        <Accordion
          key={ind}
          expanded={expanded === `panel${ind}`}
          onChange={handleChange(`panel${ind}`)}
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
            aria-controls={`panel${ind}-content`}
            id={`panel${ind}-header`}
          >
            <FolderNotch size={22} />
            <Typography sx={{ fontWeight: 500, marginInline: "10px" }}>
              {data.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {data.items.map((items: any, ind: number) => (
              <Box
                key={ind}
                sx={{
                  padding: "10px 5px",
                  marginBottom: "5px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  paddingInline: "20px",
                  backgroundColor: title === items.title ? "#E3F3FF" : "",
                  ":hover": { backgroundColor: "#E3F3FF" },
                }}
                onClick={() => handleClickTitle(items.title, items.url)}
              >
                {items.title}
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default DocumentAccordians;
