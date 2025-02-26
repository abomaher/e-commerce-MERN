import { Alert } from "@mui/material";

interface AlertDialog {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  text: any;
  type: string; // success - info - warning - error
}

const AlertDialog = ({ text, type }: AlertDialog) => {



//   const onClose = () => {
    
//   };

  if (text) {
    return (
      <>
        {text && (
          <Alert
            sx={{
              display: "flex",
              position: "fixed",
              zIndex: 999,
              right: 0,
              top: 0,
              m: 2,
            }}
            variant="filled"
            severity={type}
            //onClose={onClose}
          >
            {text}
          </Alert>
        )}
      </>
    );
  }
};

export default AlertDialog;
