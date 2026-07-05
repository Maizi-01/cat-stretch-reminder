# 小猫伸展提醒器

一个纯前端的番茄式久坐提醒器。它会在设定时间后提醒你伸展肩颈、看看远处、喝水或短暂休息，也可以开启语音提醒和浏览器通知。

## 预览

![桌面版预览](assets/screenshots/desktop.png)

![移动端预览](assets/screenshots/mobile.png)

## 功能

- 5 / 10 / 15 / 25 / 45 分钟和自定义提醒间隔
- 开始、暂停、重置
- Web Speech API 中文语音提醒
- 支持播放 `assets/audio/reminder-01.mp3` 到 `reminder-10.mp3` 的自定义录音
- 可选浏览器通知
- 多条关心文案循环播放
- 卡通小猫风格界面，支持移动端
- 支持安装到桌面或手机主屏幕
- 纯静态部署，不需要后端服务

## 本地使用

直接用浏览器打开 `index.html` 即可。

也可以启动本地服务器：

```bash
npm run preview
```

或者：

```bash
python3 -m http.server 4173
```

然后访问：

```text
http://localhost:4173/
```

## 部署

这是一个纯静态网页，不需要后端。推荐任选一种方式发布：

1. GitHub Pages：把这些文件放到仓库根目录，进入 `Settings -> Pages`，选择从 `main` 分支根目录部署。
2. Netlify：把整个项目文件夹拖到 Netlify 的 Deploy 页面。
3. Vercel：新建 Project，导入这个仓库，Framework Preset 选 `Other`。

发布后，把生成的 `https://...` 链接发给朋友即可。浏览器通知通常需要 HTTPS，部署后的链接可以正常申请通知权限。

## 开源发布到 GitHub

```bash
git init
git add .
git commit -m "Initial open source release"
git branch -M main
git remote add origin https://github.com/你的用户名/cat-stretch-reminder.git
git push -u origin main
```

如果你已经在 GitHub 页面上创建了仓库，把上面的 `你的用户名` 改成你的 GitHub 用户名即可。

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
