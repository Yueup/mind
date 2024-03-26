---
title: Master刺激发生器_基础
issueNo: 
tags: 
date: 2024-03-26T20:02:00
Draft: false
---

# 1.Overview：

正面组成部分：
*  A：电源开关及指示
*  B：控制键
*  C：数显
*  D：外部触发输入（接 BNC，EXT 1 触发通道 1，EXT 2 触发通道 2）
*  E：输出

![](https://picgoyue.oss-cn-hangzhou.aliyuncs.com/20240326175358.png)

输出：从上至下每一行分别为：通道数、信号指示灯、脉冲极性开关、调节输出振幅旋钮、BNC 接口输出信号、F：通道 2+3 输出信号之和；G：通道 4+5 输出信号之和；H：通道 6+7+8 输出信号之和；

背面组成部分：

* 是否底盘接地开关（可降低系统噪声）
* 与计算机通信的USB 接口

# 2. 刺激器的信号发生模式

有以下五种信号模式：

1. **FREE-RUN**：通道持续不断地输出脉冲，不受外部触发或控制

2. **TRIGGER**：通道在接收到「触发信号」后输出单脉冲

3. **TRAIN**：通道在接收到「触发信号」后输出脉冲串，脉冲的数量由参数「[[Master-8#^090311|M]] 」控制

4. **DC**：与时间无关，手动控制通道开关，不依赖于外部触发

5. **GATE**：仅限通道 1、2，在外部门操作基础上，输出脉冲
## 2.1 参数

1. **DURA**：输出脉冲从开始到结束所经过的时间

2. **DELAY**：从输入触发信号开始到输出脉冲开始之间经过的时间

3. **INTER**：前后脉冲间的周期

4. **M**：仅试用于 TRAIN 模式，定义了每个脉冲串中包含的脉冲数量 ^090311

各模式需要调试的参数如下表：

| 模式       | 参数                   |
| -------- | -------------------- |
| FREE-RUN | Duration、Interval    |
| TRAIN    | Duration、Interval 、M |
| TRIG     | Delay、Duration       |
| DC       | 无                    |
| GATED    | Duration、Interval    |
# 3. 实操
## 3.1 初始化

标准的*按键*顺序为：OFF, ALL, ALL, ALL, ENTER
## 3.2 设置通道「#」到 「X」 模式

标准的*按键*顺序为：「X」，「#」，ENTER

* 例子：设置通道 1 为 FREE 模式

则按键顺序为：FREE，1，ENTER
## 3.3 设置通道「#」的「P」参数为「V」值

标准的*按键*顺序为：「P」，「#」，「V」, ENTER，「单位」，ENTER

* 例子：设置通道 1 的 DURA 参数为 6.6 ms

则按键顺序为：DURA，1，6.6，ENTER，3，ENTER

> [!note] 注
> 「单位」设置的规则是：秒（s）则为 0，毫秒（ms）则为 3，以此类推


## 3.4 触发模式相关操作

1. 设置通道「#」为 TRIG 模式，方法参考 [[Master-8#3.2 设置通道「 」到 「X」 模式|3.2]]
2. 选择触发模式
	1. 手动触发，*按键*顺序为：「#」, 代表激活一次该通道的脉冲
	2. 外部触发，通过 EXT 1、2 对通道 1、2 进行触发
	3. 内部触发，通过 CONNECT 按键将通道间相连

### 3.4.1 连接通道「 #1 」与通道「 #2 」

标准的*按键*顺序为：CONNECT，「#1」，「#2」，ENTER



# 4 .测试

* 设定参数
通道 1：FREE 模式、DURA：20 ms、INTER: 40 ms
通道 2：TRIG 模式、DELAY：20 ms

* 按键顺序
```
FREE,1,ENTER
DURA,1,20,ENTER,3,ENTER
INTER,1,40,ENTER,3,ENTER
TRIG,2,ENTER
CONNECT,1,2,ENTER
DURA,2,20,ENTER,3,ENTER
DELAY,2,20,ENTER,3,ENTER
连接示波器
脉冲极性设置为正
```

![](https://picgoyue.oss-cn-hangzhou.aliyuncs.com/e23a3844c2979c660104115a1072a8e.jpg)

待办
1. [ ] Debug 通道 2
2. [ ] 转换为编程语言