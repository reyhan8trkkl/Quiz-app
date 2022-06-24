import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { handleScoreChange, handleAmountChange } from "../redux/actions";

const FinalScreen = () => {
  const { score } = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleBack = () => {
    dispatch(handleScoreChange(0));
    dispatch(handleAmountChange(10));
    history.push("/");
  };

  return (
    <Box mt={25} width="100%">
      <Typography variant="h3" fontWeight="bold" mb={8}>
        Final Score: {score}
      </Typography>
      <Button
        fullWidth
        variant="outlined"
        color="secondary"
        onClick={handleBack}
      >
        Play Again!
      </Button>
    </Box>
  );
};

export default FinalScreen;
