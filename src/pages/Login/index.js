import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Particles from 'react-particles-js';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import config from '../../utils/config';

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, rgba(24,24,24,1) 0%, rgba(17,36,62,1) 100%);
`
const LoginBox = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%,-50%);
  color: #FFF;
  width: 400px;
  max-width: 90%;
  padding: 2em 3em;
  background: rgba(255, 255, 255, 0.1);
  text-shadow: 0px 0px 2px #131415;
  font-family: 'Open Sans', sans-serif;
  text-align: center;
`

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: 20,
    width: 300,
  },
  textField: {
    marginTop: 12,
    width: 300,
  },
  cssLabel: {
    color : 'white'
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `white !important`,
    }
  },

  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'white !important'
  },
}));

const login = (values) => {
  axios.post(`${config.REACT_APP_BASE_URL}/sessions`,
  {
    "email": values.email,
    "password": values.password,
  }).then(function(response){
    localStorage.setItem('user-email', values.email);
    localStorage.setItem('user-token', response.data.token);
    window.location.reload();
  }).catch(function (error) {
    // console.log(error);
  });

}

const Login = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email:  '',
    password:  '',
  });

  const handleChange = normalize => event => {
    setValues({ ...values, [normalize]: event.target.value });
  };

  console.log(values);
  return (
    <Background>
      <LoginBox>
        <h1>Sign In</h1>
        <br/>
        <TextField
          id="outlined-input"
          label="Email"
          type="email"
          autoComplete="email"
          variant="outlined"
          className={classes.textField.toString()}
          value={values.email}
          onChange={handleChange('email')}
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            }
          }}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          className={classes.textField.toString()}
          value={values.password}
          onChange={handleChange('password')}
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
          }}
        />
        <Button
          id="save"
          variant="contained"
          color="primary"
          size="large"
          className={classes.button.toString()}
          startIcon={<ExitToAppIcon />}
          onClick={() => login(values)}
        >
          Login
        </Button>
      </LoginBox>

      <Particles
          params={{
            "particles": {
                "number": {
                    "value": 75
                },
                "size": {
                    "value": 2
                }
            },
            "interactivity": {
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    }
                }
            }
        }} />
    </Background>

  );
}


export default Login;
