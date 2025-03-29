---
title: AU3311现代控制理论（B类）-课堂笔记
comments: true
toc: true
donate: true
share: true
date: 2025-02-20 10:03:06
categories: 自动化课程
tags: [课程笔记,自动化,控制]
cover: https://notes.sjtu.edu.cn/uploads/upload_f528537514485bb417eda59aeb9690cf.png
mathjax: true
---

## 2025.2.20

教材：

- 施颂椒，陈学中，杜秀华. 《现代控制理论基础》，高等教育出版社，第二版

参考书：

- 张嗣瀛，高立群. 《现代控制理论》，清华大学出版社，第二版

英文参考书：线性系统理论

课程主要内容（不严格按照课本内容讲述）：

1. 状态空间描述
2. 线性系统的响应
3. Lyapunov稳定性
4. 能控性和能观性
5. 系统的实现
6. 状态反馈与状态反馈器

考核方式：

- 平时作业（20%）迟交一周分数*0.8，迟交两周分数*0.8*0.8，期末前交*0.4，期末后计0分
- 课堂参与（10%）签了一次到就是满分
- 期末闭卷（70%）

王召建老师：wangzhaojian@sjtu.edu.cn

助教李明：liming0219@sjtu.edu.cn 

交流时间：电院2-430，每周五下午，16:00-17:00，有问题可随时联系

## 2025.3.13

### 传递函数与传递函数矩阵

对于线性定常系统，有状态空间描述：

$$
\dot{x} = Ax + Bu \\
y = Cx + Du
$$

对线性定常系统状态空间描述作拉氏变换，并假设$x(0) = x_0$，可得：

$$ sx(s) - x_0 = A x(s) + B u(s) $$
$$ y(s) = C x(s) + D u(s) $$

整理后可得：

$$ x(s) = (sI - A)^{-1} x_0 + (sI - A)^{-1} B u(s) $$
$$ y(s) = C (sI - A)^{-1} x_0 + C (sI - A)^{-1} B u(s) + D u(s) $$

零初始条件下 $x_0 = 0$，有：

$$ y(s) = [C (sI - A)^{-1} B + D] u(s) \triangleq G(s) u(s) $$

系统的**传递函数矩阵**：

$$ G(s) = [C (sI - A)^{-1} B + D] $$

其中求逆的部分如下：

$$
(sI - A)^{-1} = \frac{\text{adj}(sI - A)}{\det(sI - A)} = \frac{\text{adj}(sI - A)}{|sI - A|}
$$

$$
G(s) = \left[ C(sI - A)^{-1}B + D \right] = \frac{C \cdot \text{adj}(sI - A) \cdot B}{|sI - A|} + D
$$


使用伴随矩阵（Adjugate Matrix）求逆矩阵的步骤如下：

1. **计算行列式 (det(A))**：确保矩阵可逆（行列式不为零）。
2. **求余子式矩阵**：对每个元素计算其对应的余子式（去掉所在行和列的2x2行列式）。
3. **构造余因子矩阵**：将余子式乘以符号因子 $(-1)^{i+j}$。
4. **转置余因子矩阵得到伴随矩阵 (adj(A))**。
5. **逆矩阵公式**：$A^{-1} = \frac{1}{\text{det}(A)} \times \text{adj}(A)$。

**举例：矩阵 $A = \begin{bmatrix} 1 & 2 & 3 \\ 0 & 1 & 4 \\ 5 & 6 & 0 \end{bmatrix}$**

1. **计算行列式**：
$$
\text{det}(A) = 1(1 \cdot 0 - 4 \cdot 6) - 2(0 \cdot 0 - 4 \cdot 5) + 3(0 \cdot 6 - 1 \cdot 5) = -24 + 40 -15 = 1
$$

