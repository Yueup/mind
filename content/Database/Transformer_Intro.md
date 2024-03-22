---
title: Transformer_Intro
issueNo: 
tags: 
date: 2024-03-21T17:21:00
Draft: false
---
# 0. 资料

[Transformers代码支持](https://huggingface.co/docs/transformers/v4.39.0/zh/index)
[Transformer 快速入门
](https://transformers.run/)

# 1. 原理

## 1.1 注意力机制、自注意力机制

### 1.1.1 注意力机制（attention）

>人在处理信息的时候，会将注意力放在需要关注的信息上，对于其他无关的外部信息进行过滤，这种处理方式被称为注意力机制。


按照引起方式的不同，注意力机制可以分为两类：「非自主提示」和「自主提示」

* 非自主提示：因物体「本身特征」突出引起的注意力倾向

> [!note] 「硬寻址理解非自主提示」
> 在进行 Query 和 Key 配对后，直接取出 Key 地址对应存储器中的 Value 值
> 

* 自主提示：经过「先验知识」的介入下，对具有「先验权重」的物体引起的注意力倾向

> [!note] 以「软寻址」理解自主提示：
> 通过计算 Key 和 Query 的「**相似度**」来进行寻址，不只是获取单个 Key 地址中存储器的 Value 值，而是根据「相似度」计算所有的存储器中的 Value 值的加权和

[[注意力机制|注意力机制中的自主提示和非自主提示]]

非自我提示注意力机制公式：

$$
f(x)=\sum_{i=1}^n \alpha(\text{Q},\text{K}_i)  \text{V}_i，其中i=1,2,...n
$$
$\alpha(\text{Query}_i,\text{Key}_i)$ 是「注意力评分函数」，用于计算「注意力权重」，此时为标量。

随后，利用 softmax 函数输出一个「概率分布」作为注意力权重，此时为概率分布
$$
\alpha(\text{Q},\text{K}_i)=\text{Softmax}(\alpha(\text{Q},\text{K}_i))
$$

根据 Query 和 Key 类型的不同，评分函数可以分为几类：

* [[#1.1.1.1 加性注意力（Additive attention） ：|加性注意力]]
* [[#1.1.1.2 点积注意力|点积注意力]]

#### 1.1.1.1 加性注意力（Additive attention） ：

* 评分函数： $\alpha(\text{Q},\text{K}_i)=W_V^Ttanh(W_QQ+W_KK)$ ，适用于 Query 和 Key 向量维度不同。上式中，$Q\in \mathbb{R}^{q}$ 、$K\in \mathbb{R}^{k}$、$W_q\in \mathbb{R}^{h\times q}$ 、$W_k\in \mathbb{R}^{h\times k}$ 和 $W_v\in \mathbb{R}^{h}$

* 加性注意力：


代码表示：
```python
class AdditiveAttention(nn.Module): # 定义加性注意力函数类，用于实现注意力权重计算
	def __init__(self, key_size, query_size, num_hiddens, dropout, **kwargs):
		super(AdditiveAttention, self).__init__(**kwargs)
		# 全连接层，将Key和Query统一到同特征维度
		self.W_k = nn.Linear(key_size, num_hiddens, bias=False) 
        self.W_q = nn.Linear(query_size, num_hiddens, bias=False)
        self.W_v = nn.Linear(num_hiddens, 1, bias=False)
        self.dropout = nn.Dropout(dropout)
    def forward(self, queries, keys, values, valid_lens):
	    # queries:(batch_size,query_size,num_hiddens)
	    # keys:(batch_size,key_size,num_hiddens)
        queries, keys = self.W_q(queries), self.W_k(keys)
        # queries:(batch_size,query_size,1,num_hiddens)
        # keys:(batch_size,1,key_size,num_hiddens)
        # features:(batch_size, query_size, key_size, num_hidden)
        features = queries.unsqueeze(2) + keys.unsqueeze(1)
        features = torch.tanh(features)
        # scores:(batch_size, query_size, key_size)
        scores = self.W_v(features).squeeze(-1)
        # 转化为概率分布
        self.attention_weights = masked_softmax(scores, valid_lens)
        # values:(batch_size, key_size, 值的维度)
        # 矩阵乘法，得到输出output:(batch_size,query_size,值的维度)
        # 输出，每个查询的加权值
		return torch.bmm(self.dropout(self.attention_weights), values)

```

#### 1.1.1.2 点积注意力

评分函数：$\alpha(\text{Q},\text{K}_i)=\frac{Q^TK_i}{\sqrt{d}}$ ，计算效率更高，要求 Query 和 Key 具有相同的长度。
上式中，$Q\in \mathbb{R}^{n \times d}$、$K\in \mathbb{R}^{m \times d}$



















# 参考资料：

1. https://zh.d2l.ai/chapter_attention-mechanisms/attention-scoring-functions.html
2. https://blog.csdn.net/weixin_43610114/article/details/126684999