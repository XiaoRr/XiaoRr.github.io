---
layout: post
title:  "判断区间是否重叠的算法"
date:   2016-12-06
categories: c
tags: 算法
author: XiaoR
---
* content
{:toc}

判断两个区间[a.start,a.end])和[b.start,b.end]是否有重叠部分的方法





重叠可能有4种，不重叠可能有2种。

网络上能查到一种[看似优雅的方法](http://www.cnblogs.com/AndyJee/p/4537251.html)

```c
if (max(A.start,B.start)<=min(A.end,B,end))
	return true; //重叠
```

实际上仔细考量就会发现，上式展开为

	A.start <= A.end && B.start <= B.end && A.start <= B.end && B.start <= A.end

之后，前面两个根本是毫无必要的比较

因此，正常的

	if(A.start <= B.end && B.start <= A.end)

即可判断是否`重叠`了

对上式取反

	if(A.start > B.end || B.start > A.end)
	
用来判断区间是否`不重叠`

至于那个流传开来的一本正经的简化方法，我R某只想一脚踢在作者的脸上。