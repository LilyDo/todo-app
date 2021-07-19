import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { login, hideLoginForm } from "../../slices/user";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user);
  const { isWrong, shouldShowLoginForm } = user;
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (shouldShowLoginForm && user.username) {
      dispatch(hideLoginForm());
    }
  });

  const signin = () => {
    dispatch(login({ username, password }));
    setUsername("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Dialog open={shouldShowLoginForm} aria-labelledby="form-dialog-title">
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isWrong && (
          <Typography color="secondary">
            Wrong username and/or password
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={signin}
        >
          Sign In
        </Button>
      </form>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0),
  },
}));
