import * as React from "react";
import Box from "@mui/material/Box";
import { Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "10px",
  width:"900px"
};

export function CustomiseModal({
  open,
  onClose,
  children,
}) {
  return (
    <Modal
      aria-describedby="modal-modal-description"
      aria-labelledby="modal-modal-title"
      onClose={onClose}
      open={open}>
      <Box sx={style}>{children}</Box>
    </Modal>
  );
}
