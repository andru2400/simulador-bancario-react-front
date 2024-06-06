import Swal from "sweetalert2";

export const showMessage = (icon, title, text) => {
    Swal.fire({
        title,
        text,
        icon,
    });
};

export const getToken = () => {
    const currentToken = localStorage.getItem("token");
    return currentToken;
};
