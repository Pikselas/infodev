import React from "react";
import { jwtDecode } from "jwt-decode";

interface LoggedInProps {
    children: React.ReactNode;
}

function get_jwt_token() {
    const token = localStorage.getItem('jwt_token');
    return token ? token : null;
}

function is_token_valid(token: string | null): boolean {
    if (!token) return false;
    try {
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
    } catch (error) {
        return false;
    }
}

const LoggedIn: React.FC<LoggedInProps> = ({ children }: LoggedInProps) => {
    const token = get_jwt_token();
    if (is_token_valid(token)) {
        return <>{children}</>;
    }
    return <></>;
};

const NotLoggedIn: React.FC<LoggedInProps> = ({ children }: LoggedInProps) => {
    const token = get_jwt_token();
    if (!is_token_valid(token)) {
        return <>{children}</>;
    }
    return <></>;
};

const BASE_URL = "http://127.0.01:5000";

function create_api_request(path: string, body?: any) {
    return fetch(BASE_URL + path, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${get_jwt_token()}`
        },
        body: JSON.stringify(body)
    });
}

export { LoggedIn, NotLoggedIn, create_api_request , BASE_URL};