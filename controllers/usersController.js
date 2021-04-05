'use strict';
const usersController = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@metropolia.fi',
        password: '$2b$12$OUtX5edYGpnLZKBXq5bWo.YhyMbH3d4uvIVvOXWZye6HMXrVSw9CK',
    },
    {
        id: '2',
        name: 'Jane Doez',
        email: 'jane@metropolia.fi',
        password: '$2b$12$pdkB99kuh.92.wu14Eush.VjViU4bU2uv79Z8SlAhYIXiOatLlyCm',
    },
];
//1234, qwer

const getUserLogin = (email) => {
    const user = usersController.filter((usr) => {
        if (usr.email === email) {
            return usr;
        }
    });
    // console.log("user is " + user[0].email + "password is " + user[0].password)
    return user[0];
};
module.exports = {
    users: usersController,
    getUserLogin
};
