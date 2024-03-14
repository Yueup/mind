---
Title: fMRI预处理方法
Draft: false
tags:
  - fMRI
date: <%tp.date.now%>
---
 

# 0. 术语

1. 重复时间（Repetition Time，TR）：应用于同一切片的连续脉冲序列之间的时间间隔 ^d0b289
2. 回波时间（Echo Time，TE）：从发射 [[MRI Basic#^7c6c38|射频脉冲]] 到接受回波信号之间的时间 ^c44b0e

![|500](https://picgoyue.oss-cn-hangzhou.aliyuncs.com/20240306190922.png)

3. 低频漂移（Low-frequency Drifts）：因被试生理噪声（呼吸、心脏搏动）或头动引起的噪声，通常信号在0.0-0.015 Hz。 ^15f66c
4. 解剖变异（Anatomical variability）: 身体结构形态特征与大多数个体**通常**描述的特征表现不同。 ^e40217
5. 标准空间（）

# 1.预处理（Preprocessing）
* 质量控制（Quality Assurance）
* 失真校正（Distortion correction）
* 时间层校正 （Slice timing correction）
* 头动校正 （Motion correction / Realignment）
* 时域滤波（Temporal Filtering）
* 空间平滑（Spatial smooth）
* 空间标准化（Normalization）/ 配准（Coregistration）
> [[fMRI预处理流程图]]

## 1.1 质量控制

检查原始影像，去除来自生理源（physiological sources） 和扫描仪（scanner）的影响
* 生理源：移动、呼吸、心脏搏动、焦虑、药物等
* 扫描仪：场不均匀、涡流电流、电子设备等

![|300](https://picgoyue.oss-cn-hangzhou.aliyuncs.com/20240306145618.png)

## 1.2 失真校正
由于磁场不均匀性导致了**信号丢失**和**几何形变**。

下图中蓝框范围内，眶额区（orbitofrontal region）的信号丢失。

![400|500](https://picgoyue.oss-cn-hangzhou.aliyuncs.com/20240306150633.png)

## 1.3 时间层校正

fMRI 获取过程中是对大脑进行逐层扫描，使得扫描到的全脑 fMRI 各层间存在时间差。为了获得全脑体素在同一时刻的信号，需要对不同层进行校正，消除采集时刻不同带来的差异。
### 信号的获取方式：

逐层扫描分为三种方式：升序、降序以及交替获取（interleaved acquisition），例如：先获取偶数层再获取奇数层。

下图中，全脑的扫描顺序为 1-3-5-7-2-4-6-8，表示为先扫描奇数层后偶数层，其中 [[fMRI预处理#^d0b289|TR]] =2s。

![|500](https://picgoyue.oss-cn-hangzhou.aliyuncs.com/20240306152010.png)

> [!note]
> 时间层校正对于任务态和静息态 fMRI 在长 TR (＞1 s)采集时对齐 BOLD 信号的时间是至关重要的。


## 1.4 头动校正

fMRI 研究中**最大**的误差来源，由于被试呼吸、心跳、头动引起的 fMRI 信号体素位置发生变化，通过刚体变换，将时间序列中采集到的所有图像以参考时间点为标准进行配准，使得图像近邻不发生移动或控制其移动范围在一定的阈值内。

### 头动校正的步骤：

**主要思想**：将头部运动视为刚体（rigid body）运动，具有三个自由度的移动（Translation）和三个自由度的旋转（Rotation），共六个自由度。

![|525](https://picgoyue.oss-cn-hangzhou.aliyuncs.com/20240306191818.png)

下图展示了：头动校正前后，时间序列图像与参考影像间的距离。

![|520](https://picgoyue.oss-cn-hangzhou.aliyuncs.com/20240306192733.png)

## 1.5 时域滤波

应用傅里叶变换后的高通滤波或时域平均方法以减少 [[fMRI预处理#^15f66c|低频漂移]]，或称为去趋势（Detrending）

## 1.6 空间平滑

目的：应用滤波器（三维高斯核）以去除图像中高频信息。

> [!note]- 高频信息
> 指的是图像中变化剧烈或者细节丰富的部分。在频域分析中，高频成分代表了图像中的**边缘、纹理、细微结构**等高频特征，这些特征通常对图像的细节和清晰度起着重要作用。
> 

* 优点：

	1. 提高信噪比
	2. 将激活区域扩散到相邻的体素中
	3. 有助于满足统计推断过程中的高斯随机场要求，提高参数统计检验的有效性

* 常见的滤波器大小：
$$
\text FWHM = 2σ\sqrt{2\ln{2}}，\text接近=2.55 ∗ σ ，其中\sigma为标准差 
$$
### 滤波器卷高斯核的选用：

下图显示了不同 FWHM 值下高斯核的平滑结果。FWHM 值越大，越平滑，小簇（Clusters）越少，大簇越多。

![|500](https://picgoyue.oss-cn-hangzhou.aliyuncs.com/20240306201144.png)

* 选用建议：FWHM $\geq$ **两倍**体素尺寸

## 1.7 空间标准化/配准

因个体间存在**解剖变异**，所以需要进行配准。

目的：以减少个体间的 [[fMRI预处理#^e40217|解剖变异]] ，从而成功地进行有意义的群体分析。








---
参考资料：
https://mriquestions.com/data-pre-processing.html
https://blog.csdn.net/qq_44858224/article/details/129634925
https://fmriprep.org/en/stable/
https://mriquestions.com/processanalyze-fmri.html

