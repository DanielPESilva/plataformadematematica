import express from "express";
import users from "./systemUsersRoutes.js";
// import compras from "./comprasRoutes.js";


const routes = (app) => {
    app.route('/').get((rep, res) => {
        res.status(200).redirect("/docs") // redirecionando para documentação
    })
    /*
        Vamos descomentar linha a linha para cada rota que for criada no sistema (arquivo de rotas, controller e posteriormente documentação da rota e teste de rota automático e postman)
    */

    app.use(
        express.json(),
        usuario
    )
}


export default routes
