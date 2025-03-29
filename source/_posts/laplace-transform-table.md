---
layout: posts
title: 常见函数Laplace变换表
date: 2025-03-29 21:09:06
categories: 数学
tags: 控制
cover: https://notes.sjtu.edu.cn/uploads/upload_0fc9c9b05692b5fe419da1d0659adb10.png
mathjax: true
---

| f(t)                           | F(s)                                                                 |
|--------------------------------|----------------------------------------------------------------------|
| 1                              | $\frac{1}{s}$                                                        |
| $e^{at}$                       | $\frac{1}{s-a}$                                                      |
| $t^n$, n=1,2,3...              | $\frac{n!}{s^{n+1}}$                                                 |
| $t^p$, p>-1                    | $\frac{\Gamma(p+1)}{s^{p+1}}$                                        |
| $\sqrt{t}$                     | $\frac{\sqrt{\pi}}{2s^{\frac{3}{2}}}$                                |
| $t^{n-\frac{1}{2}}$, n=1,2,3...| $\frac{1\cdot3\cdot5\cdots(2n-1)\sqrt{\pi}}{2^n s^{n+\frac{1}{2}}}$   |
| $\sin(at)$                     | $\frac{a}{s^2+a^2}$                                                  |
| $\cos(at)$                     | $\frac{s}{s^2+a^2}$                                                  |
| $t \sin(at)$                   | $\frac{2as}{(s^2+a^2)^2}$                                            |
| $t \cos(at)$                   | $\frac{s^2-a^2}{(s^2+a^2)^2}$                                        |
| $\sin(at)+at\cos(at)$          | $\frac{2as^2}{(s^2+a^2)^2}$                                          |
| $\cos(at)-at\sin(at)$          | $\frac{s(s^2-a^2)}{(s^2+a^2)^2}$                                     |
| $\cos(at)+at\sin(at)$          | $\frac{s(s^2+3a^2)}{(s^2+a^2)^2}$                                    |
| $\sin(at+b)$                   | $\frac{s\sin(b)+a\cos(b)}{s^2+a^2}$                                  |
| $\cos(at+b)$                   | $\frac{s\cos(b)-a\sin(b)}{s^2+a^2}$                                  |
| $\sinh(at)$                    | $\frac{a}{s^2-a^2}$                                                  |
| $\cosh(at)$                    | $\frac{s}{s^2-a^2}$                                                  |
| $e^{at}\sin(bt)$               | $\frac{b}{(s-a)^2+b^2}$                                              |
| $e^{at}\cos(bt)$               | $\frac{s-a}{(s-a)^2+b^2}$                                            |
| $e^{at}\sinh(bt)$              | $\frac{b}{(s-a)^2-b^2}$                                              |
| $e^{at}\cosh(bt)$              | $\frac{s-a}{(s-a)^2-b^2}$                                            |
| $t^n e^{at}$, n=1,2,3...       | $\frac{n!}{(s-a)^{n+1}}$                                             |
| $f(ct)$                        | $\frac{1}{c}F(\frac{s}{c})$                                          |
| $u_c(t)=u(t-c)$                | $\frac{e^{-cs}}{s}$                                                  |
| $\delta(t-c)$                  | $e^{-cs}$                                                            |
| $u_c(t)f(t-c)$                 | $e^{-cs}F(s)$                                                        |
| $t_c(t)g(t)$                   | $e^{-cs}\mathcal{L}\{g(t+c)\}$                                       |
| $e^{ct}f(t)$                   | $F(s-c)$                                                             |
| $t^n f(t)$, n=1,2,3...         | $(-1)^n F^{(n)}(s)$                                                  |
| $\frac{1}{t}f(t)$              | $\int_s^\infty F(u)du$                                               |
| $\int_0^t f(v)dv$              | $\frac{F(s)}{s}$                                                     |
| $\int_0^t f(t-\tau)g(\tau)d\tau$| $F(s)G(s)$ (Convolution)                                             |
| $f(t+T)=f(t)$                  | $\frac{\int_0^T e^{-st}f(t)dt}{1-e^{-sT}}$                            |
| $f'(t)$                        | $sF(s)-f(0)$                                                         |
| $f''(t)$                       | $s^2F(s)-sf(0)-f'(0)$                                                |
| $f^{(n)}(t)$                   | $s^n F(s)-s^{n-1}f(0)-s^{n-2}f'(0)-\cdots-f^{(n-1)}(0)$       |
