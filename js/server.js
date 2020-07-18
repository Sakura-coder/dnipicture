var http = require("http");
var url = require("url");
var qs = require("querystring");

//用node中的http创建服务器 并传入两个形参
http.createServer(function(req , res) {
//设置请求头 允许所有域名访问 解决跨域
    res.setHeader("Access-Control-Allow-Origin" , "*");
//获取地址中的参数
    var query = url.parse(req.url).query;
	
//用qs模块的方法 把地址中的参数转变成对象 方便获取
    var queryObj = qs.parse(query);
	console.log(queryObj);
//获取前端传来的myUrl=后面的内容　　GET方式传入的数据
    var myUrl = queryObj.baseUrl;
//创建变量保存请求到的数据
    var data = "";

//开始请求数据 http.get()方法
    http.get(myUrl,function (request) {
//监听myUrl地址的请求过程
//设置编码格式
        request.setEncoding("utf8");

//数据传输过程中会不断触发data信号
        request.on("data", function (response) {
            data += response;
        });

//当数据传输结束触发end
        request.on("end" , function () {
//把data数据返回前端
            res.end(data);
        });
    }).on("error" , function () {
        console.log("请求myUrl地址出错！");
    });
}).listen(8989, function(err){
    if(!err){
        console.log("服务器启动成功，正在监听8989...");
    }
});