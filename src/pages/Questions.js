import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useAxios from "../hooks/useAxios";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { handleScoreChange } from "../redux/actions";
import { decode } from "html-entities";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Questions = () => {
  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_questions,
    score,
  } = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();
  let apiUrl = `/api.php?amount=${amount_of_questions}`;
  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`);
  }
  if (question_difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
  }
  if (question_type) {
    apiUrl = apiUrl.concat(`&type=${question_type}`);
  }

  const { response, loading } = useAxios({ url: apiUrl });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
    }
  }, [response, questionIndex]);

  if (loading) {
    return (
      <Box mt={30}>
        <CircularProgress />
      </Box>
    );
  }

  const handleClickAnswer = (e) => {
    const question = response.results[questionIndex];
    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 1));
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      history.push("/score");
    }
  };

  return (
    <Box mt={8}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Raleway",
          color: "#ab47bc",
        }}
      >
        Question {questionIndex + 1}
      </Typography>
      <Typography
        mt={8}
        mb={5}
        sx={{
          fontSize: "18px",
        }}
      >
        {decode(response.results[questionIndex].question)}
      </Typography>
      {options.map((data, id) => (
        <Box mt={3} width="100%" key={id}>
          <Button
            onClick={handleClickAnswer}
            fullWidth
            variant="outlined"
            color="secondary"
          >
            {decode(data)}
          </Button>
        </Box>
      ))}
      <Box
        mt={5}
        width="100%"
        sx={{
          fontFamily: "Segoe UI",
          fontWeight: "bold",
          fontSize: "16px",
          backgroundColor: "#bdbdbd",
          color: "white",
          p: 1,
          border: "white",
          borderRadius: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Score:{score}/{response.results.length}
      </Box>
    </Box>
  );
};

export default Questions;
