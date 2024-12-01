import axios from "axios"
class CategoryService {

    BASE_URL = "https://fakestoreapi.com"

    getAllCategories() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.BASE_URL}/products/categories`)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error))
        })
    }
    getProductByCategory(categoryName) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.BASE_URL}/products/category/${categoryName}`)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error))
        })
    }
}
export default new CategoryService()