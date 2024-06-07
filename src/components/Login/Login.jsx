import { authNetwork } from "../Network/authNetwork";
import { showMessage } from "../../util";
import { UseFirst } from "../../context/UseFirst";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Login = () => {

    const { loginUser, getLoggedUser } = UseFirst();

    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { state, data, message } = await authNetwork(user, password);

        if (state) {
            //login correcto
            showMessage(
                "success",
                "bienvenido",
                `${data.user.name}`
            );
            loginUser(data.user, data.token);
            //obtengo la información de data
        } else {
            //login incorrecto, muestro el mensaje
            showMessage("warning", message, "");
        }
    }

    useEffect(() => {
        if (getLoggedUser()) {
            navigate("/tabla");
        } else {
            setIsLoading(false);
        }
    }, [getLoggedUser, navigate]);

    if (isLoading) return "";

    return (
        <>
            <form onSubmit={handleSubmit} className="was-validated">
                <div className="mb-3 mt-3">
                    <label htmlFor="uname" className="form-label">
                        Username:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="uname"
                        placeholder="Enter username"
                        name="uname"
                        onChange={(event) => setUser(event.target.value)}
                        required
                    />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Please fill out this field.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">
                        Password:
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="pwd"
                        placeholder="Enter password"
                        name="pswd"
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        autoComplete="false"
                    />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Please fill out this field.</div>
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    );
};

