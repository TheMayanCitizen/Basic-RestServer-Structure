const express = require("express");
const cors = require("cors");
const { dbConnetion } = require("../database/config.db");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usersPath = "/api/users";

    //Conect to DB
    this.connectDb();

    //Middlewares
    this.middlewares();

    //Rutas de mi aplicacion

    this.routes();
  }

  async connectDb() {
    await dbConnetion();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/user.route"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running in port", this.port);
    });
  }
}

module.exports = Server;
