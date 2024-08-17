const fs = require("fs");

class Products {
  constructor() {
    const productsJson = fs.readFileSync('./app/data/products.json', 'utf-8')
    const products = JSON.parse(productsJson)
    this.products = products
  }

  getAll () {
    return this.products
  }

  getById (id) {
    const product = this.products.find((product) => {
      const match = product.id === id
      return match
    })
    return product
  }
}

module.exports = Products;