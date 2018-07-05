## TCP（Transmission Control Protocol） - 传输控制协议

* 需要将要传输的文件分段
* 传输
* 建立会话
* 可靠传输
* 流量控制

应用场景：
* QQ传输文件
* 发送邮件
* ftp下载文件

## UDP（User Data Protocol）- 用户数据报协议

* 一个数据包就能完成数据通信
* 不分段
* 不需要建立会话
* 不需要流量控制
* 不可靠传输

应用场景：
* DNS解析域名
* QQ聊天
* 屏幕广播（多播/广播）


netstat -n - 查看会话
netstat -nb - 查看哪一个进程建立的会话


