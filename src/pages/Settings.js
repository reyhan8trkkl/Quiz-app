import { Box } from "@mui/system";
import SelectField from "../components/SelectField";
import Button from "@mui/material/Button";
import TextFieldCom from "../components/TextFieldCom";
import useAxios from "../hooks/useAxios";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";

const Settings = () => {
  const { response, error, loading } = useAxios({
    url: "/api_category.php",
  });

  const history = useHistory();

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Typography variant="h5" mt={20} color="gray">
        Oops! Some went Wrong
      </Typography>
    );
  }

  const difficultyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  const typeOptions = [
    { id: "multiple", name: "Multiple Choise" },
    { id: "boolean", name: "True/False" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/questions");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "70px" }}>
      <SelectField options={response.trivia_categories} label="Category" />
      <SelectField options={difficultyOptions} label="Difficulty" />
      <SelectField options={typeOptions} label="Type" />
      <TextFieldCom />
      <Box mt={3} width="100%">
        <Button fullWidth variant="outlined" color="secondary" type="submit">
          Get Started
        </Button>
      </Box>
    </form>
  );
};

export default Settings;
