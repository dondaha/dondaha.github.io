---
title: 命令行启动Chrome出现"Choose password for new keyring"的解决方法
comments: true
toc: true
donate: true
share: true
date: 2025-03-09 23:25:18
categories: Linux
tags: [debug]
cover: https://notes.sjtu.edu.cn/uploads/upload_128754ad5b871ab46531862840cc7319.png
---

*转自[StackOverFlow](https://askubuntu.com/questions/31786/chrome-asks-for-password-to-unlock-keyring-on-startup#:~:text=You%20can%20start%20chrome%20with%20the%20command%20line,Chrome%2C%20this%20question%20should%20not%20be%20a%20duplicate.):*

> You can start chrome with the command line google-chrome --password-store=basic so that it won't ask use the gnome keyring. See: code.google.com/p/chromium/wiki/LinuxPasswordStorage Because there is a workaround that is specific to Chrome, this question should not be a duplicate.

在启动命令中加入参数`--password-store=basic`即可解决。