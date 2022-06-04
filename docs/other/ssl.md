---
title: 🔒 SSL 配置
sidebar_label: 🔒 SSL 配置

---

## 概览 {#overview}

本教程提供 Grasscutter 服务器的 SSL 配置方法，使在通过浏览器访问时不出现警告。

## 实现方式

有两种方法实现正常的 SSL 配置。

- 反代

- 替换服务端证书 `keystore.p12` 为有效证书

网上有很多关于如何配置反代的教程。这里不赘述。

### 替换证书

#### 使用 IP 证书

ZeroSSL 已经开放 IP 证书的申请(一个账号仅限同时拥有三个未过期证书，但是账号不验证邮箱真实性),我们也可以使用 IP 证书

你可以使用诸如 `https://github.com/tinkernels/zerossl-ip-cert` 等工具来进行申请，也可以直接登录 ZeroSSL 网页进行申请(在 `Enter Domains` 处直接输入 IP 即可)

也可以参考[这篇教程](https://hikami.moe/webmaster/domain/4241.html)

#### 使用域名证书

由于 IP 证书申请相对会繁琐一点点，所以也可以考虑获取域名。

比如 `.xyz` 后缀第一年只需要 10 块甚至 9 块.可以找个国外注册商比如 NameSilo 注册一个，而且国外注册商无需备案

如果实在没钱，可以用 [Freenom](https://www.freenom.com/zh/index.html?lang=zh) .不过 Freenom 由于滥用严重，有些服务商可能会限制这些域名可使用的服务

至于 DNS 解析，可以使用免费版的 Cloudflare.如何配置一样请自行搜索.

:::caution

有些国内 VPS 提供商会阻断未备案域名的连接，还请注意。

:::

#### 获取证书

证书无非就是使用耳熟能详的 Let's Encrypt 免费证书。关于如何申请，请自行搜索"申请letsencrypt证书"

#### 转换证书

从 CA 申请到证书后，我们会获得 `.pem` 后缀的证书和 `.key` 后缀的证书私钥。Grasscutter 不能使用这种格式的证书。所以我们要进行转换。

转换也相当简单，只要这一条命令：

```bash
openssl pkcs12 -export -in cert.pem -inkey private.key -out server.p12
```

`cert.pem` 换成你的证书文件名，私钥同理。转换出来的证书会在当前目录下，名称为 `server.p12`

命令会要求你设置证书密码,一定记住。

Windows 默认没有这个工具，可以在[这里](https://slproweb.com/download/Win64OpenSSL_Light-3_0_3.exe)下载.Linux 则不用担心。

#### 更换证书

转换完成后，将 `server.p12` 拷到服务器目录下。

修改 `config.json` 中的以下两项为如下内容

```json
{
        "KeystorePath": "./server.p12",
        "KeystorePassword": "123456",
}
```

`KeystorePassword` 项要修改为你自己刚刚设置的密码。

## 结束

重启服务器，然后大功告成。此时你的浏览器应该不会显示警告了。

:::info

🔗 本文作者 [@feb_6th](https://t.me/feb_6th) 。

使用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 协议共享

:::
