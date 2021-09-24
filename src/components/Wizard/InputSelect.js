import React, { forwardRef } from "react";
import TextField from "@material-ui/core/TextField";
import { Select, MenuItem, Checkbox, FormControlLabel, FormGroup, FormControl, FormLabel, Radio, RadioGroup } from "@material-ui/core";

export const InputSelect = forwardRef((props, ref) => {
    return (
       
        <FormControl component="fieldset">
        <FormLabel component="legend">Types</FormLabel>
        <RadioGroup
          aria-label="types"       
         
        //   inputRef={ref}
        //   fullWidth
        //   {...props}
        >
          <FormControlLabel value="Plat" control={<Radio />} label="Plat" />
          <FormControlLabel value="Dessert" control={<Radio />} label="Dessert" />
          <FormControlLabel value="Boisson" control={<Radio />} label="Boisson" />
        </RadioGroup>
      </FormControl>
    );
});