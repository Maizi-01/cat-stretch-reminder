# 小猫伸展提醒器

一个可以直接在浏览器里使用的久坐提醒工具。

你可以按照自己的节奏设置提醒时间，比如 5 分钟、15 分钟、25 分钟，或者自定义一个时间。时间到了之后，小猫会通过语音提醒你伸展肩颈、看看远处、喝水，或者短暂休息一下。

提醒结束后，不需要手动重新开始，它会自动进入下一轮倒计时，持续循环提醒。适合工作、学习、写作、剪视频，或者任何容易一坐很久的场景。

## 功能特点

- 直接在浏览器中使用，无需安装
- 支持自定义提醒时间
- 到点后自动语音提醒
- 提醒结束后自动开启下一轮循环
- 不需要每次手动重启
- 支持开始、暂停和重置
- 支持浏览器通知
- 卡通小猫风格界面
- 纯静态网页，不需要后端服务

## 使用方式

### 在线使用

有网络时，可以直接打开：

[打开小猫伸展提醒器](https://maizi-01.github.io/cat-stretch-reminder/)

### 下载到本地使用

如果你想在没有网络的时候使用，可以先把项目下载到电脑里：

[下载 ZIP 压缩包](https://github.com/Maizi-01/cat-stretch-reminder/archive/refs/heads/main.zip)

下载后解压，打开文件夹里的 `index.html` 即可使用。图片、样式和提醒音频都在项目文件夹里，下载完成后不依赖外部服务。

如果浏览器通知、桌面安装或部分权限功能受限制，可以在项目文件夹里启动本地服务器：

```bash
npm run preview
```

然后访问：

```text
http://localhost:4173/
```

## 预览

![桌面版预览](assets/screenshots/desktop.png)

## 开发者说明

如果你想修改代码或参与贡献，可以把项目下载到本地后使用上面的本地服务器方式预览。这个项目是纯静态网页，不需要后端服务。

## 项目结构

```text
.
├── assets/                 # 图片和提醒音频
│   └── screenshots/         # README 预览截图
├── index.html              # 页面入口
├── styles.css              # 样式
├── script.js               # 计时、提醒和交互逻辑
├── service-worker.js       # PWA 离线支持
├── manifest.webmanifest    # 安装到桌面/主屏幕的配置
├── desktop-launcher.zsh    # macOS 本地启动脚本
└── netlify.toml            # Netlify 静态部署配置
```

## 贡献

欢迎提交 Issue 或 Pull Request。贡献前可以先看 [CONTRIBUTING.md](CONTRIBUTING.md)。

## License

本项目基于 [MIT License](LICENSE) 开源。
