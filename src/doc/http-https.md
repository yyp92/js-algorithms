# http

## http 简介
- Http协议是「Hyper Text Transfer Protocol」（超文本传输协议）的缩写，是用于服务器传输超文本到本地浏览器的传输协议。
- Http是一个基于TCO/IP的通信协议来传递数据。

- [聊一聊HTTP](https://juejin.im/post/6844904109858881543)



## http 请求方法
- HTTP/1.0支持：GET、POST、HEAD三种HTTP请求方法。
- HTTP/1.1新增了：OPTIONS、PUT、DELETE、TRACE、CONNECT五种HTTP请求方法。

- [HTTP请求方法详解](https://juejin.im/entry/6844903607964270599)




## http options 请求方法
- OPTIONS请求即预检请求，可用于检测服务器允许的http方法

- [什么时候会发送options请求](https://juejin.im/post/6844903821634699277)




## Content-Type (常见的)
- application/x-www-form-urlencoded --> 这是浏览器原生的form表单类型，或者说是表单默认的类型。
- application/json --> 现在绝大部分的请求都会以json形式进行传输，post会将序列化后的json字符串直接塞进请求体中。
- multipart/form-data --> 用于在表单中上传文件。
- application/octet-stream --> 二进制流数据（如常见的文件下载）。