const http = require("http");
const url = require("url");

const producthandlers = require("./app/handlers/productHandlers");
const userhandlers = require("./app/handlers/userHandlers");

const server = http.createServer((req, res) => {
  const requestUrl = req.url;
  const parts = url.parse(requestUrl, true);

  switch (parts.pathname) {
    case "/v1/products": {
      const { id } = parts.query;
      if (id) {
        return producthandlers.fetchProductByIdHandler(req, res, id);
      } else {
        return producthandlers.fetchAllProductsHandler(req, res);
      }
    }

    case "/v1/users": {
      const { username } = parts.query;
      if (username) {
        return userhandlers.fetchUserByUsernameHandler(req, res, username);
      } else {
        return userhandlers.fetchAllUsersHandler(req, res);
      }
    }

    case "/v1/login":
      return userhandlers.loginHandler(req, res);

    default: {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      console.log(`${new Date()} - Route not found`);
      res.end(JSON.stringify({ message: "Route not found" }));
    }
  }
});

const port = 8080;

server.listen(port, () => {
  console.log(`${new Date()} - Server is running on port ${port}`);
});
