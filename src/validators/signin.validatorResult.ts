import { validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

export default function validatorMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).render('signin', { errors: result.array() });
  }
  next();
}
