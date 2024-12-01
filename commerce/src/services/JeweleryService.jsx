import axios from "axios"

class JeweleryService {

    BASE_URL = "https://fakestoreapi.com"
    
    getAllJewelery() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.BASE_URL}/products/category/jewelery`)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error))
        })
    }
}

export default new JeweleryService()