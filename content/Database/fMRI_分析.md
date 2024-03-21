---
title: fMRI_分析
issueNo: 
tags:
  - fMRI
date: 2024-03-16T22:47:00
Draft: false
---


# 0. 术语
# 1. BOLD 信号

> 由血流、血容量和血氧在神经元活动变化响应中的相互作用产生的


![|300](https://picgoyue.oss-cn-hangzhou.aliyuncs.com/20240317172444.png)

> 上图展示了，「蓝色」：激活体素的 BOLD 信号变化；「红色」：刺激时间序列，可以观察到 BOLD 信号的变化是**滞后**于刺激的


BOLD 信号、刺激时间序列、HRF 间的关系：

$$
(h * f)(t)= \int h(\tau)f(t-\tau)d\tau
$$
即，BOLD 信号可以被看作是 HRF 和刺激时间序列的「卷积」结果


## 2.1 血氧动力学响应（Hemodynamic Response）

> 由短暂的外周刺激产生的局部 BOLD 信号变化称为血流动力学反应函数 (HRF)


* 几个特征：
	* TP（Time to peak）：达到峰值的时间
	* ID （Initial dip）：早期因局部神经元兴奋，导致耗氧量增加，通常可以**忽略**
	* W（Width）：HRF 1-2 s 上升，12-20 s 恢复至基线
	* PH（Peak height）：峰值，反映了神经元的活动量
	* PSU（）

![|300](https://picgoyue.oss-cn-hangzhou.aliyuncs.com/20240317180518.png)

上图表示了神经元在受到短暂强烈刺激后，需要增加血液和营养物质的流动。当神经元活动的需求得到满足时，血流量恢复到稳态水平。


## 1.2 线性时不变系统（LTI）

描述神经元活动和 BOLD 信号之间关系的系统是「 [[线性时不变系统]] 」（Linear Time Invariant System）

* 齐次性：$f(s)->y(s)$ ，则：$Af(s)->Ay(s)$
* 叠加性：$f_1(s)->y_1(s),f_2(s)->y_2(s)$，则 $f_1(s)+f_2(s)->y_1(s)+y_2(s)$
* 时不变：刺激变化 Ts，则相应的 BOLD 信号强度也变化 Ts。

更多参考：[概念](https://zh.wikipedia.org/zh-hans/%E7%BA%BF%E6%80%A7%E6%97%B6%E4%B8%8D%E5%8F%98%E7%B3%BB%E7%BB%9F%E7%90%86%E8%AE%BA?useskin=vector)

# 2. 一般线性模型（General Linear Model）

![|300](https://picgoyue.oss-cn-hangzhou.aliyuncs.com/20240317203300.png)


# 参考资料：
1. https://mriquestions.com/does-boldbrain-activity.html
2. [GLM解释](https://nilearn.github.io/stable/glm/glm_intro.html)
3. https://mriquestions.com/fmri-statistical-analysis.html
4. https://mriquestions.com/general-linear-model.html