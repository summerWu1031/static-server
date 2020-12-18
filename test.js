const fs = require('fs')

//读数据
const userString = fs.readFileSync('./db/users.json').toString()
const userArray = JSON.parse(userString)

//写数据库
const user3 = {id:3,name:'tom',password:'yyy'}
userArray.push(user3)
const string = JSON.stringify(userArray)
fs.writeFileSync('./db/users.json', string)