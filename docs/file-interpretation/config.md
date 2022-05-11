---
title: ⚙ config.json
sidebar_label: ⚙ config.json
---

## 概览 {#overview}

`config.json` 包含了您服务端的配置信息，位于您服务端的根目录。

包含了: 🗄️数据库 / 📁目录 / 🖥️服务器

<details>
<summary>原文件</summary>

```json title="config.json"
{
    "DatabaseUrl": "mongodb://localhost:27017",
    "DatabaseCollection": "grasscutter",
    "RESOURCE_FOLDER": "./resources/",
    "DATA_FOLDER": "./data/",
    "PACKETS_FOLDER": "./packets/",
    "DUMPS_FOLDER": "./dumps/",
    "KEY_FOLDER": "./keys/",
    "SCRIPTS_FOLDER": "./resources/Scripts/",
    "PLUGINS_FOLDER": "./plugins/",
    "LANGUAGE_FOLDER": "./languages/",
    "DebugMode": "NONE",
    "RunMode": "HYBRID",
    "GameServer": {
        "Name": "Test",
        "Ip": "127.0.0.1",
        "PublicIp": "127.0.0.1",
        "Port": 22102,
        "PublicPort": 0,
        "DispatchServerDatabaseUrl": "mongodb://localhost:27017",
        "DispatchServerDatabaseCollection": "grasscutter",
        "InventoryLimitWeapon": 2000,
        "InventoryLimitRelic": 2000,
        "InventoryLimitMaterial": 2000,
        "InventoryLimitFurniture": 2000,
        "InventoryLimitAll": 30000,
        "MaxAvatarsInTeam": 4,
        "MaxAvatarsInTeamMultiplayer": 4,
        "MaxEntityLimit": 1000,
        "WatchGacha": false,
        "ServerNickname": "Kiana",
        "ServerAvatarId": 10000046,
        "ServerNameCardId": 210001,
        "ServerLevel": 1,
        "ServerWorldLevel": 1,
        "ServerSignature": "Server Signature",
        "WelcomeEmotes": [
            2007,
            1002,
            4010
        ],
        "WelcomeMotd": "Welcome to Grasscutter emu",
        "WelcomeMailTitle": "Welcome to Grasscutter!",
        "WelcomeMailSender": "Lawnmower",
        "WelcomeMailContent": "Hi there!\r\nFirst of all, welcome to Grasscutter. If you have any issues, please let us know so that Lawnmower can help you! \r\n\r\nCheck out our:\r\n<type=\"browser\" text=\"Discord\" href=\"https://discord.gg/T5vZU6UyeG\"/> <type=\"browser\" text=\"GitHub\" href=\"https://github.com/Melledy/Grasscutter\"/>",
        "WelcomeMailItems": [
            {
                "itemId": 13509,
                "itemCount": 1,
                "itemLevel": 1
            },
            {
                "itemId": 201,
                "itemCount": 10000,
                "itemLevel": 1
            }
        ],
        "EnableOfficialShop": true,
        "Game": {
            "ADVENTURE_EXP_RATE": 1.0,
            "MORA_RATE": 1.0,
            "DOMAIN_DROP_RATE": 1.0
        }
    },
    "DispatchServer": {
        "Ip": "127.0.0.1",
        "PublicIp": "127.0.0.1",
        "Port": 443,
        "PublicPort": 0,
        "KeystorePath": "./keystore.p12",
        "KeystorePassword": "123456",
        "UseSSL": true,
        "FrontHTTPS": true,
        "CORS": false,
        "CORSAllowedOrigins": [
            "*"
        ],
        "AutomaticallyCreateAccounts": false,
        "defaultPermissions": [
            ""
        ],
        "GameServers": []
    },
    "LocaleLanguage": "zh_CN",
    "DefaultLanguage": "en",
    "OpenStamina": true
}
```

</details>

## 字段

## `DatabaseUrl`

- 类型：`string`

数据库地址，格式为`mongodb://IP:端口`

```json title="config.json"
{
    "DatabaseUrl": "mongodb://localhost:27017"
}
```

## `DatabaseCollection`

- 类型：`string`

数据库名称

```json title="config.json"
{
    "DatabaseCollection": "grasscutter"
}
```

## `RESOURCE_FOLDER`

- 类型：`string`

资源文件夹路径

```json title="config.json"
{
    "RESOURCE_FOLDER": "./resources/"
}
```

## `DATA_FOLDER`