2. **余子式矩阵**：
$$
\begin{bmatrix}
\begin{vmatrix} 1 & 4 \\ 6 & 0 \end{vmatrix} & \begin{vmatrix} 0 & 4 \\ 5 & 0 \end{vmatrix} & \begin{vmatrix} 0 & 1 \\ 5 & 6 \end{vmatrix} \\
\begin{vmatrix} 2 & 3 \\ 6 & 0 \end{vmatrix} & \begin{vmatrix} 1 & 3 \\ 5 & 0 \end{vmatrix} & \begin{vmatrix} 1 & 2 \\ 5 & 6 \end{vmatrix} \\
\begin{vmatrix} 2 & 3 \\ 1 & 4 \end{vmatrix} & \begin{vmatrix} 1 & 3 \\ 0 & 4 \end{vmatrix} & \begin{vmatrix} 1 & 2 \\ 0 & 1 \end{vmatrix}
\end{bmatrix}
=
\begin{bmatrix}
-24 & -20 & -5 \\
-18 & -15 & -4 \\
5 & 4 & 1
\end{bmatrix}
$$

3. **余因子矩阵（应用符号）**：
$$
\begin{bmatrix}
+(-24) & -(-20) & +(-5) \\
-(-18) & +(-15) & -(-4) \\
+(5) & -(4) & +(1)
\end{bmatrix}
=
\begin{bmatrix}
-24 & 20 & -5 \\
18 & -15 & 4 \\
5 & -4 & 1
\end{bmatrix}
$$

4. **伴随矩阵（转置余因子矩阵）**：
$$
\text{adj}(A) =
\begin{bmatrix}
-24 & 18 & 5 \\
20 & -15 & -4 \\
-5 & 4 & 1
\end{bmatrix}
$$

5. **逆矩阵**（因 $\text{det}(A) = 1$）：
$$
A^{-1} = \frac{1}{1} \times \text{adj}(A) =
\begin{bmatrix}
-24 & 18 & 5 \\
20 & -15 & -4 \\
-5 & 4 & 1
\end{bmatrix}
$$

**验证**：计算 $A \times A^{-1}$ 得到单位矩阵，确认正确性。

最终答案：
$$
\boxed{
A^{-1} = \begin{bmatrix}
-24 & 18 & 5 \\
20 & -15 & -4 \\
-5 & 4 & 1
\end{bmatrix}
}
$$

**例题：**

已知系统的状态空间表达式如下，求其对应的传递函数矩阵。

$$
\begin{bmatrix}
\dot{x}_1 \\
\dot{x}_2 \\
\dot{x}_3 
\end{bmatrix} = 
\begin{bmatrix}
-2 & 1 & 0 \\
0 & -3 & 0 \\
0 & 1 & -4
\end{bmatrix}
\begin{bmatrix}
x_1 \\
x_2 \\
x_3 
\end{bmatrix} + 
\begin{bmatrix}
-1 & -1 \\
1 & 4 \\
2 & -3
\end{bmatrix}
\begin{bmatrix}
u_1 \\
u_2 
\end{bmatrix}
$$

$$
\begin{bmatrix}
y_1 \\
y_2 
\end{bmatrix} = 
\begin{bmatrix}
1 & 1 & 1 \\
-2 & -1 & 0
\end{bmatrix}
\begin{bmatrix}
x_1 \\
x_2 \\
x_3 
\end{bmatrix}
$$

解答：

$$ G(s) = \left[ C(sI - A)^{-1}B + D \right] = 
\begin{bmatrix}
1 & 1 & 1 \\
-2 & -1 & 0
\end{bmatrix}
\begin{bmatrix}
s+2 & -1 & 0 \\
0 & s+3 & 0 \\
0 & -1 & s+4
\end{bmatrix}^{-1}
\begin{bmatrix}
-1 & -1 \\
1 & 4 \\
2 & -3
\end{bmatrix} $$

用刚才的方法求逆矩阵，得到 $(sI - A)^{-1}$：

$$
(sI - A)^{-1} = \begin{bmatrix}
\frac{1}{s+2} & \frac{1}{(s+2)(s+3)} &0 \\
0 & \frac{1}{s+3} & 0 \\
0 & \frac{1}{(s+3)(s+4)} & \frac{1}{s+4}
\end{bmatrix}
$$

进行一个复杂的矩阵相乘得到：

$$
G(s) = \begin{bmatrix}
\frac{2s+7}{(s+3)(s+4)} & \frac{10s+26}{(s+2)(s+3)(s+4)} \\
\frac{1}{s+3} & -\frac{2s+10}{(s+2)(s+3)}
\end{bmatrix}
$$

