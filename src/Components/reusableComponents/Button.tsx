import { Button } from "@mui/material"
import React from "react";

interface DocumentModalProps {
    handleClick: any;
    title: string
}

const ButtonGradient: React.FC<DocumentModalProps> = ({ handleClick, title }) => {
    return (
        <Button
            onClick={handleClick}
            sx={{
                color: "white",
                paddingInline: "30px",
                textTransform: "none",
                borderRadius: "10px",
                background: "linear-gradient(95.67deg, #4776E6 0%, #7B54E9 95.18%)",
            }}
        >
            {title}
        </Button>
    )
}

export default ButtonGradient
