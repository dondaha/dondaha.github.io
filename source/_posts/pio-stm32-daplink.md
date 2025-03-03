---
title: 在PlatformIO中编程STM32时使用DAPLink
comments: true
toc: true
donate: true
share: true
date: 2024-12-05 15:19:21
categories:
tags:
cover: https://notes.sjtu.edu.cn/uploads/upload_50c675fdea9c6e8fa301f61e67fc7c4a.png
---

## 在PlatformIO中编程STM32时使用DAPLink

修改`platformio.ini`文件

```ini
[env:genericSTM32F103C8]
platform = ststm32
board = genericSTM32F103C8
framework = arduino
upload_protocol = cmsis-dap
```

即可直接upload