- 类型：`string`

数据文件夹路径

```json title="config.json"
{
    "DATA_FOLDER": "./data/"
}
```

## `PACKETS_FOLDER`

- 类型：`string`

自定义回复数据包文件夹路径

```json title="config.json"
{
    "PACKETS_FOLDER": "./packets/"
}
```

## `DUMPS_FOLDER`

- 类型：`string`

目前未使用，未知

```json title="config.json"
{
    "DUMPS_FOLDER": "./dumps/"
}
```

## `KEY_FOLDER`

- 类型：`string`

加解密密钥文件夹路径

```json title="config.json"
{
    "KEY_FOLDER": "./keys/"
}
```

## `SCRIPTS_FOLDER`

- 类型：`string`

Lua脚本路径

```json title="config.json"
{
    "SCRIPTS_FOLDER": "./resources/Scripts/"
}
```

## `PLUGINS_FOLDER`

- 类型：`string`

插件文件夹路径

```json title="config.json"
{
    "PLUGINS_FOLDER": "./plugins/"
}
```

## `LANGUAGE_FOLDER`

- 类型：`string`

语言文件所在文件夹路径

```json title="config.json"
{
    "LANGUAGE_FOLDER": "./languages/"
}
```

## `DebugMode`

- 类型：`'NONE' | 'MISSING' | 'ALL'`
    - NONE: 不显示调试信息
    - MISSING: 仅显示未知请求
    - ALL: 全部显示

调试模式

```json title="config.json"
{
    "DebugMode": "NONE"
}
```

## `RunMode`

- 类型：`'HYBRID' | 'DISPATCH_ONLY' | 'GAME_ONLY'`
    - HYBRID: 同时运行负载均衡服务器和游戏服务器
    - DISPATCH_ONLY: 仅运行负载均衡服务器
    - GAME_ONLY: 仅运行游戏服务器

```json title="config.json"
{
    "RunMode": "HYBRID"
}
```

## `GameServer`

- 类型：string

游戏服务器配置。
<details>
<summary>原始json</summary>

```json title="$.GameServer"
{
  "Name": "Test",
  "Ip": "127.0.0.1",
  "PublicIp": "127.0.0.1",
  "Port": 22102,
  "PublicPort": 0,
  "DispatchServerDatabaseUrl": "mongodb://localhost:27017",
  "DispatchServerDatabaseCollection": "grasscutter",
  "InventoryLimitWeapon": 2000,
  "InventoryLimitRelic": 2000,
  "InventoryLimitMaterial": 2000,
  "InventoryLimitFurniture": 2000,
  "InventoryLimitAll": 30000,
  "MaxAvatarsInTeam": 4,
  "MaxAvatarsInTeamMultiplayer": 4,
  "MaxEntityLimit": 1000,
  "WatchGacha": false,
  "ServerNickname": "Kiana",
  "ServerAvatarId": 10000046,
  "ServerNameCardId": 210001,
  "ServerLevel": 1,
  "ServerWorldLevel": 1,
  "ServerSignature": "Server Signature",
  "WelcomeEmotes": [
    2007,
    1002,
    4010
  ],
  "WelcomeMotd": "Welcome to Grasscutter emu",
  "WelcomeMailTitle": "Welcome to Grasscutter!",
  "WelcomeMailSender": "Lawnmower",
  "WelcomeMailContent": "Hi there!\r\nFirst of all, welcome to Grasscutter. If you have any issues, please let us know so that Lawnmower can help you! \r\n\r\nCheck out our:\r\n<type=\"browser\" text=\"Discord\" href=\"https://discord.gg/T5vZU6UyeG\"/> <type=\"browser\" text=\"GitHub\" href=\"https://github.com/Melledy/Grasscutter\"/>",
  "WelcomeMailItems": [
    {
      "itemId": 13509,
      "itemCount": 1,
      "itemLevel": 1
    },
    {
      "itemId": 201,
      "itemCount": 10000,
      "itemLevel": 1
    }
  ],
  "EnableOfficialShop": true,
  "Game": {
    "ADVENTURE_EXP_RATE": 1.0,
    "MORA_RATE": 1.0,
    "DOMAIN_DROP_RATE": 1.0
  }
}
```

</details>

### `Name`

- 类型: `string`

游戏服务器名称

```json title="config.json"
{
  "GameServer": {
    "Name": "Test"
  }
}
```

### `Ip`

- 类型: `string`

游戏服务器IP地址

