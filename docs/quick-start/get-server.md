---
title: 📥 获取服务端
sidebar_label: 📥 获取服务端
---

## 获取服务端主文件

### 从频道获取(推荐)

前往 [Telegram 频道](https://t.me/genkitCN)

带有 `ZH-dev` 的文件为开发分支汉化版，仅带有 `dev` 的为官方开发分支

如无特殊需求下载最新的汉化版本即可

### 从源码手动编译

:::note

手动编译需要安装 [Git](https://git-scm.com/) 和 JDK

Git 的安装方法十分简单不再赘述

JDK 建议前往文档对应操作系统的`环境配置`部分配置

:::

```bash 获取服务端源码
# 稳定分支
git clone https://github.com/Grasscutters/Grasscutter
# 开发分支
git clone -b development https://github.com/Grasscutters/Grasscutter
```

```bash 进入源码目录
cd Grasscutter
```

```bash 编译服务端
# Windows
gradlew.bat build
# Linux
./gradlew build
```

## 补全资源

:::tip

本文后续会大量使用 `<grasscutter>.jar`，请手动将 `<grasscutter>` 部分替换为您下载/编译的文件名

:::

### 生成资源文件夹

```bash
java -jar <grasscutter>.jar
```

### 获取资源文件

#### GenshinData

下载 [GenshinData 仓库](https://github.com/Dimbreath/GenshinData/tree/a83df7fcbcc26b2fc3d2918354caaaf223a40611)

将其中 `TextMap`, `Subtitle`, `Readable`, `ExcelBinOutput` 四个文件夹放入 Grasscutter 文件夹中的 `resources` 中

#### gi-bin-output

下载 [gi-bin-output 仓库](https://github.com/zhsitao/gi-bin-output)

将其中的 `2.5.52/Data/_BinOutput` 文件夹重命名为 `BinOutput` 并将其放入 Grasscutter 文件夹中的 `resources` 中

#### Keys, Data, Keystore

:::tip

该步骤仅需要[从频道获取](#从频道获取推荐)的服务端进行

:::

下载 [Grasscutter 仓库开发分支](https://github.com/Grasscutters/Grasscutter/tree/development)

将其中的 `data`, `keys` 文件夹放入 Grasscutter 文件夹中

将 `keystore.p12` 文件放入 Grasscutter 文件夹中

:::info

By [Chi_Tang](https://www.chitang.tech)

[补全资源](#补全资源)部分参考 [Grasscutter 官方 Wiki](https://github.com/Grasscutters/Grasscutter/wiki/Running#starting-the-server)

使用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 协议共享

:::
