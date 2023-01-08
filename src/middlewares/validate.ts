import { Request, Response, NextFunction } from "express";
import { ZodError, AnyZodObject, Schema } from "zod";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (err) {
      const error = err as ZodError;
      return res.status(400).json({
        message: error.errors[0].message,
      });
    }
  };

export default validate;
