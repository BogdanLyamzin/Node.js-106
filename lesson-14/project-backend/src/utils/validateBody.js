import createHttpError from "http-errors";

const validateBody = schema => {
    const func = async (req, res, next) => {
        try {
            await schema.validateAsync(req.body, {
                abortEarly: false,
            });
            next();
        }
        catch(error) {
            return next(createHttpError(400, error.message));
        }
    }

    return func;
}

export default validateBody;
