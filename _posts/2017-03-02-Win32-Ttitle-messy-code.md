---
layout: post
title:  win32标题栏乱码
date:   2017-03-02
categories: win32 
tags: 细节心得
author: XiaoR
---
* content
{:toc}

处理win32标题栏的乱码问题。




------

win32编程需要使用大量的WCHAR字符，其与普通字符的来回转化让人苦不堪言，只要在`项目-属性-配置属性-常规-使用多字节字符集`即可避免这个问题，然而又出现了新的问题：标题栏变成了乱码。

`CreateWindowW`这个函数只支持WCHAR数组作为标题栏，但是整个环境已经变成char的了，因此使用强制转化，强行输入char数组，即可解决这个问题。

```c

char title="hello";
HWND hWnd = CreateWindowW(szWindowClass, (WCHAR*)hello, WS_OVERLAPPEDWINDOW,
  CW_USEDEFAULT, 0, FieldX, FieldY, nullptr, nullptr, hInstance, nullptr);
	  
```