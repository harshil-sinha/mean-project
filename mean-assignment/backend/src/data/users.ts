import {User} from '../types/user';
import {v4 as uuidv4} from 'uuid';

export const users: User[] = [
    {
        id: uuidv4(),
        name: 'John',
        email: 'john@example.com',
        role: 'admin',
        status: 'active',
        createdAt: new Date().toISOString(),
    },
    {
        id: uuidv4(),
        name: 'Harshil',
        email: 'harshil@example.com',
        role: 'user',
        status: 'inactive',
        createdAt: new Date().toISOString(),
    },
    
]