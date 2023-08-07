import axios from "axios";

const baseUrl =
	process.env.REACT_APP_NODE_ENV === "DEVELOPMENT"
		? process.env.REACT_APP_DEV_URL
		: process.env.REACT_APP_PRODUCTION_URL;



const register = async (userData) => {
	const res = axios({
		method: "POST",
		url: baseUrl + "/user/register",
		data: {
			...userData,
		},
	})
		.then((response) => {
			return response;
		})
		.catch((error) => {
			return error.response;
		});
	return res;
};

const login = async (userData) => {
    const res = axios({
        method: "POST",
        url: baseUrl + "/user/login",
        data: {
            ...userData,
        }
    }).then(response => {
        return response;
    }).catch(error => {
        return error.response;
    })
    return res;
};

export { register, login };
