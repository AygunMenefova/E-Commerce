import axios from "axios"

class ElectronicsService {

    BASE_URL = "https://fakestoreapi.com"
    
    getAllElectronics() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.BASE_URL}/products/category/electronics`)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error))
        })
    }
}

export default new  ElectronicsService()