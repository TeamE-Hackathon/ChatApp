import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import React from "react";

export const SendMessageButton = ({ onClick }) => {
  return (
    <Button onClick={onClick} variant="contained" endIcon={<SendIcon />}>
      Send
    </Button>
  );
};

SendMessageButton.propTypes = {
  onClick: PropTypes.string,
};
