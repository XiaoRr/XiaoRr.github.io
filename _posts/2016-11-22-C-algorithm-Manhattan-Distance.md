---
layout: post
title:  "算法-求最远/近曼哈顿距离"
date:   2016-11-09
categories:算法
excerpt: 无
---
* content
{:toc}

## 介绍

曼哈顿距离是两点在南北方向上的距离加上在东西方向上的距离，即d（i，j）=|xi-xj|+|yi-yj|，这个计算的特点是迅速，不会有误差。被广泛用于计算机当中。

曼哈顿距离可以拓展到一维，以及更高的维度

## 解法

已知一个点集的坐标求其中曼哈顿距离最远的两个点是一种经典的问题，暴力解决这个问题的复杂度是O(N^2)。

从二维情况开始考虑这个问题的优化解

设距离最远的两点为i,j，可知所求的最大距离必定有以下四种形式之一：
* (xi-xj)+(yi-yj), (xj-xi)+(yi-yj), (xi-xj)+(yj-yi), (xj-xi)+(yj-yi) 

变形一下，把相同点的坐标放到一起
* (xi+yi)-(xj+yj), (-xi+yi)-(-xj+yj), (xi-yi)-(xj-yj), (-xi-yi)-(-xj-yj)

继续变形
* (xi+yi)+(-xj-yj), (-xi+yi)+(xj-yj), (xi-yi)+(-xj+yj),(-xi-yi)+(xj+yj) 

由此，可以发现一个规律，即去绝对值之后把同一点的坐标放在一起，对应坐标的符号总是相反的，如(-xi+yi)与(xj-yj)

假如我们用0表示负号，1表示正号，则(-xi+yi)与(xj-yj)两个括号内的符号可以表示为：01和10        

当你多举几个例子之后，就会发现，对于一个确定的维数D,符号转化成的二进制数，它们的和总是一个定值，即2^d-1，这就说明了，当我们知道了前一个点去绝对值之后的符号，就可以知道第二个点去绝对值后的符号是怎样的。 

只要对所有的点(xi,yi)，依次计算出(xi+yi),(xi-yi),(-xi+yi),(-xi-yi)这四种形式，然后把每个点i算出来的这四种情况的最大值分别记录到一个集合中，然后枚举每一种去绝对值的组合，共四种，对于每种组合从四个集合中找最大值，取四种情况的最大(小)值即可。

这样的算法复杂度是O(2^P*N)

## 进阶

如果使用可维护的算法，也就是可以增加点和去除点的算法，就得使用一种数据结构，这种数据结构支持在O(logn)的时间里完成增删查改，如果没有删除的话，或许优先队列也是不错的选择。

stl中的set使用的是红黑树，非常适合完成这个任务

以下是例题

:![](pic/2016-11-22.png)

代码如下

	#include <iostream>
	#include <cstdio>
	#include <set>
	using namespace std;

	int t[32][100005];
	multiset<int> s[32];
	int status,n,p;

	void Answer(int z){
		int Max = 0;
		for(int i=0;i<status>>1;i++){
			multiset<int>::iterator it1 = --s[i].end(),it2 = --s[status-i-1].end();
			Max = max(Max,*it1+*it2);
			//cout<<"i="<<i<<" end="<<*it1 <<" "<<*it2<<endl;
		}
		cout<<Max<<endl;
	}
	int main(){
		scanf("%d%d",&n,&p);
		status = 1<<p;
		for(int z=0;z<n;z++){
			int cas;
			scanf("%d",&cas);
			if(cas==0){
				int tmp[5];
				for(int i=0;i<p;i++){
					scanf("%d",&tmp[i]);
				}
				for(int i=0;i<status;i++){
					t[i][z] = 0;
					for(int j=0;j<p;j++){
						t[i][z] += (i&(1<<j))?tmp[j]:-tmp[j];
					}
					//cout<<"i="<<i<<" t[i][z]="<<t[i][z]<<endl;
					s[i].insert( t[i][z] );
				}
				Answer(z);
			}
			if(cas==1){
				int c;
				scanf("%d",&c);
				for(int i=0;i<status;i++){
					//cout<<"del"<<"i="<<i<<" "<<t[i][c-1]<<endl;
					s[i].erase(s[i].find(t[i][c-1]));
				}
				Answer(z);
			}
		}
	}

	/**
	10 2
	0 208 403
	0 371 -180
	1 2
	0 1069 -192
	0 418 -525
	1 5
	1 1
	0 2754 635
	0 -2491 961
	0 2954 -2516
	*/
