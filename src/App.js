import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Settings from "./pages/Settings";
import Questions from "./pages/Questions";
import FinalScreen from "./pages/FinalScreen";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";

function App() {
  return (
    <Router>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={7}>
          <Switch>
            <Route exact path="/">
              <Typography variant="h2" fontWeight="bold">
                Quiz App
              </Typography>
              <Settings />
            </Route>
            <Route path="/questions">
              <Questions />
            </Route>
            <Route path="/score">
              <FinalScreen />
            </Route>
          </Switch>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
