import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = 'secret123';

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({
            message: 'Token Missing',
        });
    }

    const token = authHeader.split('')[1];

    try{
        jwt.verify(token, SECRET);
        next();
    }
    catch {
        return res.status(401).json({
            message: 'Invalid Token'
        })
    }
}