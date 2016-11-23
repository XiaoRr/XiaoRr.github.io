---
layout: post
title:  "动态规划入门题-编辑距离的简易分析"
date:   2016-05-04
categories: 算法
tags: 动态规划
author: XiaoR
---
* content
{:toc}

## 问题描述

设A和B是两个字符串。要用最少的字符操作将字符串A转换为字符串B。这里所说的字符串操作包括：

* 删除一个字符

* 插入一个字符

* 将一个字符改为另一个字符

将字符串A变换为字符串B所用的最少字符操作数称为字符串A到B的编辑距离，记为d(A, B)。对于给定的2个字符串A和B，要求计算它们的编辑距离d(A, B)。





---

## 分析

乍看是很难的题，因为变化种类繁多，如果按搜索的思路记录变化后字符串的样子，内存开销会很大。

实际上这题用动态规划有非常巧妙的解法，设A字符串的前i个字母与B字符串的前j个字母的距离为D(i,j)，A的字符数为m,B的字符数为n，题意即求D(m,n)的值。只要能找到递推式，便可以得到结果。

需要注意的是，在分析中，并没有考虑字符串最后变成了什么样子。如果参考背包问题就能理解，因为背包问题最后也没有直接给出装包方案而直接给出了结果。当然，可以通过路径追踪来获取方案，这里不表。

容易得到初始条件 D(0,n)=D(n,0)=n, 下面开始考虑递推方程。

为了使A[i]==B[j]，可能的操作有

* 替换该位， 如果A[i]==B[j]，这一位无需再变化，则D(i,j)=D(i-1,j-1)，否则D(i,j)=D(i-1,j-1)+1

* 添加一位， 此时i-1与j匹配 D(i,j)=D(i-1,j)+1

* 删除一位， 此时i与j-1匹配 D(i,j)=D(i,j-1)+1

最终转移方程 D(i,j)=min( D(i-1,j-1)+A[i]==B[j]?0:1 ,D(i-1,j)+1 ,D(i,j-1)+1 )


代码如下

```c
#include <iostream>
#define min(A,B,C) min(A,(B,C))
using namespace std;

int dp[1007][1007];
int main(){
	//freopen("input.txt","r",stdin);
	//freopen("output.txt","w",stdout);
	string s1,s2;
	while(cin>>s1>>s2){
		int alen = s1.length(), blen = s2.length();
		for(int i=0;i<1007;i++)
			dp[0][i]=dp[i][0]=i;
		for(int i=1;i<=alen;i++){
			for(int j=1;j<=blen;j++){
				dp[i][j]=min(
					dp[i-1][j]+1,
					dp[i][j-1]+1,
					dp[i-1][j-1]+(s1[i-1]==s2[j-1] ? 0:1)
				);
			}
		}
		cout<<"A=" <<s1 << " B=" <<s2 <<" min distance="<<dp[alen][blen]<<endl;
	}
}
```

---

## 总结

动态规划的难点就是找转移方程，灵活确定子问题和问题维度是重中之重。