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

export const createUser = async (req: Request, res: Response) => {
    const newUser = { 
        ...req.body, 
        id: uuidv4(),
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    res.status(201).json(newUser);
};

export const getUserById = async (req: Request, res: Response) => {
    const user = users.find(u => u.id === req.params.id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index !== -1) {
        users[index] = { ...users[index], ...req.body };
        res.status(200).json(users[index]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index !== -1) {
        users.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};
