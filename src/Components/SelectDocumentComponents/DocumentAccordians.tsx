import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { CaretDown, FolderNotch } from "@phosphor-icons/react";

import Drawing1 from "../../assets/SECURITY.png"
import Drawing2 from "../../assets/SECURITY2.png"
import Drawing3 from "../../assets/FLOOR.png"
import { useState } from "react";
// import { useState } from "react";

interface dataProps {
  title: string;
  items: any
}

const data: dataProps[] = [
  {
    title: "Al Hasan Building Drawing Electrical Estimation Document.pdf",
    items: [{ title: "Page No 1", url: Drawing1 }, { title: "Page No 2", url: Drawing2 }, { title: "Page No 3", url: Drawing3 }],
  },
  {
    title: "Al Jaseera Appartment Drawing Electrical Estimation Document.pdf",
    items: [{ title: "Page No 1", url: Drawing1 }, { title: "Page No 2", url: Drawing2 }, { title: "Page No 3", url: Drawing3 }],
  },
];

// const [expanded,setExpanded]=useState(false)
interface DocumentModalProps {
  setImgURL: any
}
const DocumentAccordians: React.FC<DocumentModalProps> = ({ setImgURL }) => {
  const [title, setTitle] = useState("")

  const handleClickTitle = (title: string, url: string) => {
    setImgURL(url)
    setTitle(title)
  }
  return (
    <Box>
      {data?.map((data, ind) => (
        <Accordion
          // expanded={expanded === 'panel1'}
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
            {data?.items?.map((items: any, ind: number) => (
              <Box key={ind}
              sx={{ padding: "10px 5px", marginBottom: "5px" , cursor: "pointer" , backgroundColor: title === items.title ? "#f2f6f9" : "", ':hover': { backgroundColor: "#f2f6f9" } }}
                onClick={() => handleClickTitle(items.title, items.url)} >
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
