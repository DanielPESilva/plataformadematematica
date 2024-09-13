import express from "express";
import turma from "./TurmaRoutes.js"
import questao from "./QuestaoRoute.js"
// import compras from "./comprasRoutes.js";


const routes = (app) => {
    app.route('/').get((rep, res) => {
        res.status(200).redirect("/docs") // redirecionando para documentação
    })


    app.use(
        express.json(),
        turma,
        questao
    )
}


export default routes
