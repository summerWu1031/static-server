var http = require('http')
var fs = require('fs')
var url = require('url')
const { LOADIPHLPAPI } = require('dns')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)
  console.log(method);
  console.log(request.headers);


  const session = JSON.parse(fs.readFileSync('./public/session.json').toString())
  if(path==='/sign_in' && method==='POST'){
    const userArray = JSON.parse(fs.readFileSync('./db/users.json')) //读数据
    //拿用户刚输入的数据
    const array = []
    request.on('data',(chunk)=>{
      array.push(chunk)
    })
    console.log(array);
    request.on('end',()=>{
      const string = Buffer.concat(array).toString()
      const obj = JSON.parse(string)
      const user = userArray.find((user)=>user.name===obj.name &&user.password===obj.password)
      console.log(user);
      if(user===undefined){
        response.setHeader('ContentType','text/json;charset=utf-8')
        response.statusCode=400
        response.end(`{"errorCode":4001}`)
      }else{
        response.statusCode=200
        const random = Math.random()
        
        session[random]={user_id:user.id}
        fs.writeFileSync('./public/session.json',JSON.stringify(session))
        response.setHeader('Set-Cookie',`session_id=${random};HttpOnly` )
        response.end()
      }
      response.end()
    })
  }else if(path==='/home.html'){
    const cookie =request.headers.cookie
    let sessionId
    try {
     sessionId= cookie.split(';').filter(s=>s.indexOf('session_id=')>=0)[0].split('=')[1]
    } catch (error) {}

    if(sessionId && session[sessionId]){
      const homeHtml = fs.readFileSync('./public/home.html').toString()
      const userArray =JSON.parse(fs.readFileSync('./db/users.json'))  //所有数据
      const user = userArray.find(user=>user.id===session[sessionId].user_id)//从所有数据中找到对应id的数据
      const string=homeHtml.replace('{{loginStatus}}','已登录').replace('{{user.name}}',user.name)
      response.write(string)
    }else{
      const homeHtml = fs.readFileSync('./public/home.html').toString()
      const string=homeHtml.replace('{{loginStatus}}','未登录').replace('{{user.name}}','')
      response.write(string)
    }
    response.end()
  }else if(path==='/register' && method==='POST'){
    response.setHeader('Content-Type','text/html; charset=utf-8')
    const userArray= JSON.parse(fs.readFileSync('./db/users.json'))
    const array = []
    request.on('data',(chunk)=>{
      array.push(chunk) //把上传的请求里面的数据放到数组里
    })
    request.on('end',()=>{
      const string = Buffer.concat(array).toString() //array是Buffer，要把array变为字符串
      // console.log(string);
      const obj = JSON.parse(string)
      const lastUser = userArray[userArray.length-1]
      const newUser = {
        id:lastUser? lastUser.id+1 : 1, //如果数组本来有数据，则在最后一个id后面+1，如果数组原本没有数据，则id直接为1
        name:obj.name,
        password:obj.password
      }
      userArray.push(newUser)
      fs.writeFileSync('./db/users.json',JSON.stringify(userArray))
      response.end()
    })
    
  }else{
    response.statusCode = 200
    const filePath = path==='/'? 'index.html' : path
    //lastIndexOf() 方法返回调用String 对象的指定值最后一次出现的索引，在一个字符串中的指定位置 fromIndex处从后向前搜索
    const index = filePath.lastIndexOf('.')
    //substring() 方法返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。
    //suffix是后缀
    const suffix = filePath.substring(index)
    const fileType ={
        '.html':'text/html',
        '.css':'text/css',
        '.js':'text/javascript',
        '.json':'text/json',
        '.png':'image/png',
        '.jpg':'image/jpeg'
    }
    response.setHeader('Content-Type', `${fileType[suffix] || 'text/html'};charset=utf-8`)
    let Content
    try{
        content=fs.readFileSync(`public/${filePath}`)
    }catch(error){
        content = '文件不存在'
        response.statusCode=404
    }
    response.write(content)
    response.end()
  }



    
 
  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
