import React from "react";
import "./index.css";
import { Box, Grid, Modal, Typography } from "@mui/material";
import { ReactComponent as Cross } from "../../assets/icons/Union.svg";

interface ConfirmationModalType {
  isModalVisible: boolean;
  onClose: any;
}

const ConfirmationModal: React.FC<ConfirmationModalType> = (props) => {
  return (
    <Modal
      open={props.isModalVisible}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box className="modal-styles">
        <Grid container spacing={2}>
          <Grid xs={12}>
            <div className="close-icon">
              {" "}
              <Cross height={15} width={15} onClick={props.onClose} />
            </div>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={8}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className="modal-heading"
            >
              Success
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              className="modal-content"
            >
              We'll contact you soon. Check your inbox and spam folder within 24
              hours.
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              className="modal-content"
            >
              {" "}
              If no email received, please contact us directly.
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              className="modal-content"
            >
              We appreciate your interest and look forward to connecting with
              you soon.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
export default ConfirmationModal;
