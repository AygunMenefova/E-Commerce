import axios from "axios"

class MenService {

    BASE_URL = "https://fakestoreapi.com"
    
    getAllMen() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.BASE_URL}/products/category/men's%20clothing`)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error))
        })
    }
}

export default new  MenService()