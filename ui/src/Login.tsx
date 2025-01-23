// import "./styles/Login1.css"
// import "./styles/main_style.css"
import logo from "./assets/logo.png"
import {BASE_URL} from "./Utils/Authenticated"

async function submit_login_details(formdata:HTMLFormElement)
{
    try {
        const API_URL = BASE_URL;
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
    } catch (err: any) {
        // setError(err.message);
        alert(err.message);
    }
}


function Login1()
{
    const handle_submit = (e:React.FormEvent) => 
        {
            e.preventDefault();
            submit_login_details(e.target as HTMLFormElement);
        };

    return (
        <div className="wrapper">
        <form onSubmit={handle_submit}>
            <div className="content">
                <div className="container-fluid">        
                    <div className="row">
                        <div className="col-md-4 mx-auto mt-5">
                            <div className="card login_section">
                                <div className="card-header">
                                    <div className="card-title text-center">
                                        <img src={logo} width="70" height="70" alt="" />
                                        <h4 style={{color: "#16a2b3", fontWeight: "600" }}>Nephro Care India Ltd</h4>
                                        <p>Data Analysis</p>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="email">Phone Number <span style={{color: '#F00'}}>*</span> </label>
                                        <input type="text" className="form-control" name="username" placeholder="Enter Phone Number" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password <span style={{color: '#F00'}}>*</span></label>
                                        <input type="password" className="form-control" name="password" placeholder="Password" />
                                    </div>
                                </div>
                                <div className="card-action text-center">
                                    <button className="btn btn-success custom_login">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        </div>
    );
}

export default Login1;