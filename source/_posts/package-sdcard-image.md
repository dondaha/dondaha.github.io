---
layout: posts
title: 嵌入式Linux系统镜像制作（基于SD卡）
date: 2025-02-28 15:15:49
tags: [RK3588,硬件,嵌入式]
categories: 嵌入式
cover: https://notes.sjtu.edu.cn/uploads/upload_7d675c6e53588f2dad22ac0dbd774912.jpg
---

最近在给客户做一个大屏展示的项目，需要单板机开机就大屏显示一个网页，但配置环境非常困难，因此选择了直接打包系统镜像烧录在sd卡中，将sd卡直接给到客户，本文记录一下在linux主机上对sd卡打包镜像的过程。

## 准备工作
1、一台linux PC

2、树莓派SD卡

3、读卡器

## 减小sd卡没有使用的空间

使用GParted将sd卡中最大的分区缩减，让空间尽可能小，这样打包出来的镜像也会小一些。

先在右上角选择我们的sd卡，然后右键/dev/sdb1分区，选择resize/move，将空间缩小一些。我的图片中是已经缩小过的。

![](https://notes.sjtu.edu.cn/uploads/upload_d4886010ce3edf6d2731d62403e2b6b2.png)

然后我们计算sd卡中存在数据的前半部分的大小，例如我的是：


16.00 MiB + 9.87 GiB < 10240MiB

然后我们记住这个10240MiB，我们将在下一步使用。

## 开始备份

```bash
sudo dd if=/dev/sdb of=sdcard.bin bs=1M count=10240 status=progress
```
输出：
```
radxa@rock-5b-plus:~$ sudo dd if=/dev/sdb of=DeepOceanAdventure.bin bs=1M count=10240 status=progress
[sudo] password for radxa: 
10735321088 bytes (11 GB, 10 GiB) copied, 142 s, 75.6 MB/s 
10240+0 records in
10240+0 records out
10737418240 bytes (11 GB, 10 GiB) copied, 142.688 s, 75.3 MB/s
```

这里的if是输入文件，我们的sd卡是/dev/sdb，of是输出文件，我们的输出文件是sdcard.bin，bs是每次读写的大小，count是读写的次数，status=progress是显示进度。bs是每次复制的大小，这里设为1MiB，count设置为10240是因为我们只需要备份前10240MiB的数据。

随后我们就得到了一个sdcard.bin的文件，这个文件就是我们的sd卡的镜像。我们可以使用[BalenaEtcher](https://etcher.balena.io/)软件烧写这个镜像。
