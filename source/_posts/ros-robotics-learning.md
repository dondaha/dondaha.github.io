---
layout: posts
title: ROS1与机器人仿真学习
date: 2025-03-19 01:21:27
tags: [控制,机器人]
categories: 机器人
cover : https://notes.sjtu.edu.cn/uploads/upload_e58d24f3473a34c2b0b9fd0635cd6333.png
---

## 快捷导航

ROS官方urdf教程：http://wiki.ros.org/urdf/Tutorials

## 常用指令

## tf部分

### 发布static transform

```bash
rosrun tf2_ros static_transform_publisher x y z yaw pitch roll frame_id child_frame_id
rosrun tf2_ros static_transform_publisher x y z qx qy qz qw frame_id child_frame_id
```

例如：

```bash
rosrun tf2_ros static_transform_publisher 0 0 0 0 1 0 world a1
```

可以看到：

```bash 
ddh@LAPTOP-DDH:~/catkin_ws$ rostopic list
/rosout
/rosout_agg
/tf_static
```

以及：

```bash
ddh@LAPTOP-DDH:~/catkin_ws$ rostopic echo /tf_static
transforms: 
  - 
    header: 
      seq: 0
      stamp: 
        secs: 1742455016
        nsecs: 768368367
      frame_id: "world"
    child_frame_id: "a1"
    transform: 
      translation: 
        x: 0.0
        y: 0.0
        z: 0.0
      rotation: 
        x: 0.0
        y: 0.479425538604
        z: 0.0
        w: 0.87758256189
---
```

使用launch文件发布的方式：
```xml
<launch>
    <node pkg="tf2_ros" type="static_transform_publisher" name="link1_broadcaster"
        args="1 0 0 0 0 0 1 link1_parent link1" />
</launch>
```

### 