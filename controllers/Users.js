'use strict';
const users = [
  {
    id: '1',
    name: 'John Doe',
      email: 'john@metropolia.fi',
    password: '1234',
  },
  {
    id: '2',
    name: 'Jane Doez',
    email: 'jane@metropolia.fi',
    password: 'qwer',
  },
];

const getUserLogin = (email) => {
  const user = users.filter((usr) => {
    if (usr.email === email) {
      return usr;
    }
  });
  console.log("user is " + user[0].password)
  return user[0];
};
module.exports = {
  users,
  getUserLogin
};
