---
layout: post
title:  "排序算法的时间效率测试代码"
date:   2016-04-25
categories: 算法
tags: 排序
author: XiaoR
---
* content
{:toc}

## 说明

代码为本人自写，在保证效率的情况下对代码进行了大量缩减，无技术含量可言，不宜学习模仿。

包含四种排序：冒泡，快速，归并，插入。





数组参数默认为数组的第一个与最后一个的指针，在归并排序中使用了"求中间指针的代码”（int *mid = left + ((right-left)>>1);），不具备普适性。其余与迭代器类似。可稍加改写以兼容。

有关归并排序，由于需要额外空间，是兼容性最差的一个，尚未解决。（使用了全局变量）

* 补充：采用c98的动态数组特性，貌似可以解决。

接触工程之后，我发现工程代码远比c冗长，估计以后很少有机会能写这种变态代码了吧。

## 代码

```c
#include <iostream>
#include <ctime>
#include <cstdio>
#include <cstdlib>
#include <windows.h>
using namespace std;


/**
* 快速排序
*/
void quickSort(int* left,int* right)
{
	if(left >= right)return ;

	int *l = left, *r = right;
	int mid = (*l + *r)>>1;

	while(l <= r){
		while (*l < mid)
			++l;
		while (*r > mid)
			--r;
		if(l <= r)
			swap(*l++, *r--);
	}
	quickSort(left, r);
	quickSort(l, right);
}

/**
* 优化冒泡排序
*/
void bubbleSort(int* left,int* right)
{
	int *change = right-1;
	while(change!=left){
		int *bound = change;
		change = left;
		for(int *i=left;i<bound;i++)
			if(*(i+1)<*i){
				swap(*(i+1),*i);
				change = i;
			}
	}
}
/**
* 归并排序(最大支持1e7)
*/
int tmp[10000000];
void mergeSort(int *left,int *right){
	if(right - left <= 1)return ;
	int *mid = left + ((right-left)>>1);
	mergeSort(left,mid);
	mergeSort(mid,right);
	/**以下为合并过程**/
	int *p=left, *q=mid, *t=tmp;
	while(p<mid && q<right)*t++ = *p<=*q ? *p++ : *q++ ;
	while(p<mid)  *t++ = *p++;
	while(q<right)*t++ = *q++;
	for(p=left,t=tmp;p<right;)
		*p++ = *t++;
}

/**
* 插入排序
*/
void insertSort(int *left,int *right){
	for(int *i=left+1;i<right;i++)
		for(int *j=i-1;j>=left && *j>*(j+1);j--)
			swap(*j,*(j+1));
}

/**
* 随机数创建
*/
void createData(int *left,int *right){
	srand(time(NULL));
	for(int *i= left;i<right;i++){
		*i = rand();
	}
}

/**
* 小范围测试用输出
*/
void print(int *left,int *right){
	int cnt = 0;
	for(int *i= left;i<right;i++){
		cout<<*i<<(cnt++%5==4)[" \n"];
	}
}

/**
* 测试用正确性检查
*/
bool isOrder(int *left,int *right){
	for(int *i= left+1;i<right;i++){
		if(i[-1]>i[0])return 0;
	}
	return 1;
}
int a[100000000];
int main(){
	//freopen("out","w",stdout);
	int test[] = {10}; //{1e3,1e4,1e5,1e6,5e6,1e7,5e7,1e8,5e8};
	bool testMergeSort = 1;
	bool testBubbleSort = 1;
	bool testInsertSort = 1;
	bool testQuickSort = 1;
	for(int i=0;i<=sizeof(test) / sizeof(int)-1;i++){
		printf("数据范围%d\n",test[i]);
		for(int j=0;j<4;j++){
			LARGE_INTEGER  large_interger;
			double dff;
			__int64  c1, c2;
			QueryPerformanceFrequency(&large_interger);
			dff = large_interger.QuadPart;
			QueryPerformanceCounter(&large_interger);
			c1 = large_interger.QuadPart;
			createData(a,a+test[i]);
			switch(j){
				case 0:if(testMergeSort)    mergeSort(a,a+i);break;
				case 1:if(testBubbleSort)   bubbleSort(a,a+test[i]);break;
				case 2:if(testInsertSort)   insertSort(a,a+test[i]);break;
				case 3:if(testQuickSort)    quickSort(a,a+i);break;
			}
			QueryPerformanceCounter(&large_interger);
			c2 = large_interger.QuadPart;
			double costtime = (c2 - c1) * 1000 / dff;
			switch(j){
				case 0:if(testMergeSort)
						printf("归并排序计时%lf毫秒\n",costtime);break;
				case 1:if(testBubbleSort)
						printf("冒泡排序计时%lf毫秒\n",costtime);break;
				case 2:if(testInsertSort)
						printf("插入排序计时%lf毫秒\n",costtime);break;
				case 3:if(testQuickSort)
						printf("快速排序计时%lf毫秒\n",costtime);break;
			}
		}
	}
	return 0;
}
```

