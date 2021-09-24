import React, { forwardRef } from "react";
import TextField from "@material-ui/core/TextField";

export const InputTextArea = forwardRef((props, ref) => {
    return (
        <TextField    
            multiline
            minRows={4}
            maxRows={10}       
            variant="outlined"
            margin="normal"
            inputRef={ref}
            fullWidth
            {...props}
        />
    );
});