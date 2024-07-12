# KuwoMusicApi

## 项目简介

KuwoMusicApi 是一个通过传入参数 `{歌名} {歌手}` 可以直接获取某首歌曲的 URL 和基础信息的 API，适用于网易云解灰等项目。这个项目使用了 Express 框架和 Axios 库。

## 功能

通过传入参数 `{歌名} {歌手} {时长}`等信息，可以获取指定歌曲的 URL。  
支持获取`standard`, `exhigh`, `lossless`, `hires`四中音质的播放 URL。

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

## 示例

假设你想获取周杰伦的歌曲《最伟大的作品》的 URL，可以这样请求：

### 1. 模糊查找
```
http://localhost:3005/first-geturl?keyword=最伟大的作品 周杰伦&quality=lossless
```
模糊查找模式下，服务器通过用户传输的搜索关键词进行查找，并选取第一个为结果，不对结果进行验证  
参数说明如下: 
 - keyword: 搜索关键词，取搜索结果的第一项
 - quality: 音质

### 2. 精确查找
```
http://localhost:3005/precise-get?songname=最伟大的作品&artist=周杰伦&duration=244&quality=lossless
```
精确查找模式下，服务器会通过用户提交的数据对搜索结果进行验证。只有验证通过了才会响应播放地址。这可以解决一些情况下搜索接口胡言乱语的问题。
参数说明如下: 
 - songname: 歌曲名
 - artist: 歌手名，多个歌手用`&`分割
 - duration: （可选）歌曲时长（秒），不填时可留空，或者填写不可以被转化为Number的对象，例如`naiy`, `lodash`, `hello world`等
 - quality: 音质

### 3. id获取
```
http://localhost:3005/url?id=226543302&quality=lossless
```
如果你知道歌曲id，可以使用此模式
参数说明如下: 
 - id: 歌曲id
 - quality: 音质

服务器会返回该歌曲的 URL。

## 贡献

欢迎贡献代码或提出建议。如果你发现任何问题或有改进意见，请提交 issue 或 pull request。

## 许可

本项目使用 GNU General Public License v3.0。详情请参见 [LICENSE 文件](./LICENSE)。