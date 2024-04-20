export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }catch (err) {
        return res.status(400).json({
            'messages': err.errors.map(err =>err.message),
            'errorStatus' : true
        })
    }
}