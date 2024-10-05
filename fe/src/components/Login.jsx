import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import styled from 'styled-components';
import Navbar from './NavBar';
import { useAuth } from '../context/AuthContext';

axios.defaults.baseURL = 'http://localhost:5002';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f7f7;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 15px;
`;

const AccountText = styled.p`
  text-align: center;
  margin-top: 10px;
`;

const RegisterLink = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
  margin-top: 10px;
  &:hover {
    color: #0056b3;
  }
`;

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    // console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/login', { email, password });
            // localStorage.setItem('token', res.data.token);
            login({ email }, res.data.token);
            navigate('/threads');
        } catch (err) {
            setError(err.response.data.msg || 'Invalid email or password');
        }
    };

    const handleGoogleLoginSuccess = async (response) => {
        try {
            const { credential } = response;
            const res = await axios.post('/api/auth/google-login', { idToken: credential });
            debugger
            console.log("email: res.data.user.email }, res.data.token = ", res.data.user.email, res.data.token)
            login({ email: res.data.user.email, token: res.data.token });
            navigate('/threads');
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setError('This email is already registered. Please login instead.');
            } else {
                console.log("err.response?.data?.msg ", err.response?.data?.msg)
                setError(err.response?.data?.msg || 'Error during Google login');
            }
        }
    };

    const handleGoogleLoginFailure = (response) => {
        console.log("erorro during login, response = ", response)
        setError('Google login failed. Please try again.');
    };

    return (
        <> <Navbar />
            <GoogleOAuthProvider clientId="155518430596-lgh9d0eu2nfrhedur1khh6oct07tc550.apps.googleusercontent.com">
                <LoginContainer LoginContainer >
                    <LoginForm onSubmit={handleLogin}>
                        <Title>Login</Title>
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button type="submit">Login</Button>
                    </LoginForm>
                    <AccountText>

                        Don't have an account?
                        <a href='/registration' >
                            Register
                        </a>
                    </AccountText>

                    <div style={{ marginTop: '20px' }}>
                        <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={handleGoogleLoginFailure}
                        />
                    </div>
                </LoginContainer >
            </GoogleOAuthProvider >
        </>
    );
}

export default Login;
