import {Request, Response } from 'express';
import {users} from '../data/users';
import { v4 as uuidv4 } from 'uuid';

export const getUsers = async (
    req: Request,
    res: Response
) => {
    let filteredUsers = [...users];
    const {role, status, search } = req.query;

    if(role){
        filteredUsers = filteredUsers.filter(
            (user) => user.role === role
        )
    }
    if(status) {
        filteredUsers = filteredUsers.filter(
            (user) => user.status === status
        );
    }

    if(search) {
        filteredUsers = filteredUsers.filter(
            (user) => 
                user.name.toLocaleLowerCase().includes(String(search).toLocaleLowerCase()) || user.email.toLocaleLowerCase().includes(String(search).toLocaleLowerCase())
        )
    }

    res.status(200).json(filteredUsers);
}

export const getStats = async (
    req: Request,
    res: Response
) => {
    const stats = {
        total: users.length,
        byRole: {
            admin: users.filter(
                (u) => u.role === 'admin'
            ).length,
            user: users.filter(
                (u) => u.role === 'user'
            ).length,
            guest: users.filter(
                (u) => u.role === 'guest'
            ).length
        },
        byStatus: {
            active: users.filter(
                (u) => u.status === 'active'
            ).length,
            inactive: users.filter(
                (u) => u.status === 'inactive'
            ).length
        }
    }
    res.status(200).json(stats);
}