```json title="config.json"
{
  "GameServer": {
    "Ip": "127.0.0.1"
  }
}
```

### `PublicIp`

- 类型: `string`

游戏服务器公开IP地址

```json title="config.json"
{
  "GameServer": {
    "PublicIp": "127.0.0.1"
  }
}
```

### `Port`

- 类型：`integer`


```json title="config.json"
{
    "GameServer": {
        "Port": 22102
    }
}
```

### `PublicPort`

- 类型：`integer`


```json title="config.json"
{
    "GameServer": {
        "PublicPort": 0
    }
}
```

### `DispatchServerDatabaseUrl`

- 类型：`string`


```json title="config.json"
{
    "GameServer": {
        "DispatchServerDatabaseUrl": "mongodb://localhost:27017"
    }
}
```

### `DispatchServerDatabaseCollection`

- 类型：`string`


```json title="config.json"
{
    "GameServer": {
        "DispatchServerDatabaseCollection": "grasscutter"
    }
}
```

### `InventoryLimitWeapon`

- 类型：`integer`


```json title="config.json"
{
    "GameServer": {
        "InventoryLimitWeapon": 2000
    }
}
```

### `InventoryLimitRelic`

- 类型：`integer`


```json title="config.json"
{
    "GameServer": {
        "InventoryLimitRelic": 2000
    }
}
```

### `InventoryLimitMaterial`

- 类型：`integer`


```json title="config.json"
{
    "GameServer": {
        "InventoryLimitMaterial": 2000
    }
}
```

### `InventoryLimitFurniture`

- 类型：`integer`


```json title="config.json"
{
    "GameServer": {
        "InventoryLimitFurniture": 2000
    }
}
```

### `InventoryLimitAll`

- 类型：`integer`


```json title="config.json"
{
    "GameServer": {
        "InventoryLimitAll": 30000
    }
}
```

### `MaxAvatarsInTeam`

- 类型：`integer`


```json title="config.json"
{
    "GameServer": {
        "MaxAvatarsInTeam": 4
    }
}
```

### `MaxAvatarsInTeamMultiplayer`

- 类型：`integer`


```json title="config.json"
{
    "GameServer": {
        "MaxAvatarsInTeamMultiplayer": 4
    }
}
```

### `MaxEntityLimit`

- 类型：`integer`


```json title="config.json"
{
    "GameServer": {
        "MaxEntityLimit": 1000
    }
}
```

### `WatchGacha`

- 类型：`boolean`


```json title="config.json"
{
    "GameServer": {
        "WatchGacha": false
    }
}
```

### `ServerNickname`

- 类型：`string`


```json title="config.json"
{
    "GameServer": {
        "ServerNickname": "Kiana"
    }
}
```

### `ServerAvatarId`

- 类型：`integer`


```json title="config.json"
{
    "GameServer": {
        "ServerAvatarId": 10000046
    }
}
```

### `ServerNameCardId`

- 类型：`integer`


```json title="config.json"
{
    "GameServer": {
        "ServerNameCardId": 210001
    }
}
```

### `ServerLevel`

- 类型：`integer`


```json title="config.json"
{
    "GameServer": {
        "ServerLevel": 1
    }
}
```

### `ServerWorldLevel`

- 类型：`integer`


```json title="config.json"
{
    "GameServer": {
        "ServerWorldLevel": 1
    }
}
```

### `ServerSignature`

- 类型：`string`


```json title="config.json"
{
    "GameServer": {
        "ServerSignature": "Server Signature"
    }
}
```

### `WelcomeEmotes`

- 类型：`list`


```json title="config.json"
{
    "GameServer": {
        "WelcomeEmotes": [
            2007,
            1002,
            4010
        ]
    }
}
```

### `WelcomeMotd`

- 类型：`string`


```json title="config.json"
{
    "GameServer": {
        "WelcomeMotd": "Welcome to Grasscutter emu"
    }
}
```

### `WelcomeMailTitle`

- 类型：`string`


```json title="config.json"
{
    "GameServer": {
        "WelcomeMailTitle": "Welcome to Grasscutter!"
    }
}
```

### `WelcomeMailSender`

- 类型：`string`


```json title="config.json"
{
    "GameServer": {
        "WelcomeMailSender": "Lawnmower"
    }
}
```

### `WelcomeMailContent`

- 类型：`string`


