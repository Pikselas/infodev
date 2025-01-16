import React from "react"
interface LoggedInProps
{
    children: React.ReactNode;
}

function get_jwt_token() {
    const token = localStorage.getItem('jwt_token');
    return token ? token : null;
}

const LoggedIn:React.FC<LoggedInProps> = ({children}:LoggedInProps) =>
{
    let token = get_jwt_token();
    if(token != null)
        return children;
    return <></>;
};

const NotLoggedIn:React.FC<LoggedInProps> = ({children}:LoggedInProps) =>
{
    if(get_jwt_token() == null)
        return children;
    return <></>;
}

function create_api_request(path:string , body?:any)
{
    return fetch(path , 
        {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${get_jwt_token()}`
            },
            body:JSON.stringify(body)
        })
}

export {LoggedIn , NotLoggedIn , create_api_request};