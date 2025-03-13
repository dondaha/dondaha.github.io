---
title: 在windows上挂载ext4硬盘——使用WSL2
comments: true
toc: true
donate: true
share: true
date: 2025-03-12 00:00:08
categories: Linux
tags: [linux,ext4]
cover: https://notes.sjtu.edu.cn/uploads/upload_d8b1400126a70f6b6d40ddca563b7ac1.png
---

## 找到硬盘对应的ID

在管理员powershell中输入：

```shell
GET-CimInstance -query "SELECT * from Win32_DiskDrive"
```

得到如下内容：

```
DeviceID           Caption                              Partitions Size          Model
--------           -------                              ---------- ----          -----
\\.\PHYSICALDRIVE1 Realtek RTL9210B-CG SCSI Disk Device 3          1024203640320 Realtek RTL9210B-CG SCSI Disk Device
\\.\PHYSICALDRIVE0 TOPMORE Libra                        4          2048407280640 TOPMORE Libra
```

这里的`\\.\PHYSICALDRIVE1`就是我们的移动硬盘。

## 挂载硬盘

首先进入我们的WSL2中，输入`lsblk`，出现如下：

```
(base) ddh@LAPTOP-DDH:~$ lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda      8:0    0 388.6M  1 disk
sdb      8:16   0     4G  0 disk [SWAP]
sdc      8:32   0     1T  0 disk /snap
                                 /mnt/wslg/distro
                                 /
sdd      8:48   0 953.9G  0 disk
├─sdd1   8:49   0    16M  0 part
├─sdd2   8:50   0   300M  0 part
└─sdd3   8:51   0 953.5G  0 part /mnt/wsl/PHYSICALDRIVE1p3
```

这里的sdd就是我们的移动硬盘，接着在windows的管理员powershell里输入：

```shell
wsl --mount \\.\PHYSICALDRIVE1 --partition 3 --type ext4
```

注意这里的`\\.\PHYSICALDRIVE1`是我们刚才找到的硬盘ID，``--partition 3``是指我们要挂载的分区，对应刚才的sdd3。

随后我们就能在wsl2的`/mnt/wsl/PHYSICALDRIVE1p3`下找到我们的硬盘了，甚至可以在win11的文件管理器中直接访问。

![](https://notes.sjtu.edu.cn/uploads/upload_3c51a596838f1138990b7e60cab36498.png)