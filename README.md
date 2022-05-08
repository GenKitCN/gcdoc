# Grasscutter Documention | 割草机文档

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

此网页使用[Docusaurus 2](https://docusaurus.io/)创建，这是一个现代化网页生成器

**English Version comming soon！**

**英文版本很快就好**


### Installation
### 安装

```
$ yarn
```

### Local Development
### 本地开发

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

此命令会启动一个本地开发服务器并打开浏览器窗口，大部分改变会自动生效，无需重启服务器。

### Build
### 构建

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

此命令将会在`build`文件夹中生成静态文件以让您将其部署到任何静态网页托管服务器中

### Deployment
### 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Wansn-w/gcdoc&template=docusaurus-2)


Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
