export const safeRouteResolver = routeResolver => {
    return async (req, res, next) => {
        try {
            await routeResolver(req, res, next)
        } catch (error) {
            next(error)
        }
        return
    }
}
