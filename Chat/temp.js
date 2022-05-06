const jwt=require('jsonwebtoken');

console.log(jwt.sign({UserID: 1}, 'shhh'));