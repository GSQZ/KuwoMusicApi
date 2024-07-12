# KuwoMusicApi

## 项目简介

KuwoMusicApi 是一个通过传入参数 `{歌名} {歌手}` 可以直接获取某首歌曲的 URL 的 API，适用于网易云解灰等项目。这个项目使用了 Express 框架和 Axios 库。

## 功能

通过传入参数 `{歌名} {歌手}`，可以获取指定歌曲的 URL。

## 使用方法

### 1. 安装依赖

首先，确保你已经安装了 Node.js 和 npm。然后在项目根目录下运行以下命令来安装依赖：

```bash
npm install
```

### 2. 启动服务器

在项目根目录下运行以下命令来启动服务器：

```bash
npm start
```

默认情况下，服务器会在端口 3005 运行。

### 3. 获取歌曲 URL

通过以下 URL 形式传入参数 `{歌名} {歌手}` 来获取指定歌曲的 URL：

```
http://localhost:3005/getMusicUrl?keyword=最伟大的作品 周杰伦
```

**推荐使用 `{歌名} {歌手}` 的方式传入参数，这样获取到的链接会更准确。**

## 示例

假设你想获取周杰伦的歌曲《最伟大的作品》的 URL，可以这样请求：

```
http://localhost:3005/getMusicUrl?keyword=最伟大的作品 周杰伦
```

服务器会返回该歌曲的 URL。

## 贡献

欢迎贡献代码或提出建议。如果你发现任何问题或有改进意见，请提交 issue 或 pull request。

## 许可

本项目使用 GNU General Public License v3.0。详情请参见 [LICENSE 文件](./LICENSE)。