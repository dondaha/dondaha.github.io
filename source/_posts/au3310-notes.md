---
title: AU3310计算机控制技术
comments: true
toc: true
donate: true
share: true
date: 2025-02-18 11:14:44
categories: 自动化课程
tags: [笔记,自动化,控制]
cover: https://notes.sjtu.edu.cn/uploads/upload_f528537514485bb417eda59aeb9690cf.png
mathjax: true
---

## Lecture 1: Introduction to Computer Control Technology

### 课程介绍

> Week 1, Class 1, 2025.2.18

Lecture 1: Introduction to Computer Control Technology

朱善迎 shyzhu@sjtu.edu.cn 微信号s14528707

- Wang Shuling(王淑玲), PhD student
  Wechat ID:  wsl17862707921
  E-mail: shulingwang2021_sjtu@sjtu.edu.cn
- Duan Mengmeng(段萌萌), PhD student 
  Wechat ID:  hhhoneybiubiu
  E-mail: duan_mm@sjtu.edu.cn

课本：

- C. L. Phillips, H. T. Nagle, A. Chakrabortty, **Digital Control System Analysisand Design**, 4th ed. Boston: Pearson, 2015
- Genke Yang, Jianying Xie, **Micro-computer Control Technology**, 4th ed. Changsha:National Defense Industry Press, 2016 (in Chinese)

分数组成：

- 20% homework assignments
- 10% group project（3人）
- 10% attendance & pop-up quizzes
- 60% final exam

### 无反馈控制系统

> 2025.2.25

系统：$G_p(s)$
控制器：$\frac{1}{G_p(s)}$

特点：控制器可能无法实现、对干扰的敏感程度高，对系统参数的敏感程度高

## Lecture 2 Feedback Principles

> 2025.03.29

使用反馈控制系统的原因：

1. 实际中很难获得精确的系统数学模型
2. 系统会有扰动
  
使用反馈的两大目的：

1. 设定值跟踪（Servo Problem）
2. 抗扰动能力（Regulation Problem）

## Lecture 3 Sampling and Reconstruction

> 2025.03.30

### A/D&D/A转换器

FSR 代表 "Full-Scale Range"（满量程范围）。
$$
\Delta = \frac{\text{full-scale range}}{\text{digital range}} = \frac{\text{FSR}}{2^N}
$$
其中 $N$ 是用于表示信号的位数。这个公式帮助确定每个量化级别之间的间隔大小。

