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

> 2025.2.18

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

### The Ideal Sampler

> 2025.4.22


理想采样器的输出：
$$
e^*(t) = e(0)\delta(t) + e(T)\delta(t-T) + e(2T)\delta(t-2T) + \cdots
$$

理想采样器也被称为冲激调制器(impulse modulator)。为了演示这种调制概念，定义了一个冲激序列 $\delta_T(t)$，其表达式为：

$$
\delta_T(t) = \sum_{n=0}^{\infty} \delta(t - nT) = \delta(t) + \delta(t - T) + \cdots
$$

然后采样信号可以被表示成：

$$
e^*(t) = e(t)\delta_T(t) = e(t)\delta(t) + e(t)\delta(t-T) + \cdots = e(0)\delta(t) + e(T)\delta(t-T) + \cdots
$$

两种数学上表示采样过程的方法：
1. **脉冲调制（Impulse Modulation）**：
   - 采样信号点为冲击信号
2. **采样序列（Sampled Sequence）**：
   - 采样信号点就是普通的有限值

### Starred Transform

对于

$$
e^*(t) = \sum_{n=0}^{\infty} e(nT)\delta(t-nT)
$$

其星变换为（就是拉普拉斯变换）：

$$
E^*(s) = \sum_{n=0}^{\infty} e(nT) \varepsilon^{-nTs}
$$

如果$e(t)$在$t=kT$处不连续，那么取$e(kT)=e(kT^+)$。


**Example 3: Find $E^*(s)$ for the unit step input $e(t) = 1_{t \geq 0}$.**
**Solution:** By definition, we have  
$$
E^*(s) = e(0^+) + e(T)\varepsilon^{-Ts} + \ldots \\
= 1 + \varepsilon^{-Ts} + \varepsilon^{-2Ts} + \ldots \\
= \frac{1}{1 - \varepsilon^{-Ts}} 
$$
The region of convergence is  
$$
|\varepsilon^{-Ts}| < 1 
$$

**留数(Residue)法求星变换**

1. **$E^*(s)$ 的闭合形式：**
   $$
   E^*(s) = \sum \text{ residues of } F(\lambda) \text{ at poles of } E(\lambda)
   $$
   其中，
   $$
   F(\lambda) = \frac{E(\lambda)}{1 - e^{-T(s-\lambda)}}
   $$
   这里 $E(s)$ 是 $e(t)$ 的拉普拉斯变换。
2. **函数 $F(\lambda)$ 的留数：**
   - 如果 $E(\lambda)$ 在 $\lambda = a$ 处有一个简单极点：
     $$
     (\text{residue})_{\lambda=a} = (\lambda - a)F(\lambda)|_{\lambda=a}
     $$
   - 如果 $E(\lambda)$ 在 $\lambda = a$ 处有一个阶数为 $ m $ 的极点：
     $$
     (\text{residue})_{\lambda=a} = \frac{1}{(m-1)!} \frac{d^{m-1}}{d\lambda^{m-1}} [(\lambda - a)^m F(\lambda)]|_{\lambda=a}
     $$
3. **注意事项：**
   如果 $e(t)$ 包含时间延迟，例如 $e(t) = f(t-t_0)1_{t \ge t_0}$，则上述表达式不适用，需要特殊技术来找到 $E^*(s)$。

**为什么不能用于有延时的 $e(t)$？**
当 $e(t)$ 包含时间延迟时，如 $e(t) = f(t-t_0)1_{t \ge t_0}$，其拉普拉斯变换会涉及到指数项 $e^{-st_0}$。这种情况下，原来的公式和留数计算方法不再适用，因为它们假设 $e(t)$ 没有时间延迟。时间延迟会导致拉普拉斯变换中出现额外的相位项，使得原本的方法无法正确处理这些复杂情况。因此，需要采用专门的技术或方法来处理带有时间延迟的系统。

**Example $4$: Determine $E^*(s)$ with sampling period $T$, given that**
$$
E(s) = \frac{1}{(s+1)(s+2)} 
$$

**Solution:** We have
$$
E(\lambda) = \frac{1}{(\lambda + 1)(\lambda + 2)} 
$$

Thus
$$
E^*(s) = \sum_{\text{poles of } E(\lambda)} \left[ \text{residues of } E(\lambda) \cdot \frac{1}{1-e^{-T(s-\lambda)}} \right]
$$
$$
= \left. \frac{1}{(\lambda + 2)\left(1-e^{-T(s-\lambda)}\right)} \right|_{\lambda=-1} + \left. \frac{1}{(\lambda + 1)\left(1-e^{-T(s-\lambda)}\right)} \right|_{\lambda=-2}
$$
$$
= \frac{1}{1-e^{-T(s+1)}} - \frac{1}{1-e^{-T(s+2)}}
$$

**Poisson Formula**

1. **连续信号的情况**:
   - 如果信号 $e(t)$ 在所有采样时刻都是连续的，那么 $e^*(s)$ 可以表示为：
     $$
     E^*(s) = \frac{1}{T} \sum_{n=-\infty}^{\infty} E(s + jn\omega_s), \quad \omega_s = \frac{2\pi}{T}
     $$
     这意味着 $e^*(s)$ 是原始信号的拉普拉斯变换 $e(s)$ 在频域上的周期性重复。
2. **不连续信号的情况**:
   - 如果信号 $e(t)$ 在某个采样时刻是不连续的，那么会出现一个附加项。一般情况下，$e^*(s)$ 表示为：
     $$
     E^*(s) = \frac{1}{T} \sum_{n=-\infty}^{\infty} E(s + jn\omega_s) + \frac{1}{2} \sum_{n=0}^{\infty} \Delta e(nT) e^{-nTs}, \quad \omega_s = \frac{2\pi}{T}
     $$
     其中，$\Delta e(nT)$ 是 $e(t)$ 在 $t = nT$ 处的不连续幅值。
3. **特例**:
   - 特别地，如果 $e(t) $ 除了在原点外是连续的（例如，$e(t) = 1_{t \geq 0}$），则 $e^*(s)$ 表示为：
     $$
     E^*(s) = \frac{1}{T} \sum_{n=-\infty}^{\infty} E(s + jn\omega_s) + \frac{e(0^+)}{2}, \quad \omega_s = \frac{2\pi}{T}
     $$
     这里，$e(0^+)$ 是 $e(t)$ 在 $t = 0$ 处的右极限值。

**$E^*(s)$的一些性质**

1. $E^*(s)$在s域是周期的，周期为$j\omega_s$，$\omega_s=2\pi/T$
    - 从定义的公式里就很容易看出来
2. 如果$E(s)$有一个极点$s_1$，那么$E^*(s)$有极点$s_1+jm\omega_s$
    - 从Poisson Formula中很容易看出来

$E^*(s)$的零极点图：
![](https://notes.sjtu.edu.cn/uploads/upload_2ed7c3726a4c41a2c5723206419ac67f.png)

### Shannon's Sampling Theorem

从采样信号恢复出原信号的条件：

- 原信号为**带限信号**
- 采样周期$T$满足$T<\frac{1}{2W}$，即$f>2W$，其中$W$为信号带宽

但控制系统中的大多数信号都不是带限信号，例如$1_{t\geq0},\,e^{-at}$，我们能做的只有选择合适的T。选择$\omega_s$的经验法则：$\omega_s>>\omega_b$，其中$\omega_b$为闭环系统的信号带宽。


