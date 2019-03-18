import {Injectable} from '@angular/core';
import {User} from '../models/user.model.client';

@Injectable()
export class UserService {
    users = [
        new User('123', 'alice', 'alice', 'email@email.com', 'Alice', 'Wonder'),
        new User('234', 'bob', 'bob', 'email@email.com', 'Bob', 'Marley'),
        new User('345', 'charly', 'charly', 'email@email.com', 'Charly', 'Garcia'),
        new User('456', 'jannunzi', 'jannunzi', 'email@email.com', 'Jose', 'Annunzi'),
    ];


createUser(user: User) {
    // this.users.push(new User(user._id, user.username, user.password));
    user._id = String(this.users.length + 1);
    this.users.push(user);
    return user;
}
findUserById(userId: string) {
    for (let x = 0; x < this.users.length; x++) {
        if (this.users[x]._id === userId) {
            return this.users[x];
        }
    }
}

findUserByUsername(username: string) {
    for (let x = 0; x < this.users.length; x++) {
        if (this.users[x].username === username) {
            return this.users[x];
        }
    }
}

findUsersByCredentials(username: string, password: string) {
    return this.users.find( function (user) {
        return user.username === username && user.password === password;
    });
}

updateUser(user: User, userId: String) {
    for (let i = 0; i < this.users.length; i++) {
        if (this.users[i]._id === user._id) {
            this.users[i].email = user.email;
            this.users[i].firstName = user.firstName;
            this.users[i].lastName = user.lastName;
            return this.users[i];
        }
    }
}
deleteUser(userId: string) {
    for (const i in this.users) {
        if (this.users[i]._id === userId) {
            const  j = +i;
            this.users.splice(j, 1);
        }
    }
}
}
