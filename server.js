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
 
  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
