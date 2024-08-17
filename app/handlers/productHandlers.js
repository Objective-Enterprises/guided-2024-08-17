const Products = require('../service/productService')
const notFoundHandler = require('./notFoundHandler')

const products = new Products()

function fetchAllProductsHandler (req, res) {
  if (req.method !== 'GET') {
    notFoundHandler(req, res)
    return
  }
  res.statusCode = 200  
  const responseData = products.getAll()
  const responseString = JSON.stringify(responseData)
  res.setHeader('Content-Type', 'application/json')
  res.end(responseString)
}

function fetchProductByIdHandler (req, res, id) {
  if (req.method !== 'GET') {
    notFoundHandler(req, res)
    return
  }
  const idNumber = Number(id)
  const product = products.getById(idNumber)
  if (!product) {
    notFoundHandler(req, res)
    return
  }
  res.statusCode = 200
  const responseString = JSON.stringify(product)
  res.setHeader('Content-Type', 'application/json')
  res.end(responseString)
}

module.exports = {
  fetchAllProductsHandler,
  fetchProductByIdHandler
}