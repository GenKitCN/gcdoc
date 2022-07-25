## `folderStructure`

- 类型: `Object`

Descriptions here.

```json title="config.json"
{
    "folderStructure": {
        "resources": "./resources/",
        "data": "./data/",
        "packets": "./packets/",
        "scripts": "./resources/Scripts/",
        "plugins": "./plugins/"
    }
}
```


| 配置键 | 类型 | 默认值 |
| ------ | ---- | ------ |
| resources | Object | ./resources/ |
| data | Object | ./data/ |
| packets | Object | ./packets/ |
| scripts | Object | ./resources/Scripts/ |
| plugins | Object | ./plugins/ |

## `databaseInfo`

- 类型: `Object`

Descriptions here.

```json title="config.json"
{
    "databaseInfo": {
        "server": {
            "connectionUri": "mongodb://localhost:27017",
            "collection": "grasscutter"
        },
        "game": {
            "connectionUri": "mongodb://localhost:27017",
            "collection": "grasscutter"
        }
    }
}
```

### `server`

- 类型: `Object`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "server": {
        "connectionUri": "mongodb://localhost:27017",
        "collection": "grasscutter"
    }
}
```


| 配置键 | 类型 | 默认值 |
| ------ | ---- | ------ |
| connectionUri | Object | mongodb://localhost:27017 |
| collection | Object | grasscutter |### `game`

- 类型: `Object`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "game": {
        "connectionUri": "mongodb://localhost:27017",
        "collection": "grasscutter"
    }
}
```


| 配置键 | 类型 | 默认值 |
| ------ | ---- | ------ |
| connectionUri | Object | mongodb://localhost:27017 |
| collection | Object | grasscutter |

## `language`

- 类型: `Object`

Descriptions here.

```json title="config.json"
{
    "language": {
        "language": "zh_CN",
        "fallback": "en_US",
        "document": "EN"
    }
}
```


| 配置键 | 类型 | 默认值 |
| ------ | ---- | ------ |
| language | Object | zh_CN |
| fallback | Object | en_US |
| document | Object | EN |

## `account`

- 类型: `Object`

Descriptions here.

```json title="config.json"
{
    "account": {
        "autoCreate": false,
        "EXPERIMENTAL_RealPassword": false,
        "defaultPermissions": [],
        "maxPlayer": -1
    }
}
```


| 配置键 | 类型 | 默认值 |
| ------ | ---- | ------ |
| autoCreate | Object | False |
| EXPERIMENTAL_RealPassword | Object | False |
| defaultPermissions | Object | [] |
| maxPlayer | Object | -1 |

## `server`

- 类型: `Object`

Descriptions here.

```json title="config.json"
{
    "server": {
        "debugWhitelist": [],
        "debugBlacklist": [],
        "runMode": "HYBRID",
        "http": {
            "bindAddress": "0.0.0.0",
            "bindPort": 443,
            "accessAddress": "127.0.0.1",
            "accessPort": 0,
            "encryption": {
                "useEncryption": true,
                "useInRouting": true,
                "keystore": "./keystore.p12",
                "keystorePassword": "123456"
            },
            "policies": {
                "cors": {
                    "enabled": false,
                    "allowedOrigins": [
                        "*"
                    ]
                }
            },
            "files": {
                "indexFile": "./index.html",
                "errorFile": "./404.html"
            }
        },
        "game": {
            "bindAddress": "0.0.0.0",
            "bindPort": 22102,
            "accessAddress": "127.0.0.1",
            "accessPort": 0,
            "loadEntitiesForPlayerRange": 100,
            "enableScriptInBigWorld": false,
            "enableConsole": true,
            "kcpInterval": 20,
            "logPackets": "NONE",
            "gameOptions": {
                "inventoryLimits": {
                    "weapons": 2000,
                    "relics": 2000,
                    "materials": 2000,
                    "furniture": 2000,
                    "all": 30000
                },
                "avatarLimits": {
                    "singlePlayerTeam": 4,
                    "multiplayerTeam": 4
                },
                "sceneEntityLimit": 1000,
                "watchGachaConfig": false,
                "enableShopItems": true,
                "staminaUsage": true,
                "energyUsage": false,
                "resinOptions": {
                    "resinUsage": false,
                    "cap": 160,
                    "rechargeTime": 480
                },
                "rates": {
                    "adventureExp": 1.0,
                    "mora": 1.0,
                    "leyLines": 1.0
                }
            },
            "joinOptions": {
                "welcomeEmotes": [
                    2007,
                    1002,
                    4010
                ],
                "welcomeMessage": "Welcome to a Grasscutter server.",
                "welcomeMail": {
                    "title": "Welcome to Grasscutter!",
                    "content": "Hi there!\r\nFirst of all, welcome to Grasscutter. If you have any issues, please let us know so that Lawnmower can help you! \r\n\r\nCheck out our:\r\n<type=\"browser\" text=\"Discord\" href=\"https://discord.gg/T5vZU6UyeG\"/>\n",
                    "sender": "Lawnmower",
                    "items": [
                        {
                            "itemId": 13509,
                            "itemCount": 1,
                            "itemLevel": 1
                        },
                        {
                            "itemId": 201,
                            "itemCount": 99999,
                            "itemLevel": 1
                        }
                    ]
                }
            },
            "serverAccount": {
                "avatarId": 10000007,
                "nameCardId": 210001,
                "adventureRank": 1,
                "worldLevel": 0,
                "nickName": "Server",
                "signature": "Welcome to Grasscutter!"
            }
        },
        "dispatch": {
            "regions": [],
            "defaultName": "Grasscutter",
            "logRequests": "NONE"
        }
    }
}
```

