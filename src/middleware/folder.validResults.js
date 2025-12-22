import { validationResult } from 'express-validator';
export default function validatorMiddleware(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).redirect('storage');
    }
    else
        next();
}
//# sourceMappingURL=folder.validResults.js.map