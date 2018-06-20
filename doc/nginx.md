## 1.启动

```
// 启动
nginx -c [nginx.conf地址]

// 重启
nginx -s reload
```

## 2.测试

```
nginx -t
```

## 3.停止

```
// 查询nginx主进程号[在进程列表里 面找master进程，它的编号就是主进程号了。]
ps -ef | grep nginx

// 从容停止Nginx：
kill -QUIT 主进程号

// 快速停止Nginx：
kill -TERM 主进程号

// 强制停止Nginx：
pkill -9 nginx
```

## 4.代理https实例

```
## 表明后台的一台服务器地址和端口。
## 当客户端有请求到nginx服务器的时候，upstream模块根据这里配置的server，
## 该对应的请求转发到这些server服务上，由这些server来处理请求，然后把响应结果告知upstream模块
upstream blogindex {
        server 127.0.0.1:3000 weight=1;
        keepalive 64;
}

## 由于配置了https，因此，当访问http://xxx.com的时候，会自动跳转到https://xxx.com
server {
         listen 80;
         server_name xxx.com;

         rewrite ^(.*) https://$host$1 permanent;
 }


server {
        ## 监听ip和端口。
        ## 当 nginx 服务器的该 ip 端口有请求访问，则调用该 server 的配置来处理该请求
        ## 使用h2: 加上 ssl http2 
        listen 443 ssl http2;
        
         ## 域名（其实这里也可以是ip地址）。
         ## nginx 对进入该虚拟主机的请求，检查其请求 Host 头是否匹配设置的 server_name，如果是，则继续处理该请求  
        server_name xxx.com;

        ssl on;
        ssl_certificate  .crt证书所在的目录 - 比如 /var/www/xxx/auth/xxx_bundle.crt;
        ssl_certificate_key  .key密钥所在的目录 - 比如 /var/www/xxx/auth/xxx.key;
        ssl_session_timeout 5m;
        
        ## 按照这个协议配置
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ## 按照这个套件配置
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers on;

        access_log  /var/log/nginx/xxx.access.log;
        error_log /var/log/nginx/xxx.error.log;

        if ($ssl_protocol = "") {
                rewrite ^(.*) https://$host$1 permanent;
         }
        
        ## 对于HTTP请求，其被用来详细匹配URI和设置的location path。一般这个uri path会是字符串或者正则表达式形式
        location / {
            ## 设置代理请求头。由于经过了反向代理服务器，所以后台服务器不能获取真正的客户端请求地址等信息，这样，就需要把这些ip地址，设置回请求头部中。
            ## 然后，我们在后台服务上，可以使用request.get("X-Real-IP")或者request.get("X-Forwarded-For")获取真实的请求ip地址。
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_set_header X-Nginx-Proxy true;
            
            ## 代理转发。配置了该项，当匹配location path的请求进来后，会根据 upstream 设置，请求后台服务器上的 proxy_pass 的请求
            proxy_pass http://blogindex;
            proxy_redirect off;
        }
}

```