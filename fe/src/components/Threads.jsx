import React from 'react';

const Threads = () => {

    const getThreads = async (response) => {
        try {
            const { credential } = response;
            const res = await axios.post('/api/auth/google-login', { idToken: credential });

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

    return (
        <div>

            <Thread />
            <Chat />
        </div>
    );
};

export default Threads;

