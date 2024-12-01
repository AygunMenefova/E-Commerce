import axios from "axios"

class WomenService {

    BASE_URL = "https://fakestoreapi.com"
    
    getAllWomen() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.BASE_URL}/products/category/women's%20clothing`)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error))
        })
    }
}

export default new  WomenService()