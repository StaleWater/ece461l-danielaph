import { Token } from "../contexts/AuthContext.tsx";

const BASE_URL = "/api";

export enum Method {
    Get = "GET",
    Post = "POST",
}

export default function request(
    route: string,
    method: Method,
    token?: Token,
): Promise<Response> {
    const url = route.startsWith("/")
        ? `${BASE_URL}${route}`
        : `${BASE_URL}/${route}`;

    if (token?.token) {
        return fetch(url, {
            method: method,
            headers: { Authorization: `Bearer ${token.token}` },
        });
    }

    return fetch(url, { method: method });
}