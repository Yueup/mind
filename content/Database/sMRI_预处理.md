---
title: sMRI_预处理
issueNo: 
tags:
  - MRI
date: 2024-03-15T21:47:00
Draft: false
---
# 1. 结构 MRI 预处理

## 1.1 偏置场校正（Bias Field Correction）

> 用于校正图像中存在的亮度偏差或强度不均匀性

> [!note] 出现不均匀性的原因
> 在高场强（3 T 及以上）下，图像上会获得强度梯度，从而使图像的某些部分比其他部分更亮
> 

> 下图展示了，偏置场校正前后图像对比：

![|300](https://picgoyue.oss-cn-hangzhou.aliyuncs.com/20240315210112.png)

## 1.2 大脑提取（Brain Extraction）

> 去除影像中非脑组织，减少噪声和计算复杂性，改善后续分割或配准。也可以称为颅骨剥离（Skull-stripping）

常见的算法：
* [BSE](https://brainsuite.org/processing/surfaceextraction/bse/)
* [BET](https://fsl.fmrib.ox.ac.uk/fsl/fslwiki/BET/UserGuide)
* SPM
* McStrip

> 下图展示了，脑组织提取中的错误，图（中）未能彻底去除非脑结构

![|300](https://picgoyue.oss-cn-hangzhou.aliyuncs.com/20240315211346.png)
## 1.3 组织分割（Tissue Segmentation）

> 将脑组织分割为灰质、白质以及脑脊液


> 下图展示了，组织分割效果，图（左 2、3、4）分别为脑脊液、灰质以及白质。

![|500](https://picgoyue.oss-cn-hangzhou.aliyuncs.com/20240315211829.png)

## 1.4 配准

> 减少个体间的 [[fMRI_预处理#^e40217|解剖变异]] ，从而成功地进行有意义的群体分析

### 1.4.1 基于体积的方法（Volume-based）

#### 1.4.1.1 类型
* 线性变换：
	* 刚体变换：包括转动、平动。共 **6** 个自由度（DOF）
	* 仿射变换：包括了转动、平动、斜切、缩放。共有 **12** 个自由度（DOF）
* 非线性变换：

>[!note] 笔记
> 超过 12 个自由度的变换被称为非线性变换或 `warp`

用变形场来表述非线性变换前后影像域间的变换关系。变形场通常由一个向量场表示，每个体素对应的向量指示了其在配准过程中的方向和位移。

![|300](https://picgoyue.oss-cn-hangzhou.aliyuncs.com/20240316215936.png)

#### 1.4.1.2 损失函数（Cost Function）

> 衡量配准质量的指标

* 常见的 CF 有：

|  CF  |   适用条件    |                  例子                  |
| :--: | :-------: | :----------------------------------: |
| 最小二乘 |   相同模态    |             fMRI<-->fMRI             |
| 正态相关 |   相同模态    | T 1 MRI <-->T 1 MRI，不同的 session 中获取。 |
| 相关比  | 任意两种 MRI 模态 |        T 1 MRI <--> FLAIR MRI        |
| 互信息  |  任意两种影像   |           T 1 MRI <--> CT            |
| BBR  |           |                                      |

![|300](https://picgoyue.oss-cn-hangzhou.aliyuncs.com/20240316223137.png)

#### 1.4.x. 工具：
* AFNI
* FSL
* SPM

### 基于表面的方法（Surface-based）

* 工具：
	* Freesurfer
	* CARET


# 参考资料

1. https://andysbrainbook.readthedocs.io/en/latest/fMRI_Short_Course/Preprocessing/Skull_Stripping.html

