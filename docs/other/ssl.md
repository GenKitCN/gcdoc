---
title: 🔒 SSL配置
sidebar_label: 🔒 SSL配置
---

## 概览 {#overview}

本教程提供GrassCutter服务器的ssl配置方法，使在通过浏览器访问时不出现警告。

## 实现方式

有两种方法实现正常的ssl配置。

- 反代
- 
- 替换服务端证书`keystore.p12`为有效证书

网上有很多关于如何配置反代的教程。这里不赘述。

### 替换证书

## 获取域名

由于IP证书不太好申请，所以我们得先拿到个域名。

和本文档相同的`.xyz`后缀第一年只需要10块甚至9块.可以找个国外注册商比如namesilo注册一个，而且国外注册商无需备案.

如果实在没钱，可以用[Freenom](https://www.freenom.com/zh/index.html?lang=zh).不过freenom由于滥用严重，有些服务商可能会限制这些域名可使用的服务.

至于dns解析，可以使用免费版的cloudflare.如何配置一样请自行搜索.

:::caution

有些国内vps提供商会阻断未备案域名的连接，还请注意。

:::

## 获取证书

证书无非就是使用耳熟能详的Let's Encrypt免费证书。关于如何申请，请自行搜索"申请letsencrypt证书"

## 转换证书

从CA申请到证书后，我们会获得`.pem`后缀的证书和`.key`后缀的证书私钥。Grasscutter不能使用这种格式的证书。所以我们要进行转换。

转换也相当简单，只要这一条命令：

```bash
openssl pkcs12 -export -in cert.pem -inkey private.key -out server.p12
```

`cert.pem`换成你的证书文件名，私钥同理。转换出来的证书会在当前目录下，名称为`server.p12`

命令会要求你设置证书密码,一定记住。

Windows默认没有这个工具，可以在[这里](https://slproweb.com/download/Win64OpenSSL_Light-3_0_3.exe)下载.Linux则不用担心。

## 更换证书

转换完成后，将`server.p12`拷到服务器目录下。

修改`config.json`中的以下两项为如下内容

```json
{
        "KeystorePath": "./server.p12",
        "KeystorePassword": "123456",
}
```
`"KeystorePassword"`项要修改为你自己刚刚设置的密码。

## 结束

重启服务器，然后大功告成。此时你的浏览器应该不会显示警告了。

:::info

🔗 本文作者 [@feb_6th](https://t.me/feb_6th) 。

使用 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) 协议共享

:::
