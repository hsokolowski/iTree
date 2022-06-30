import { ArrowForwardIcon } from '@chakra-ui/icons';
import { InputGroup, Input, InputRightElement, Button, Flex } from '@chakra-ui/react';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

function Login({ children }) {
  const [user, setUser] = useState(null);

  function handleLogin(e) {
    console.log(e);
    setUser({ auth: e });
    if (e) return <Navigate to="/tree" replace={true} />;
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm login={handleLogin} />}></Route>
          <Route path="/login" element={<LoginForm login={handleLogin} />}></Route>
          <Route path="/tree" element={<ProtectedRoute user={user}>{children}</ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Login;

function LoginForm({ login }) {
  const [pswd, setPswd] = useState('');
  const [ready, setready] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handlePswd(e) {
    console.log(e);
    setPswd(e);
  }

  function getLogin() {
    console.log(process.env.REACT_APP_SERVER_URL);
    setIsLoading(true);
    Axios.post('http://localhost:5000/gate', {
      password: pswd,
    })
      .then(response => {
        console.log(response);
        login(response.data.auth);
        setready(response.data.auth);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div>
      <Flex alignItems={'center'} justifyContent={'center'} marginTop={100}>
        <PasswordInput handleChange={handlePswd} />
        <Button
          onClick={getLogin}
          isLoading={isLoading}
          rightIcon={<ArrowForwardIcon />}
          colorScheme="teal"
          variant="outline"
          marginRight={15}
        >
          Log in
        </Button>
        {ready ? <Link to="/tree"> Click here to go to the tool </Link> : <div></div>}
      </Flex>
    </div>
  );
}

function PasswordInput({ handleChange }) {
  const [show, setShow] = React.useState(false);
  const [p, setP] = React.useState('');
  const handleClick = () => setShow(!show);

  function changeText(e) {
    setP(e.target.value);
    handleChange(e.target.value);
  }

  return (
    <InputGroup size="md" width={400}>
      <Input
        onChange={changeText}
        pr="4.5rem"
        type={show ? 'text' : 'password'}
        placeholder="Enter password"
        value={p}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

const ProtectedRoute = ({ user, redirectPath = '/login', children }) => {
  console.log('USER', user);
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
