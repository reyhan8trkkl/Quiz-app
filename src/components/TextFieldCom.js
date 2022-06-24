import { Box } from "@mui/system";
import React from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { handleAmountChange } from "../redux/actions";

const TextFieldCom = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(handleAmountChange(e.target.value));
  };

  return (
    <Box mt={3} width="100%">
      <FormControl fullWidth>
        <TextField
          onChange={handleChange}
          variant="outlined"
          label="Amount of Questions"
          type="number"
          InputProps={{ inputProps: { min: 1 } }}
          size="small"
        ></TextField>
      </FormControl>
    </Box>
  );
};

export default TextFieldCom;
