import axios from "axios"

class ProductServices {

    BASE_URL = "https://fakestoreapi.com"

    getAllProducts() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.BASE_URL}/products`)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error))
        })
    }
    getProductById(productId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.BASE_URL}/products/${productId}`)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error))
        })
    }
}
export default new ProductServices()