import React, { forwardRef } from "react";
import TextField from "@material-ui/core/TextField";
import { Select, MenuItem, Checkbox, FormControlLabel, FormGroup, FormControl, FormLabel, Radio, RadioGroup } from "@material-ui/core";

export const InputSelect = forwardRef((props, ref) => {
    return (
       
        <FormControl component="fieldset">
        <FormLabel component="legend">Types</FormLabel>
        <RadioGroup
          name="types"          
          aria-label="types"
        >
          <FormControlLabel inputRef={ref} value="Plat" control={<Radio />} label="Plat" />
          <FormControlLabel inputRef={ref} value="Dessert" control={<Radio />} label="Dessert" />
          <FormControlLabel inputRef={ref} value="Boisson" control={<Radio />} label="Boisson" />
        </RadioGroup>
      </FormControl>
    );
});