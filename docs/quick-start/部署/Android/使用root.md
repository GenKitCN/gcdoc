---
id: deploy_termux_root
title: "[root] 在 Termux 上部署"
sidebar_label: 使用 Root
---

:::caution

看前须知：此教程必须有root，没root痛快衮。别来问没root怎么办，打钱也不行。
此教程也需要你有一定的Linux基础。

:::

## 下载软件

下载并安装Linux Deploy。

https://github.com/meefik/linuxdeploy

## 配置 Linux Deploy

进入 Linux Deploy,点击右下角配置按钮，修改选项为如下内容

发行版改为 arch

架构改为 aarch64

源地址改为 `http://mirrors.ustc.edu.cn/archlinuxarm`

安装类型改为 目录

安装路径改为 `/data/linux`

用户名和密码随意

本地化改为 `zh_CN.UTF-8`

继续往下翻，找到 ssh ，勾选"启用"

## 部署

点开右上角菜单，点击部署，然后等待。

出现 `<<deploy` 即完成。

## 连接

部署完之后点击下方的启动。

然后使用 ssh 客户端(如 juicessh)连接.

地址 `127.0.0.1` ,用户名和密码与刚才设置的相同.

如果跳出第一次连接的窗口，点击确定。

如果操作无误，你应该能看到命令行了。

## 配置环境

### 基本环境

输入命令

```bash
sudo pacman -Sy --overwrite \* git wget curl mitmproxy
```

### MongoDB 数据库

> 如果按照下面的教程，执行时提示"非法指令",这是因为你的设备较老。请尝试使用4.4.20版本。

下载 [mongod 主程序 5.0.8](https://drive.google.com/file/d/1rdR3TeWtvQt8z738iyfGX6riSXCbrIe1/) (在骁龙 865 测试可用)

下载 [mongod 主程序 4.4.20](https://drive.google.com/file/d/1sQEMyvhqZoIWiZcbFsL4r6-8-1ZY1BVz) (在骁龙 660 测试可用)

下载来的 mongod 主程序扔进安装路径下的 `/usr/bin` ,并将权限修改为 755 .如果文件名有改变，请将其改为 `mongod`

然后登陆进 ssh ，输入

```bash
sudo mkdir /usr/db;sudo mongod --dbpath /usr/db --bind_ip 127.0.0.1
```

`--bind_ip`项请按照需求修改。默认情况下`127.0.0.1`足矣。

### Java 环境

登录进 ssh ，输入:

```bash
wget https://d6.injdk.cn/oraclejdk/17/jdk-17_linux-aarch64_bin.tar.gz;tar xzvf jdk-17_linux-aarch64_bin.tar.gz
```

命令完成后，在 `~/.bashrc` 中填上以下几句:

```bash
# Java environment
export JHOME=~/jdk-17.0.1
export PATH=$JHOME/bin:$PATH
```

:::tip

如果不会在终端使用编辑器请使用以下命令添加

```bash
cat >> ~/.bashrc << EOF
export JHOME=~/jdk-17.0.1
export PATH=\$JHOME/bin:\$PATH
EOF
```

:::

最后，输入

```bash
source ~/.bashrc;java -version
```

如果产生了如下输出，Java 配置即完成.

```
java version "17.0.1" 2021-10-19 LTS
Java(TM) SE Runtime Environment (build 17.0.1+12-LTS-39)
Java HotSpot(TM) 64-Bit Server VM (build 17.0.1+12-LTS-39, mixed mode, sharing)
```

## 搭建服务器

搭建服务器的操作其实大同小异，可以参考[此教程](https://blog.tomys.top/2022-04/GenshinTJ/).

本教程只阐述不同的部分。

在服务器文件放好后，进入目录，输入

```bash
sudo java -jar <grasscutter.jar>
```

来开启服务器。

> 主文件名因人而异，按需修改。
> 例如现在我的文件结构是这样
> ![文件结构](/img/docs/quick-start/部署/Android/使用root/files.png)
> 主文件名是 `grasscutterZH-dev-775f4cb.jar`
> 则应该运行:
> 
> ```bash
> sudo java -jar grasscutterZH-dev-775f4cb.jar
> ```

再开另一个终端，进入目录，输入

```bash
mitmproxy -k -s proxy.py
```

来开启 mitmproxy。

> 若有公网连接需求，可以在运行参数中添加 `--set block_global=false`

如何连接服务器请同样参考上面的教程。

## 特殊需求

> 我想自己编译 grasscutter，可是 archlinuxarm 源里似乎没有合适的 gradle，怎么办？

输入以下命令,全部选项默认。

```bash
pacman -U --overwrite \* https://mirrors.ustc.edu.cn/archlinux/community/os/x86_64/gradle-7.4.2-1-any.pkg.tar.zst;pacman -Rdd jdk-openjdk
```

输入 `gradle -v` 出现以下输出即成功。当然，不一定非要和下面的完全一样。

```
------------------------------------------------------------
Gradle 7.4.2
------------------------------------------------------------

Build time:   2022-03-31 16:40:07 UTC
Revision:     <unknown>

Groovy:       3.0.9
Ant:          Apache Ant(TM) version 1.10.11 compiled on July 10 2021
JVM:          17.0.1 (Oracle Corporation 17.0.1+12-LTS-39)
OS:           Linux 4.19.226-IllusionX+ aarch64
```

:::info

原文由 [@feb_6th](https://t.me/feb_6th) 与 [@chitang233](https://t.me/chitang233) 发布在 [Chi_Tang's Blog](https://www.chitang.tech/posts/grasscutter-android.md)

使用 CC BY-SA 4.0 协议共享

:::