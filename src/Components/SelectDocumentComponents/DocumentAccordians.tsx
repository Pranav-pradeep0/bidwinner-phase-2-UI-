import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { CaretDown, FolderNotch } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

// import Drawing1 from "../../assets/SECURITY.png";
// import Drawing2 from "../../assets/SECURITY2.png";
// import Drawing3 from "../../assets/FLOOR.png";
import axios from "axios";
import { API_TOKEN, BASE_URL } from "../../utils/environment";

interface dataProps {
  pdf_name: string;
  images: any;
  pdf_id: any;
}

interface DocumentModalProps {
  setImgURL: any;
  setPdfId: any;
}

const DocumentAccordians: React.FC<DocumentModalProps> = ({
  setImgURL,
  setPdfId,
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [title, setTitle] = useState("");
  const [data, setData] = useState<dataProps[]>([]);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      event;
      setExpanded(isExpanded ? panel : false);
      setTitle("");
    };

  const handleClickTitle = (title: string, url: string, pdfId: string) => {
    setImgURL(url);
    setTitle(title);
    setPdfId(pdfId);
  };

  const fetchData = async () => {
    console.log("abc");

    try {
      const response = await axios.post(`${BASE_URL}/list-pdf-details/`, {
        app_token: API_TOKEN,
      });
      console.log("response", response.data);
      setData(response.data);
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
              {data.pdf_name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {data.images.map((items: any, ind: number) => (
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
                onClick={() =>
                  handleClickTitle(
                    items.image_name,
                    items.thumbnail,
                    data.pdf_id
                  )
                }
              >
                {items.image_name}
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default DocumentAccordians;
