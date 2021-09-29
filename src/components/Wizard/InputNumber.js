import React, { forwardRef } from "react";
import TextField from "@material-ui/core/TextField";

export const InputNumber = forwardRef((props, ref) => {
    return (
        <TextField    
            id="outlined-number"
            label="Number"
            type="text"
            InputLabelProps={{
            shrink: true,
            }}
            inputRef={ref}
            fullWidth
            {...props}
        />
    );
});