### `debugWhitelist`

- 类型: `List`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "debugWhitelist": []
}
```

### `debugBlacklist`

- 类型: `List`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "debugBlacklist": []
}
```

### `runMode`

- 类型: `String`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "runMode": "HYBRID"
}
```

### `http`

- 类型: `Object`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "http": {
        "bindAddress": "0.0.0.0",
        "bindPort": 443,
        "accessAddress": "127.0.0.1",
        "accessPort": 0,
        "encryption": {
            "useEncryption": true,
            "useInRouting": true,
            "keystore": "./keystore.p12",
            "keystorePassword": "123456"
        },
        "policies": {
            "cors": {
                "enabled": false,
                "allowedOrigins": [
                    "*"
                ]
            }
        },
        "files": {
            "indexFile": "./index.html",
            "errorFile": "./404.html"
        }
    }
}
```

#### `bindAddress`

- 类型: `String`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "bindAddress": "0.0.0.0"
}
```

#### `bindPort`

- 类型: `Integer`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "bindPort": 443
}
```

#### `accessAddress`

- 类型: `String`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "accessAddress": "127.0.0.1"
}
```

#### `accessPort`

- 类型: `Integer`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "accessPort": 0
}
```

#### `encryption`

- 类型: `Object`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "encryption": {
        "useEncryption": true,
        "useInRouting": true,
        "keystore": "./keystore.p12",
        "keystorePassword": "123456"
    }
}
```


| 配置键 | 类型 | 默认值 |
| ------ | ---- | ------ |
| useEncryption | Object | True |
| useInRouting | Object | True |
| keystore | Object | ./keystore.p12 |
| keystorePassword | Object | 123456 |#### `policies`

- 类型: `Object`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "policies": {
        "cors": {
            "enabled": false,
            "allowedOrigins": [
                "*"
            ]
        }
    }
}
```

##### `cors`

- 类型: `Object`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "cors": {
        "enabled": false,
        "allowedOrigins": [
            "*"
        ]
    }
}
```


| 配置键 | 类型 | 默认值 |
| ------ | ---- | ------ |
| enabled | Object | False |
| allowedOrigins | Object | ['*'] |#### `files`

- 类型: `Object`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "files": {
        "indexFile": "./index.html",
        "errorFile": "./404.html"
    }
}
```


| 配置键 | 类型 | 默认值 |
| ------ | ---- | ------ |
| indexFile | Object | ./index.html |
| errorFile | Object | ./404.html |### `game`

