import './styles/Login.css'

async function log(formdata:HTMLFormElement)
{
    try {
        const API_URL = "http://localhost:5000";
        const formData = new FormData(formdata);
        const username = formData.get('username');
        const password = formData.get('password');

        const response = await fetch( API_URL + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        console.log(data)
        localStorage.setItem('jwt_token', data.access_token);
        window.location.href = '/';
    } catch (err) {
        // setError(err.message);
        console.log(err)
    }
}

function Login() {

    const handleSubmit = (e: React.FormEvent) => 
    {
        e.preventDefault();
        log(e.target as HTMLFormElement);
    };

    return (
        <div className="login_panel">
            <form onSubmit={handleSubmit} className="login_form">
                <div className="form_group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div className="form_group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit" className="login_button">Login</button>
            </form>
        </div>
    );
}

export default Login;