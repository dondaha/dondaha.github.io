---
title: AU3312非线性系统
comments: true
toc: true
layout: posts
share: true
date: 2025-04-27 13:48:12
categories: 自动化课程
tags: [笔记,自动化,控制]
cover: https://notes.sjtu.edu.cn/uploads/upload_f528537514485bb417eda59aeb9690cf.png
mathjax: true
---

## Lec1. 非线性系统介绍

### 非线性系统的特点

| 特点 | 线性系统 | 非线性系统 |
| -------- | -------- | -------- |
| 叠加原理     |   满足   |  不满足    |
| 平衡点与稳定性     |  取决于A的特征值    |  不仅依赖于结构和参数，还与初始条件和外加输入信号等有关    |
| 自激振荡     |   无，运动只有收敛、发散、等幅振荡   |   没有外界周期信号，系统内产生固定振幅和频率的周期运动   |
| 频率响应     |   输入输出为同频的正弦信号   |  正弦信号作用下，其输出可能存在倍频振荡和分频振荡    |

### 典型的非线性特征

1. 死区特征

$$
y = \begin{cases} 
0 & |x| \leq \Delta \\
k[x - \Delta \cdot sign(x)] & |x| > \Delta 
\end{cases}
$$

![](https://notes.sjtu.edu.cn/uploads/upload_623c96b505592ad91838e5a0ee859251.png)

灵敏度下降，稳态误差加大；可以滤除小幅度震荡的信号，抗干扰。

2. 饱和特性

$$
y = \begin{cases} 
kx & |x| \leq g \\
kg \cdot sign(x) & |x| > g 
\end{cases} 
$$

![](https://notes.sjtu.edu.cn/uploads/upload_10877c15aa3980507f8c7d37d036b354.png)

降低稳定系统的开环增益，降低超调量、减弱振荡性，增大系统的静态误差。可能会使不稳定系统自激振荡。

3. 间隙特性

$$
\begin{aligned}
    y = \begin{cases} 
        -b & \dot{x} > 0, -a-\frac{b}{k}<x\leq a-\frac{b}{k} \\
        k(x-a) & \dot{x}>0,\quad a-\frac{b}{k}<x\leq a+\frac{b}{k}\\
        b & \dot{x}<0,-a+\frac{b}{k}\leq x\leq a+\frac{b}{k}\\
        k(x+a) & \dot{x}<0,-a-\frac{b}{k}\leq x\leq -a+\frac{b}{k}
    \end{cases}
\end{aligned}
$$

![](https://notes.sjtu.edu.cn/uploads/upload_ea315f5ace048fdc21347ee187282736.png)

这里b是可以变的，唯一不变的是间隙2a，如果x增大到很大，b也会随之增长到很大，联想物理意义，只有间隙不变。

增大系统的稳态误差，降低控制精度；使系统过渡过程的震荡加剧，甚至使系统变为不稳定。

4. 继电器特性

- (a) 双位特性
    - $y = M \cdot \text{sign}(x)$
- (b) 双位特性+滞环
    - $y = \begin{cases} 
        M \cdot \text{sign}(x), & |x| > h \\
        -M \cdot \text{sign}(x), & |x| < h 
        \end{cases}$
- (c) 三位特性+滞环
    - $y = \begin{cases} 
        M \cdot \text{sign}(x), & |x| > h_2 \\
        0, & |x| < h_1 \\
        \frac{M}{2} (\text{sign}(x) - \text{sign}(\dot{x})), & h_1 < |x| < h_2 
        \end{cases}$

![](https://notes.sjtu.edu.cn/uploads/upload_8894cb770c7f905069ce0eb9e0232832.png)

可以提高响应速度，但容易引发自振

### 非线性系统分析方法

1. 描述函数方法（谐波线性化法，频率法在非线性中的推广）
    - 优点：简单
    - 缺点：理论基础不完善；近似会丧失非线性信息，无法参透复杂现象的本质与特性
2. 相平面方法（图解分析一、二阶非线性系统，需绘制相轨迹）
    - 优点：无需求解就能获取系统运动性质的定性知识
    - 缺点：仅仅适用于一阶和二阶系统
> **相轨迹**是指在相空间中，系统状态随时间演化的轨迹。在动力系统中，相空间是由系统的状态变量（如位置和速度）所构成的空间。相轨迹表示系统状态在这些变量中的变化情况。
>具体来说，相轨迹可以用来分析非线性系统的动态行为。通过绘制相轨迹，我们可以直观地了解系统的运动特征，例如平衡点、周期轨道、混沌行为等。相平面方法是一种图解的方法，用于分析和理解一阶和二阶非线性系统的动态特性。
![](https://notes.sjtu.edu.cn/uploads/upload_b46e8acd6e882906d63211acc25fdb82.png)

3. 李亚普诺夫方法（第一方法：平衡点一阶近似得到局部稳定性；第二方法：能量函数）
    - 优点：理论上适合任何非线性系统
    - 缺点：难以构造Lyapunov函数
4. 微分几何控制理论
    - 优点：近年来的主流
    - 缺点：成果缺乏感性认知

## 描述函数定义

### 描述函数方法

> **傅里叶展开的定义**
> $$
f = \frac{A_0}{2} + \sum_{n=1}^{\infty} \left( A_n \cos nx + B_n \sin nx \right) \\
A_n = \frac{1}{\pi} \int_{-\pi}^{\pi} f(x) \cos(nx) \, dx \quad n = 0, 1, 2, \ldots  \\
B_n = \frac{1}{\pi} \int_{-\pi}^{\pi} f(x) \sin(nx) \, dx \quad n = 1, 2, \ldots 
$$

![](https://notes.sjtu.edu.cn/uploads/upload_00048bbb703fc1eae440eedcc2a61d59.png)

假设：
1. 系统线性部分G和非线性环节N可分离，且非线性特性具奇对称特性

2. 线性部分G应具良好的低通滤波特性

描述函数的定义：

$$
N(A) = \frac{\sqrt{A_1^2 + B_1^2}}{A} e^{j\varphi} = \frac{B_1}{A} + j \frac{A_1}{A}
$$

其中：

$$
A_1 = \frac{1}{\pi} \int_{0}^{2\pi} x(t) \cos(\omega t) dt \\
B_1 = \frac{1}{\pi} \int_{0}^{2\pi} x(t) \sin(\omega t) dt \\
\varphi = \arctan \left( \frac{A_1}{B_1} \right)
$$

### 非线性特征的描述函数

**死区特征的描述函数**

![](https://notes.sjtu.edu.cn/uploads/upload_124e61c73ea656643141ddb1e0bc58be.png)

$$
N(A) = \frac{B_1}{A} + j\frac{A_1}{A} = \frac{2k}{\pi}\left[\frac{\pi}{2} - \sin^{-1}\frac{a}{A} - \frac{a}{A}\sqrt{1-\left(\frac{a}{A}\right)^2}\right]
$$

**饱和特征的描述函数**

![](https://notes.sjtu.edu.cn/uploads/upload_39098f5a2b7d62af34dc0009db572a30.png)

$$
N(A) = \frac{2}{\pi} k \left[ \sin^{-1}\left(\frac{a}{A}\right) + \frac{a}{A} \sqrt{1-\left(\frac{a}{A}\right)^2} \right] \quad A \geq a
$$

**继电器特性的描述函数**

![](https://notes.sjtu.edu.cn/uploads/upload_96c24b3368a178d2a2d80a1b89c1447c.png)

$$
N(A) = \frac{2M}{\pi A} \left[ \sqrt{1-\left(\frac{md}{A}\right)^2} + \sqrt{1-\left(\frac{d}{A}\right)^2} \right] + j \frac{2Md}{\pi A^2}(m-1)
$$

- d=0 理想继电器
![](https://notes.sjtu.edu.cn/uploads/upload_547fd17ff2a1b6da50f9386712e74eb0.png)
$$
N(A) = \frac{4M}{\pi A}
$$

- m=1 三位继电器
![](https://notes.sjtu.edu.cn/uploads/upload_3cb9defb2ae7ff421beb5aa6e95ee5f6.png)
$$
N(A) = \frac{4M}{\pi A} \sqrt{1-\left(\frac{\Delta}{A}\right)^2}, \quad \Delta = d
$$

- m=-1 滞环继电器
![](https://notes.sjtu.edu.cn/uploads/upload_4a9c71af62b4c7e9002e4092bcb1dbb4.png)
$$
N(A) = \frac{4M}{\pi A} \sqrt{1-\left(\frac{d}{A}\right)^2} - j \frac{4Md}{\pi A^2}
$$

**间隙特征的描述函数**

![](https://notes.sjtu.edu.cn/uploads/upload_9a55cb09088c3df5314d335527c01c49.png)

$$
N(A) = \frac{k}{\pi} \left[ \frac{\pi}{2} + \arcsin \frac{A - 2a}{A} + \frac{2(A - 2a)}{A} \sqrt{\frac{a}{A} \left(1 - \frac{a}{A}\right)} \right] + j \frac{4ka(a - A)}{\pi A^2}
$$

### 组合非线性特征的描述函数

- 并联

![](https://notes.sjtu.edu.cn/uploads/upload_28c5acaa54a424353b5592bc59a07c67.png)

$$
N(A) = N_1(A)+N_2(A)
$$

描述函数相加即可。数个非线性特性并联后，总的描述函数等于各个非线性环节描述函数之和。

- 串联

![](https://notes.sjtu.edu.cn/uploads/upload_a6d9724bf89d79ed27c5d2962159e6b1.png)

**不能相乘！**需要先求出y(x)，再求总体的描述函数

串联例子：

![](https://notes.sjtu.edu.cn/uploads/upload_9c0dc8fafd4915ffe6c1a61e0fe56f7d.png)

![](https://notes.sjtu.edu.cn/uploads/upload_c3d613e48b941a85e804f744adc3440c.png)
