---
title: "👨‍💻 Debian + iOS 部署使用速通"
sidebar_label: "👨‍💻 Debian + iOS 速通"
---

:::info
本文作者 [@𝐖𝐨𝐰. ](https://daydayday.day/) 

使用 CC BY-SA 4.0 协议共享
:::

## 条件
1. 运行 Debian 11 的远程服务器，且 80 / 443 端口可用
2. 一个域名，若服务器 / 域名在中国大陆内则需要备案，域名解析到上述远程服务器的公网 IPv4 地址
3. iOS/iPadOS 设备，运行 Shadowrocket 或 Surge
4. 一双能看清楚教程的眼睛

## 总结
在 Debian 上部署 Grasscutter，在 iOS 端处理 MitM 并重定向流量。

----

## 部署服务端

#### 以root用户连接 SSH 登录服务器

#### 更新系统依赖及部署常见软件包
```bash
apt update -y && apt upgrade -y && apt-get install -y gnupg sudo net-tools vim nano tar zip unzip p7zip-full wget curl git screen htop nload lsof telnet debian-keyring debian-archive-keyring apt-transport-https ufw
```
_\* 有些软件包可能用不上，但是为了防止某一步报错还是都给装上好点。_

#### 安装 Java 17
```bash
apt install openjdk-17-jre openjdk-17-jdk
```

#### 安装 MongoDB
```bash
# 获取公钥
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
# 添加下载源
echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/5.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
# 安装MongoDB
apt install -y mongodb-org

# 启用MongoDB
systemctl enable mongod && systemctl start mongod
```

#### 安装Caddy
```bash
# 获取公钥
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo tee /etc/apt/trusted.gpg.d/caddy-stable.asc
# 添加下载源
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list

# 更新源并安装Caddy
apt update && apt install -y caddy
```

#### 获取Grasscutter
```bash
cd ~

# 克隆源到本地 (以development分支为例)
git clone https://github.com/Grasscutters/Grasscutter --branch development && cd Grasscutter
# 克隆 resources
git clone https://github.com/Dimbreath/GenshinData resources
# 前往 https://github.com/Grasscutters/Grasscutter/actions 下载最新 jar 到本地文件夹
```

#### 编辑config.json
```bash
# 生成 config.json
# 将 grasscutter.jar 替换为实际值
# 在服务器运行后输入 stop 停止
java -jar grasscutter.jar

# 编辑config.json
> 将 GameServer, DispatchServer 中 PublicIp 的值设置为域名
> 将 GameServer 中 PublicPort 的值设置为 22102
> 将 DispatchServer 中 PublicPort 的值设置为 65530 (可替换为其他的合理的值)
> 将 DispatchServer 中 PublicPort 的值设置为 443
> 将 DispatchServer 中 UseSSL 的值设置为 false
```

#### 启动Grasscutter
```bash
# 创建新窗口
# 将 a, ~/Grasscutter/grasscutter.jar 替换为实际值
screen -dmS a
screen -S a -p 0 -X stuff "java -jar ~/Grasscutter/grasscutter.jar ^M"

# 若需打开控制台
screen -DR a
# 若需离开控制台
> CTRL+A + CTRL+D
```

#### 配置Caddy
```bash
# 编辑Caddyfile
# 文件位于 /etc/caddy/Caddyfile
# 将 genshin.your.domain 替换为实际值
# 将 http://localhost:1000 中 1000 替换为 DispatchServer 中 PublicPort 的值
mv /etc/caddyCaddyfile /etc/caddyCaddyfile.1
cat >/etc/caddy/Caddyfile<<EOF
genshin.your.domain {
        reverse_proxy http://localhost:65530
        encode zstd gzip
        header Access-Control-Allow-Origin *
}
EOF

# 重启 Caddy 服务
systemctl restart caddy
```

#### 配置ufw开启防火墙
```bash
# 放行端口
ufw allow SSH
ufw allow WWW\ Full
ufw allow 22102

# 启用 ufw 使其生效
ufw enable --force
```

----

## 配置设备端

### Shadowrocket

#### 编写模块
1. Shadowrocket \> 配置 \> 模块 \> 新建模块，写入以下内容。
```bash
#!name=Genshin Impact Routing Module MitM
#!desc=A module to use Grasscutter, with MITM handled via Surge, moudle written by 𝐖𝐨𝐰.

[URL Rewrite]
# Handle MITM via Surge, discarding mitmdump.
hk4e-api-os-static.mihoyo.com genshin.exzork.me header
hk4e-sdk-os.mihoyo.com genshin.exzork.me header
dispatchosglobal.yuanshen.com genshin.exzork.me header
osusadispatch.yuanshen.com genshin.exzork.me header
account.mihoyo.com genshin.exzork.me header
log-upload-os.mihoyo.com genshin.exzork.me header
dispatchcntest.yuanshen.com genshin.exzork.me header
devlog-upload.mihoyo.com genshin.exzork.me header
webstatic.mihoyo.com genshin.exzork.me header
log-upload.mihoyo.com genshin.exzork.me header
hk4e-sdk.mihoyo.com genshin.exzork.me header
api-beta-sdk.mihoyo.com genshin.exzork.me header
api-beta-sdk-os.mihoyo.com genshin.exzork.me header
cnbeta01dispatch.yuanshen.com genshin.exzork.me header
dispatchcnglobal.yuanshen.com genshin.exzork.me header
cnbeta02dispatch.yuanshen.com genshin.exzork.me header
sdk-os-static.mihoyo.com genshin.exzork.me header
webstatic-sea.mihoyo.com genshin.exzork.me header
hk4e-sdk-os-static.hoyoverse.com genshin.exzork.me header
webstatic-sea.hoyoverse.com genshin.exzork.me header
sdk-os-static.hoyoverse.com genshin.exzork.me header
api-account-os.hoyoverse.com genshin.exzork.me header
hk4e-sdk-os.hoyoverse.com genshin.exzork.me header
overseauspider.yuanshen.com genshin.exzork.me header
gameapi-account.mihoyo.com genshin.exzork.me header
minor-api.mihoyo.com genshin.exzork.me header
hk4e-sdk-os.hoyoverse.com genshin.exzork.me header
uspider.yuanshen.com genshin.exzork.me header
sdk-static.mihoyo.com genshin.exzork.me header

[MITM]
hostname = %APPEND% api-os-takumi.mihoyo.com,hk4e-api-os-static.mihoyo.com,hk4e-sdk-os.mihoyo.com,dispatchosglobal.yuanshen.com,osusadispatch.yuanshen.com,account.mihoyo.com,log-upload-os.mihoyo.com,dispatchcntest.yuanshen.com,devlog-upload.mihoyo.com,webstatic.mihoyo.com,log-upload.mihoyo.com,hk4e-sdk.mihoyo.com,api-beta-sdk.mihoyo.com,api-beta-sdk-os.mihoyo.com,cnbeta01dispatch.yuanshen.com,dispatchcnglobal.yuanshen.com,cnbeta02dispatch.yuanshen.com,sdk-os-static.mihoyo.com,webstatic-sea.mihoyo.com,hk4e-sdk-os-static.hoyoverse.com,webstatic-sea.hoyoverse.com,sdk-os-static.hoyoverse.com,api-account-os.hoyoverse.com,hk4e-sdk-os.hoyoverse.com,overseauspider.yuanshen.com,gameapi-account.mihoyo.com,minor-api.mihoyo.com,public-data-api.mihoyo.com,uspider.yuanshen.com,sdk-static.mihoyo.com, genshin.exzork.me
```
2. 将 `genshin.exzork.me` 替换为实际值

#### 开启并配置MitM
Shadowrocket \> 配置 \> 本地文件 \> 选中活跃配置右侧的 i \> HTTPS解密，启用、生成并信任证书。别忘了到 设置 \> 通用 \> 关于最下方信任根证书。

#### 启动Shadowrocket
Enjoy!


### Surge

#### 编写模块
1. Surge \> 模块 \> 新建本地模块，写入以下内容。
```bash
#!name=Genshin Impact Routing Module MitM
#!desc=A module to use Grasscutter, with MITM handled via Surge, moudle written by 𝐖𝐨𝐰.

[URL Rewrite]
# Handle MITM via Surge, discarding mitmdump.
hk4e-api-os-static.mihoyo.com genshin.exzork.me header
hk4e-sdk-os.mihoyo.com genshin.exzork.me header
dispatchosglobal.yuanshen.com genshin.exzork.me header
osusadispatch.yuanshen.com genshin.exzork.me header
account.mihoyo.com genshin.exzork.me header
log-upload-os.mihoyo.com genshin.exzork.me header
dispatchcntest.yuanshen.com genshin.exzork.me header
devlog-upload.mihoyo.com genshin.exzork.me header
webstatic.mihoyo.com genshin.exzork.me header
log-upload.mihoyo.com genshin.exzork.me header
hk4e-sdk.mihoyo.com genshin.exzork.me header
api-beta-sdk.mihoyo.com genshin.exzork.me header
api-beta-sdk-os.mihoyo.com genshin.exzork.me header
cnbeta01dispatch.yuanshen.com genshin.exzork.me header
dispatchcnglobal.yuanshen.com genshin.exzork.me header
cnbeta02dispatch.yuanshen.com genshin.exzork.me header
sdk-os-static.mihoyo.com genshin.exzork.me header
webstatic-sea.mihoyo.com genshin.exzork.me header
hk4e-sdk-os-static.hoyoverse.com genshin.exzork.me header
webstatic-sea.hoyoverse.com genshin.exzork.me header
sdk-os-static.hoyoverse.com genshin.exzork.me header
api-account-os.hoyoverse.com genshin.exzork.me header
hk4e-sdk-os.hoyoverse.com genshin.exzork.me header
overseauspider.yuanshen.com genshin.exzork.me header
gameapi-account.mihoyo.com genshin.exzork.me header
minor-api.mihoyo.com genshin.exzork.me header
hk4e-sdk-os.hoyoverse.com genshin.exzork.me header
uspider.yuanshen.com genshin.exzork.me header
sdk-static.mihoyo.com genshin.exzork.me header

[MITM]
hostname = %APPEND% api-os-takumi.mihoyo.com,hk4e-api-os-static.mihoyo.com,hk4e-sdk-os.mihoyo.com,dispatchosglobal.yuanshen.com,osusadispatch.yuanshen.com,account.mihoyo.com,log-upload-os.mihoyo.com,dispatchcntest.yuanshen.com,devlog-upload.mihoyo.com,webstatic.mihoyo.com,log-upload.mihoyo.com,hk4e-sdk.mihoyo.com,api-beta-sdk.mihoyo.com,api-beta-sdk-os.mihoyo.com,cnbeta01dispatch.yuanshen.com,dispatchcnglobal.yuanshen.com,cnbeta02dispatch.yuanshen.com,sdk-os-static.mihoyo.com,webstatic-sea.mihoyo.com,hk4e-sdk-os-static.hoyoverse.com,webstatic-sea.hoyoverse.com,sdk-os-static.hoyoverse.com,api-account-os.hoyoverse.com,hk4e-sdk-os.hoyoverse.com,overseauspider.yuanshen.com,gameapi-account.mihoyo.com,minor-api.mihoyo.com,public-data-api.mihoyo.com,uspider.yuanshen.com,sdk-static.mihoyo.com, genshin.exzork.me
```
2. 将 `genshin.exzork.me` 替换为实际值

#### 开启并配置MitM
Surge \> MitM(启用) \> 配置根证书，生成、安装并信任证书。别忘了到 设置 \> 通用 \> 关于最下方信任根证书。

#### 启动Surge
Enjoy!

----

:::note  常见问题
**Q: 进入游戏后会显示「与服务器的连接已断开」！**

A: 开门后断开 Shadowrocket / Surge 继续游玩即可。

---

**Q: 在部署过程中提示 `xxxx: command not found.`！**

A: 在搜索引擎中搜索 `Debian 11 xxxx 安装`。

---

**Q: 我在使用 Cloudflare 管理域名，且我无法连接！**

A: Cloudflare DNS解析中将这个域名的云朵关闭，不需要 Cloudflare 代理流量。

---

**Q: 只有这两个软件可以吗？Loon / Quantumult X 呢！**

A: 理论可以，未经测试，自行研究。
:::