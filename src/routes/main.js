import express from "express"
import { safeRouteResolver } from "../shared/safeRouterResolver.js"

const router = express.Router()

router.get(
    "/",
    safeRouteResolver((_, res) => {
        res.render("main", {
            page: "createQuestion",
            subPage: "",
            title: "Criação de Questões"
        })
    })
)

router.get(
    "/login",
    safeRouteResolver((_, res) => {
        res.render("main", {
            page: "login",
            subPage: "",
            title: "Login"
        })
    })
)

export default router
