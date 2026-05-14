import { Request, Response} from 'express';
import jwt from 'jsonwebtoken';

const SECRET = 'secret123';

export const login = async (req: Request, res: Response) => {
    const {username, password} = req.body;

    if(username === 'admin' && password === 'password123') {
        const token = jwt.sign({username}, SECRET, {expresIn: '1h'});
        return res.status(200).json({
            token,
            user: {
                username: 'admin',
            },
        });
    }

    return res.status(401).json({
        message: 'Invalid Cred'
    })
}