- 类型: `Object`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "game": {
        "bindAddress": "0.0.0.0",
        "bindPort": 22102,
        "accessAddress": "127.0.0.1",
        "accessPort": 0,
        "loadEntitiesForPlayerRange": 100,
        "enableScriptInBigWorld": false,
        "enableConsole": true,
        "kcpInterval": 20,
        "logPackets": "NONE",
        "gameOptions": {
            "inventoryLimits": {
                "weapons": 2000,
                "relics": 2000,
                "materials": 2000,
                "furniture": 2000,
                "all": 30000
            },
            "avatarLimits": {
                "singlePlayerTeam": 4,
                "multiplayerTeam": 4
            },
            "sceneEntityLimit": 1000,
            "watchGachaConfig": false,
            "enableShopItems": true,
            "staminaUsage": true,
            "energyUsage": false,
            "resinOptions": {
                "resinUsage": false,
                "cap": 160,
                "rechargeTime": 480
            },
            "rates": {
                "adventureExp": 1.0,
                "mora": 1.0,
                "leyLines": 1.0
            }
        },
        "joinOptions": {
            "welcomeEmotes": [
                2007,
                1002,
                4010
            ],
            "welcomeMessage": "Welcome to a Grasscutter server.",
            "welcomeMail": {
                "title": "Welcome to Grasscutter!",
                "content": "Hi there!\r\nFirst of all, welcome to Grasscutter. If you have any issues, please let us know so that Lawnmower can help you! \r\n\r\nCheck out our:\r\n<type=\"browser\" text=\"Discord\" href=\"https://discord.gg/T5vZU6UyeG\"/>\n",
                "sender": "Lawnmower",
                "items": [
                    {
                        "itemId": 13509,
                        "itemCount": 1,
                        "itemLevel": 1
                    },
                    {
                        "itemId": 201,
                        "itemCount": 99999,
                        "itemLevel": 1
                    }
                ]
            }
        },
        "serverAccount": {
            "avatarId": 10000007,
            "nameCardId": 210001,
            "adventureRank": 1,
            "worldLevel": 0,
            "nickName": "Server",
            "signature": "Welcome to Grasscutter!"
        }
    }
}
```

#### `bindAddress`

- 类型: `String`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "bindAddress": "0.0.0.0"
}
```

#### `bindPort`

- 类型: `Integer`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "bindPort": 22102
}
```

#### `accessAddress`

- 类型: `String`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "accessAddress": "127.0.0.1"
}
```

#### `accessPort`

- 类型: `Integer`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "accessPort": 0
}
```

#### `loadEntitiesForPlayerRange`

- 类型: `Integer`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "loadEntitiesForPlayerRange": 100
}
```

#### `enableScriptInBigWorld`

- 类型: `Integer`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "enableScriptInBigWorld": false
}
```

#### `enableConsole`

- 类型: `Integer`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "enableConsole": true
}
```

#### `kcpInterval`

- 类型: `Integer`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "kcpInterval": 20
}
```

#### `logPackets`

- 类型: `String`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "logPackets": "NONE"
}
```

#### `gameOptions`

- 类型: `Object`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "gameOptions": {
        "inventoryLimits": {
            "weapons": 2000,
            "relics": 2000,
            "materials": 2000,
            "furniture": 2000,
            "all": 30000
        },
        "avatarLimits": {
            "singlePlayerTeam": 4,
            "multiplayerTeam": 4
        },
        "sceneEntityLimit": 1000,
        "watchGachaConfig": false,
        "enableShopItems": true,
        "staminaUsage": true,
        "energyUsage": false,
        "resinOptions": {
            "resinUsage": false,
            "cap": 160,
            "rechargeTime": 480
        },
        "rates": {
            "adventureExp": 1.0,
            "mora": 1.0,
            "leyLines": 1.0
        }
    }
}
```

##### `inventoryLimits`

- 类型: `Object`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "inventoryLimits": {
        "weapons": 2000,
        "relics": 2000,
        "materials": 2000,
        "furniture": 2000,
        "all": 30000
    }
}
```


| 配置键 | 类型 | 默认值 |
| ------ | ---- | ------ |
| weapons | Object | 2000 |
| relics | Object | 2000 |
| materials | Object | 2000 |
| furniture | Object | 2000 |
| all | Object | 30000 |##### `avatarLimits`

- 类型: `Object`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "avatarLimits": {
        "singlePlayerTeam": 4,
        "multiplayerTeam": 4
    }
}
```


| 配置键 | 类型 | 默认值 |
| ------ | ---- | ------ |
| singlePlayerTeam | Object | 4 |
| multiplayerTeam | Object | 4 |##### `sceneEntityLimit`

- 类型: `Integer`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "sceneEntityLimit": 1000
}
```

##### `watchGachaConfig`

- 类型: `Integer`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "watchGachaConfig": false
}
```

##### `enableShopItems`

- 类型: `Integer`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "enableShopItems": true
}
```

##### `staminaUsage`

- 类型: `Integer`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "staminaUsage": true
}
```

##### `energyUsage`

- 类型: `Integer`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "energyUsage": false
}
```