![](https://notes.sjtu.edu.cn/uploads/upload_8bd7d612ef6a7c3e7f6e4156c6a98cbf.png)

截断(Truncation)与四舍五入(Round-off)，计控中一般用后者，误差为前者的1/2.

“quantization levels”（量化级）是指在进行模拟到数字转换时，将连续的模拟信号划分为若干个离散的等级或层次。这些等级的数量由 $L$表示。一般要求：

$$
N \geq log_2 L
$$

### **Weighted adder D/A**

加权加法数模转换器

输入的数字：$n = \sum_{i=1}^{N} B_i 2^{i-1},\quad B_i = 0 \text{ or } 1$

![](https://notes.sjtu.edu.cn/uploads/upload_06fd2ca3e8815da876ee240343a4c507.png)

简化后的模型：

![](https://notes.sjtu.edu.cn/uploads/upload_f33b7e7fb6e8abec459d73a7ecddf728.png)

其中的xR代表并联的电阻：$\frac{1}{xR} = \sum_{i=1}^{N} \frac{B_i}{2^{N+1-i} R}$

计算得到$I = \frac{V_{\text{ref}}^+ - V_{\text{ref}}^-}{xR} + \frac{V_{\text{ref}}^-}{R}$

从而得到输出电压$V(n)$：

$$
V(n) = \frac{R_f}{R}\left[V_{\text{ref}}^- + (V_{\text{ref}}^+ - V_{\text{ref}}^-)\sum_{i=1}^{N} \frac{B_i}{2^{N+1-i}}\right] = \frac{R_f}{R}(V_{\text{ref}}^- + n\Delta V)
$$

其中$\Delta V = \frac{V_{\text{ref}}^+ - V_{\text{ref}}^-}{2^N}$

优缺点：设计简单，但在同一集成电路芯片上精确制造出宽范围的电阻值是不可能的。

*Example1：*

![](https://notes.sjtu.edu.cn/uploads/upload_a13d073e3dcd15bd84424dddbaf07194.png)

套公式得到：

$$
V(n) = \frac{10}{12.5}(0+n\times \frac{5-0}{2^4}) = 0.25n\, V
$$

### **R-2R resistive-ladder D/A**

R-2R电阻梯形数模转换器

![](https://notes.sjtu.edu.cn/uploads/upload_5bb3c5a644a8c1826caa236f6d584f98.png)

$V(n)$的计算：

可以观察到下面整体的等效电阻为$R$，所以总电流有：

$$
\frac{V_{ref}^+ - V_{ref}^-}{R} = 2^N I_1
$$

然后流入$R_f$的电流为：

$$
I=\sum_{i=1}^{N} {2^{i-1}B_i I_1}+\frac{V_{ref}^-}{R}=nI_1+\frac{V_{ref}^-}{R}
$$

因此输出电压为：

$$
V(n) = (nI_1+\frac{V_{ref}^-}{R})R_f =\frac{R_f}{R}V_{ref}^-+nR_f\times \frac{V_{ref}^=-V_{ref}^-}{R\times 2^N}= \frac{R_f}{R}(V_{ref}^- + n\Delta V)
$$

其中$\Delta V = \frac{V_{\text{ref}}^+ - V_{\text{ref}}^-}{2^N}$

优缺点：仅使用两种电阻值，即𝑅和2𝑅，这使得制造和集成变得简单且精确。

### **Successive-approximation A/D**

逐次逼近式模数转换器

![](https://notes.sjtu.edu.cn/uploads/upload_241b2f2e04b9d22c08bf6c00525a4f2d.png)

![](https://notes.sjtu.edu.cn/uploads/upload_60f8571dbb21bdebb9eeb97b56dc1321.png)

*Example2：*

Let’s take a specific example of a 4-bit successive A/D conversion. Assume the D/A converter has $𝑉_{ref}^-=0$and$\Delta V=1V$. Determine the digital output for the input voltage 5.1 V and the quantization error.

solution:

$V(2^3)=8V>5.1V,\quad B_4=0$
$V(2^2)=4V<5.1V,\quad B_3=1$
$V(2^2+2^1)=6V>5.1V,\quad B_2=0$
$V(2^2+2^0)=6V<5.1V,\quad B_1=1$

so the digital output is $B_4B_3B_2B_1=0101$

quantization error: $5-5.1=-0.1V$

### **Dual-slope A/D converter**

双斜坡模数转换器

![](https://notes.sjtu.edu.cn/uploads/upload_3de8fbdc66e1bbbf4cc82d6d8a181268.png)

原理：S1打开固定的时间数n1充电，然后测量S2打开的时间数n2放电，得到关系：

$$
V_1n_1 = V_{ref}n_2
$$

$\frac{n_2}{n_1}$就是数字量化的结果。

优点：非常准确，不依赖电阻和电容的值或者时钟周期，积分过程还能滤除噪音。
缺点：速度慢，需要$2^N$个时钟周期

### **Flash A/D**

Flash A/D Converter（闪存模数转换器）是一种非常快速的模数转换技术，它通过并行比较多个电压级别来确定输入模拟信号的数字值。

![](https://notes.sjtu.edu.cn/uploads/upload_2e8f50ca9712e3fd973e7bac8d5597d4.png)

优点:非常高的速度，通常不需要采样、保持电路
缺点:对于宽位转换来说非常昂贵，准确度受电阻链准确度的限制
