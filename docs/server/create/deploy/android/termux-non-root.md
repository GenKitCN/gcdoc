---
title: "📟 在 Termux 上部署 (无需 root)"
sidebar_label: 🔕 无 root
---

## 📥 下载软件

Github Releases
> https://github.com/termux/termux-app/releases

F-Droid
> https://f-droid.org/en/packages/com.termux/

⚠ Google Play 上的版本[已被官方弃用](https://github.com/termux/termux-app#google-play-store-deprecated)，本文不提供支持

## 📦 环境准备

### 🐧更新内置软件

下载安装后打开 Termux，首先更新一下内置软件源，在终端中输入

```bash
pkg upgrade -y
```

中间可能会遇到程序询问是否覆盖一些软件包的配置文件，由于是全新安装，我们可以输入 `Y` 然后回车确认

:::tip

中国大陆的用户可能会受限于网络环境的影响导致软件包下载缓慢，推荐先运行 `termux-change-repo` 更换为 USTC、Alibaba 等中国大陆内软件源镜像（终端中使用空格键选定，回车键确认）

:::

### 🗃️ MongoDB 数据库

:::tip

由于 Termux 上的 MongoDB 很久无人维护，需要额外配置一些依赖环境，懒人可以使用一键脚本

本小节安装方法只支持 aarch64(arm64) 的设备，X86 以及其他 CPU 架构的用户请自行研究。

:::

安装 wget 和 OpenSSL 1.1

```bash
pkg install -y wget openssl-1.1
ln -sf /data/data/com.termux/files/usr/lib/openssl-1.1/libcrypto.so.1.1 /data/data/com.termux/files/usr/lib/libcrypto.so.1.1
ln -sf /data/data/com.termux/files/usr/lib/openssl-1.1/libssl.so.1.1 /data/data/com.termux/files/usr/lib/libssl.so.1.1
```

添加安装第三方软件源

```bash
bash -c "$(wget -qO- https://its-pointless.github.io/setup-pointless-repo.sh)"
```

:::tip 替换为 USTC 镜像源（可选）

```bash
echo "deb https://mirrors.ustc.edu.cn/termux-its-pointless/24 termux extras" > $PREFIX/etc/apt/sources.list.d/pointless.list
```

:::

安装旧版本 libicu 并标记为保留软件

```bash
wget https://raw.githubusercontent.com/Slowhy/scripts/main/libicu_69.1-2_aarch64.deb
dpkg -i libicu_69.1-2_aarch64.deb && rm -rf libicu_69.1-2_aarch64.deb
apt-mark hold libicu
```

安装 MongoDB 软件包

```bash
pkg update -y && pkg install -y mongodb
```

### ☕ OpenJDK 17

这里使用 Termux 默认软件源提供的安装包

```bash
pkg install -y openjdk-17
```

### ⛓️ mitmproxy

mitmproxy 官方没有提供 aarch(arm64) 架构可用的二进制文件，这里使用pip来安装

```bash
pkg install -y python rust
export CARGO_BUILD_TARGET=aarch64-linux-android
pip install mitmproxy
```

## 🚜 运行服务器

### 服务端资源获取请参考[获取服务端](https://genkit.mhysb.xyz/docs/quick-start/get-server)，下文仅作必要补充

首先确保当前工作目录是服务端资源所在目录，然后运行 MongoDB

```bash
mongod --dbpath=数据库存储路径 --logpath=日志文件存储路径 --fork
```

然后运行服务端(主文件名因人而异，按需修改)

```bash
java -jar <grasscutter.jar>
```

由于非 root 用户没有权限，此时服务端并没有正常运行，但会自动生成我们需要的的配置文件

现在停止服务端，然后修改 `config.json`，将文件内默认的 443 端口改成 1024 以上的端口，比如 4443，同时修改`proxy_config.py` 内 `REMOTE_PORT` 所对应的端口

重新运行服务端

```bash
java -jar <grasscutter.jar>
```

再开另一个终端，进入目录，运行mitmproxy

```bash
mitmproxy -k -s proxy.py
```

现在就可以尝试打开客户端连接了

:::info

使用 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) 协议共享

:::
