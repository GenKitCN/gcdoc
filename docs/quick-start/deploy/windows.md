---
title: 💠 在 Windows 上部署
sidebar_label: 💠 Windows
---

## 配置环境

### MongoDB 数据库

前往 [MongoDB 官网](https://www.mongodb.com/try/download/community)，在右侧下载 5.x 版本的 MongoDB，推荐使用 msi 安装

### OpenJDK 17

前往 [Java 官网](https://jdk.java.net/archive/)，下载 zip 文件，解压到一个平时不会动的位置(比如 `C:\Program Files\Java`)

右键`计算机` -> `属性` -> `高级系统设置` -> `高级` -> `环境变量`

点击`系统变量`中的`新建`，建立一个名为 `JAVA_HOME` 的变量，并设置为解压的路径，比如 `C:\Program Files\Java\jdk-17.0.2`

在`系统变量`中找到 `Path`，点击`编辑`，在弹出的窗口中添加 `$JAVA_HOME\bin`

在任意位置打开一个 cmd 窗口，如果 `java -version` 有输出类似 `openjdk version "17.0.3" 2022-04-19` 的内容则表示安装成功

### mitmproxy

#### Python 3(如果没有)

前往 [Python 官网](https://www.python.org/downloads/windows/)，在 Stable Releases 中下载 Windows Installer (64-bit)

:::caution

在进行安装时，请一定确保 `Add Python 3.x.x to PATH` 复选框已经勾选

:::

安装完成后，在任意位置打开一个 cmd 窗口，如果 `python -V` 有输出类似 `Python 3.10.4` 的内容则表示安装成功

#### mitmproxy 本体

前往 [mitmproxy 官网](https://mitmproxy.org/)，下载 Windows Installer 并安装

## 运行服务器

在资源管理器中打开 Grasscutter 所在文件夹，将上方地址栏中的内容改为 `cmd`，回车即可在当前目录打开命令提示符

在确保 MongoDB 在正常运行的情况下，输入 `run.bat` 即可启动服务端

然后运行 `proxy.bat`，启动 mitmproxy 代理

:::info

By [Chi_Tang](https://www.chitang.tech)

使用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 协议共享

:::