```json title="config.json"
{
    "GameServer": {
        "WelcomeMailContent": "Hi there!\r\nFirst of all, welcome to Grasscutter. If you have any issues, please let us know so that Lawnmower can help you! \r\n\r\nCheck out our:\r\n<type=\"browser\" text=\"Discord\" href=\"https://discord.gg/T5vZU6UyeG\"/> <type=\"browser\" text=\"GitHub\" href=\"https://github.com/Melledy/Grasscutter\"/>"
    }
}
```

### `WelcomeMailItems`

- 类型：`<class 'list'>`


```json title="config.json"
{
    "GameServer": {
        "WelcomeMailItems": [
            {
                "itemId": 13509,
                "itemCount": 1,
                "itemLevel": 1
            },
            {
                "itemId": 201,
                "itemCount": 10000,
                "itemLevel": 1
            }
        ]
    }
}
```

### `EnableOfficialShop`

- 类型：`boolean`


```json title="config.json"
{
    "GameServer": {
        "EnableOfficialShop": true
    }
}
```

### `Game`

- 类型：`object`


```json title="config.json"
{
    "GameServer": {
        "Game": {
            "ADVENTURE_EXP_RATE": 1.0,
            "MORA_RATE": 1.0,
            "DOMAIN_DROP_RATE": 1.0
        }
    }
}
```

<details>
<summary>配置示例</summary>

```json title="config.json"
{
    "GameServer": {
        "Name": "Test",
        "Ip": "127.0.0.1",
        "PublicIp": "127.0.0.1",
        "Port": 22102,
        "PublicPort": 0,
        "DispatchServerDatabaseUrl": "mongodb://localhost:27017",
        "DispatchServerDatabaseCollection": "grasscutter",
        "InventoryLimitWeapon": 2000,
        "InventoryLimitRelic": 2000,
        "InventoryLimitMaterial": 2000,
        "InventoryLimitFurniture": 2000,
        "InventoryLimitAll": 30000,
        "MaxAvatarsInTeam": 4,
        "MaxAvatarsInTeamMultiplayer": 4,
        "MaxEntityLimit": 1000,
        "WatchGacha": false,
        "ServerNickname": "Kiana",
        "ServerAvatarId": 10000046,
        "ServerNameCardId": 210001,
        "ServerLevel": 1,
        "ServerWorldLevel": 1,
        "ServerSignature": "Server Signature",
        "WelcomeEmotes": [
            2007,
            1002,
            4010
        ],
        "WelcomeMotd": "Welcome to Grasscutter emu",
        "WelcomeMailTitle": "Welcome to Grasscutter!",
        "WelcomeMailSender": "Lawnmower",
        "WelcomeMailContent": "Hi there!\r\nFirst of all, welcome to Grasscutter. If you have any issues, please let us know so that Lawnmower can help you! \r\n\r\nCheck out our:\r\n<type=\"browser\" text=\"Discord\" href=\"https://discord.gg/T5vZU6UyeG\"/> <type=\"browser\" text=\"GitHub\" href=\"https://github.com/Melledy/Grasscutter\"/>",
        "WelcomeMailItems": [
            {
                "itemId": 13509,
                "itemCount": 1,
                "itemLevel": 1
            },
            {
                "itemId": 201,
                "itemCount": 10000,
                "itemLevel": 1
            }
        ],
        "EnableOfficialShop": true,
        "Game": {
            "ADVENTURE_EXP_RATE": 1.0,
            "MORA_RATE": 1.0,
            "DOMAIN_DROP_RATE": 1.0
        }
    }
}
```

</details>

## `DispatchServer`

- 类型：string

```json title="config.json"
{
    "DispatchServer": "{
    "Ip": "127.0.0.1",
    "PublicIp": "127.0.0.1",
    "Port": 443,
    "PublicPort": 0,
    "KeystorePath": "./keystore.p12",
    "KeystorePassword": "123456",
    "UseSSL": true,
    "FrontHTTPS": true,
    "CORS": false,
    "CORSAllowedOrigins": [
        "*"
    ],
    "AutomaticallyCreateAccounts": false,
    "defaultPermissions": [
        ""
    ],
    "GameServers": []
}"
}
```

## `LocaleLanguage`

- 类型：string

```json title="config.json"
{
    "LocaleLanguage": "zh_CN"
}
```

## `DefaultLanguage`

- 类型：string

```json title="config.json"
{
    "DefaultLanguage": "en"
}
```

## `OpenStamina`

- 类型：boolean

```json title="config.json"
{
    "OpenStamina": true
}
```