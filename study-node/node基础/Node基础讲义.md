Node 网络 HTTP & 部署

## OSI TCP/IP 计算机网络的模型设计

OSI 七层 open system interconnection 开放式的系统互联

1. 物理层 physical layer

在现实生活中，实现计算机节点的数据传递

光缆 电缆 -> 包括传输媒介的特性、链接、保持、断开传输

信号调制解调 信道复用

2. 数据链路层 data link layer

接收物理层的数据，封装成帧，转发上层数据解析的内容发给物理层

物理层上有差错的数据 -> 无差错的数据帧

3. 网络层 network layer

通过路由选择算法，将报文通过路由线路传输给指定的节点，选择最合适的路径

ip -> ip

4. 传输层 transport layer

TCP UDP

进行端到端的有差错控制、流量控制，保证报文准确性

5. 会话层 session layer

两个真实实体建立链接和使用的过程

6. 表示层 presentation layer

承上启下 将第七层的数据解析格式，传输给会话层

7. 应用层 application layer

FTP 文件传输服务 Telnet Email DNS

数据单元 报文

## TCP & UDP

TCP transmission control protocol 传输控制协议

UDP user datagram protocol

TCP & UDP 区别

1. 是否面向连接：TCP 面向连接 UDP 不面向连接
2. 是否可靠：TCP 流量和拥塞控制 UDP 只有简单的校验和
3. 首部开销：TCP 20 字节 UDP 8 字节
4. 适用场景：面向可靠的数据传输 UDP 更适合用于实时应用

## HTTP

Client Server 客服端 服务端协议

Client Proxy Server

起始行 + 空行 + 实体

请求报文：method + path + HTTP 版本号 GET /shop/get HTTP/1.1
响应报文：版本号 + 状态码 + 原因

HTTP/1.1 404 Not Found

GET POST HEAD PUT

GET POST 请求的区别

- 安全性 GET: https://jqb.com/shop/get?id=1 POST: form-data
- 编码规范 url 编码
- 缓存

DNS https://www.jqb.com -> 服务器的 ip 地址

根域：.
顶级域名：
组织域名：edu, .com
地理域名： .cn, .hk
二级域名： https://person.jqb.com
三级域名：

## websocket

H5 新出现的技术
