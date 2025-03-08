---
title: 在windows下用docker安装homeassistant
comments: true
toc: true
donate: true
share: true
date: 2025-03-08 22:00:00
author: dondaha
categories: HA
tags: [硬件, docker]
cover: https://notes.sjtu.edu.cn/uploads/upload_f4f66579b7c63741d5c5f2563e9dade9.png
---

## 第一步：创建配置文件目录

在安装 Home Assistant 之前，我们需要创建一个用于存放 Home Assistant 配置文件的目录。这个目录将映射到 Docker 容器中的 /config 目录。

打开文件资源管理器。
在 D: 盘创建一个名为 cache 的文件夹（如果不存在）。
在 cache 文件夹中创建一个名为 home-assistant-config 的文件夹。
最终的目录路径应该是：D:/cache/home-assistant-config

## 使用镜像站安装

```bash
docker run -d --name home-assistant --restart unless-stopped -p 8123:8123 -v D:/cache/home-assistant-config:/config docker.1ms.run/homeassistant/home-assistant:latest
```

命令详解：

- -d: 让容器以守护进程（后台）模式运行，这样你可以关闭终端而不影响容器的运行。
- --name home-assistant: 指定容器的名称为 home-assistant，这使得管理容器时更加方便。
- --restart unless-stopped: 配置容器在 Docker 重启时自动启动，除非你手动停止它。
- -p 8123:8123: 将容器的内部端口 8123 映射到主机的 8123 端口。这样你可以通过浏览器访问 http://localhost:8123 来使用 Home Assistant。
- -v D:\cache\home-assistant-config:/config: 将 Windows 的 D:\cache\home-assistant-config 目录映射到容器内的 /config 目录，Home Assistant 将在这个目录中存储配置文件。
- homeassistant/home-assistant:latest: 使用 Home Assistant 的最新 Docker 镜像来创建容器。

## 访问 Home Assistant

在 Docker 容器成功启动后，你可以通过浏览器访问 Home Assistant 的 Web 界面。

打开你的浏览器（如 Chrome、Edge）。
在地址栏中输入 http://localhost:8123。
你将看到 Home Assistant 的欢迎界面。按照页面上的提示，完成初始设置。
