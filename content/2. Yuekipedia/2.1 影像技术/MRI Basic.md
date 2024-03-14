---
Title: MRI基础
Draft: false
tags:
  - MRI
date: (format = "YYYY-MM-DD HH:mm") => { return window.moment(this.config.target_file.stat.ctime).format(format); }
---
 

# 定义：
磁共振成像（Magnetic Resonance Imaging）是神经病学（Neurology）和神经外科（Neurosurgery）中最常用的检查之一。其能提供三个平面（轴、矢和冠状面）上的大脑、脊髓和血管的解剖结构。
[[MRI#MRI 的定义：|More]]
![|500](https://picgoyue.oss-cn-hangzhou.aliyuncs.com/20240313144510.png)


> [!note]
> 其对比 CT（计算机断层扫描），没有电离辐射。

# 原理 ：
磁共振成像（Magnetic Resonance Imaging）是利用核磁共振（Nuclear Magnetic Resonance）原理。具体来说，当把物体放置在静磁场中，用适当的电磁波（射频脉冲）照射它，以改变氢原子的旋转排列方向，使出现[[MRI Basic#^33212f|共振现象]]，然后分析它释放的电磁波，由于不同的组织会产生不同的电磁波信号，经电脑处理，就可以得知构成这一物体的原子核的位置和种类，据此可以绘制成物体内部的精确立体图像。


磁共振成像：大多数原子核具有自旋特性，且其自旋轴随机排列，若外加一个磁场（静磁场），自旋轴会从无序状态变成有序状态，并最终达到平衡。此时，若在外界再加上一定频率的 RF 脉冲，它将会引起原子核和这个磁场的共振现象，导致**低能级跃迁**，即核磁共振现象。当 RF 脉冲被撤销时，原子核的自旋轴会回到原来的状态，并且释放能力，该过程称为弛豫，弛豫分为垂直弛豫(T1)和水平弛豫(T2)。

磁共振成像有两种，
* 结构 MRI，是对大脑内各部分特定原子核的磁共振信号的收集
*  [[fMRI Basic|功能MRI]]，是对 BOLD 信号的采集。


# MRI 系统的组成：
* 磁铁系统：
	* 主磁场：由超导线圈（Main Superconducting coil）、匀磁线圈（Shim coil）组成
	* 梯度场：由梯度线圈（Gradient coil）构成
* 射频系统：
	* 射频（RF）发生器：产生短而强的射频脉冲，激活氢原子核产生 NMR 现象 ^b3defb
	* 射频（RF）接收器：接受 NMR 信号
* 计算机图像重建系统
	* 流程图：[[MRI计算机重建系统流程]]

![|500](https://picgoyue.oss-cn-hangzhou.aliyuncs.com/20240313151732.png)
# 术语：
1. 射频脉冲：由 [[MRI Basic#^b3defb| RF 线圈 ]] 发送的无线电波，以激活身体中的氢原子核，使其产生能量。 ^7c6c38
2. 共振：当一个系统受到**外部激励**，并且**激励频率**与系统的**固有频率**匹配时，系统会产生显著的振动或响应的现象。原子核在静磁场和射频脉冲的作用下发生共振。具体来说，当原子核暴露在强静磁场中并受到特定频率的射频脉冲激发时，原子核会吸收能量并发生共振。 ^33212f

# MRI 的序列：
最常见的 MRI 序列是 T 1 、T 2 加权以及 FLAIR 扫描。

* 三者间区别在于 [[fMRI预处理#^d0b289|TR]] 和 [[fMRI预处理#^c44b0e|TE]]。

|       |   基础特点   | TR（msec） | TE (msec) |
| :---: | :------: | :------: | :-------: |
|  T 1  | 短 TR、TE  |   500    |    14     |
|  T 2  | 长 TR、TE  |   4000   |    90     |
| FLIAR | 超长 TR、TE |   9000   |    114    |
*** 
* 大脑三种 MRI 序列对比

| 组织                             | T 1 | T 2 | FLIAR |
| ------------------------------ | --- | --- | ----- |
| <font color=#F36208>脑脊液</font> | 暗   | 亮   | 暗     |
| <font color=#81B300>白质</font>  | 亮   | 暗灰  | 暗灰    |
| <font color=#2485E3>皮层</font>  | 暗   | 亮   | 亮     |

![|500](https://picgoyue.oss-cn-hangzhou.aliyuncs.com/20240313161324.png)

# 局限性：

1. 容易受到运动伪影影响
2. 检测急性出血不如 CT
3. 采集时间较长

# 参考资料：
1. https://zh.wikipedia.org/wiki/%E7%A3%81%E5%85%B1%E6%8C%AF%E6%88%90%E5%83%8F?useskin=vector
2. https://case.edu/med/neurology/NR/MRI%20Basics.htm