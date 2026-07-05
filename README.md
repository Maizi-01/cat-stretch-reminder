# 小猫伸展提醒器

一个纯前端的番茄式久坐提醒器。它会在设定时间后提醒你伸展肩颈、看看远处、喝水或短暂休息，也可以开启语音提醒和浏览器通知。

## 在线访问

[打开小猫伸展提醒器](https://maizi-01.github.io/cat-stretch-reminder/)

## 预览

![桌面版预览](assets/screenshots/desktop.png)

## 功能

- 5 / 10 / 15 / 25 / 45 分钟和自定义提醒间隔
- 开始、暂停、重置
- Web Speech API 中文语音提醒
- 支持播放 `assets/audio/reminder-01.mp3` 到 `reminder-10.mp3` 的自定义录音
- 可选浏览器通知
- 多条关心文案循环播放
- 卡通小猫风格网页界面，优先适配桌面浏览器
- 支持安装到桌面
- 纯静态部署，不需要后端服务

## 开发者说明

如果只是使用这个工具，直接点击上面的在线访问链接即可。

如果你想修改代码或参与贡献，可以把项目下载到本地后启动预览服务：

```bash
npm run preview
```

然后访问：

```text
http://localhost:4173/
```

这个项目是纯静态网页，不需要后端服务。

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
