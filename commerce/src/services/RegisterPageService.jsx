import axios from "../config/AxiosConfig"
class RegisterPageService {

    register(newUser) {
        return new Promise((resolve, reject) => {
            axios.post("/users", newUser)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error));
        })
    }
}

export default new RegisterPageService