##### `resinOptions`

- 类型: `Object`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "resinOptions": {
        "resinUsage": false,
        "cap": 160,
        "rechargeTime": 480
    }
}
```


| 配置键 | 类型 | 默认值 |
| ------ | ---- | ------ |
| resinUsage | Object | False |
| cap | Object | 160 |
| rechargeTime | Object | 480 |##### `rates`

- 类型: `Object`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "rates": {
        "adventureExp": 1.0,
        "mora": 1.0,
        "leyLines": 1.0
    }
}
```


| 配置键 | 类型 | 默认值 |
| ------ | ---- | ------ |
| adventureExp | Object | 1.0 |
| mora | Object | 1.0 |
| leyLines | Object | 1.0 |#### `joinOptions`

- 类型: `Object`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "joinOptions": {
        "welcomeEmotes": [
            2007,
            1002,
            4010
        ],
        "welcomeMessage": "Welcome to a Grasscutter server.",
        "welcomeMail": {
            "title": "Welcome to Grasscutter!",
            "content": "Hi there!\r\nFirst of all, welcome to Grasscutter. If you have any issues, please let us know so that Lawnmower can help you! \r\n\r\nCheck out our:\r\n<type=\"browser\" text=\"Discord\" href=\"https://discord.gg/T5vZU6UyeG\"/>\n",
            "sender": "Lawnmower",
            "items": [
                {
                    "itemId": 13509,
                    "itemCount": 1,
                    "itemLevel": 1
                },
                {
                    "itemId": 201,
                    "itemCount": 99999,
                    "itemLevel": 1
                }
            ]
        }
    }
}
```

##### `welcomeEmotes`

- 类型: `List`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "welcomeEmotes": [
        2007,
        1002,
        4010
    ]
}
```

##### `welcomeMessage`

- 类型: `String`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "welcomeMessage": "Welcome to a Grasscutter server."
}
```

##### `welcomeMail`

- 类型: `Object`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "welcomeMail": {
        "title": "Welcome to Grasscutter!",
        "content": "Hi there!\r\nFirst of all, welcome to Grasscutter. If you have any issues, please let us know so that Lawnmower can help you! \r\n\r\nCheck out our:\r\n<type=\"browser\" text=\"Discord\" href=\"https://discord.gg/T5vZU6UyeG\"/>\n",
        "sender": "Lawnmower",
        "items": [
            {
                "itemId": 13509,
                "itemCount": 1,
                "itemLevel": 1
            },
            {
                "itemId": 201,
                "itemCount": 99999,
                "itemLevel": 1
            }
        ]
    }
}
```


| 配置键 | 类型 | 默认值 |
| ------ | ---- | ------ |
| title | Object | Welcome to Grasscutter! |
| content | Object | Hi there! First of all, welcome to Grasscutter. If you have any issues, please let us know so that Lawnmower can help you!   Check out our: <type="browser" text="Discord" href="https://discord.gg/T5vZU6UyeG"/>  |
| sender | Object | Lawnmower |
| items | Object | [{'itemId': 13509, 'itemCount': 1, 'itemLevel': 1}, {'itemId': 201, 'itemCount': 99999, 'itemLevel': 1}] |#### `serverAccount`

- 类型: `Object`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "serverAccount": {
        "avatarId": 10000007,
        "nameCardId": 210001,
        "adventureRank": 1,
        "worldLevel": 0,
        "nickName": "Server",
        "signature": "Welcome to Grasscutter!"
    }
}
```


| 配置键 | 类型 | 默认值 |
| ------ | ---- | ------ |
| avatarId | Object | 10000007 |
| nameCardId | Object | 210001 |
| adventureRank | Object | 1 |
| worldLevel | Object | 0 |
| nickName | Object | Server |
| signature | Object | Welcome to Grasscutter! |### `dispatch`

- 类型: `Object`

Descriptions here.

```json title="config.json $.{parent_key}.{key}"
{
    "dispatch": {
        "regions": [],
        "defaultName": "Grasscutter",
        "logRequests": "NONE"
    }
}
```


| 配置键 | 类型 | 默认值 |
| ------ | ---- | ------ |
| regions | Object | [] |
| defaultName | Object | Grasscutter |
| logRequests | Object | NONE |

## `version`

- 类型: `Integer`

Descriptions here.

```json title="config.json"
{
    "version": 3
}
```

