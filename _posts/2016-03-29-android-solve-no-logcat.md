---
layout: post
title:  "安卓实机调试不显示logcat"
date:   2016-03-29
categories: 安卓
excerpt: 无
---
* content
{:toc}

## 问题

在编写安卓代码时，实机测试时程序经常出错退出，但是logcat里却没有调试信息。

换用AVD的话，出错信息正常。

## 解决方法

### 华为手机

1.在拨号界面输入“\*#\*#2846579#\*#\*

2.找到log选单并打开log。此举会使手机性能下降。

### 其他手机

1.自行百度 手机品牌/系统 + 打开logcat

### 万能

1.打开logcat，并设置level，执行命令如下

> adb shell

> echo 1 > /sys/kernel/logger/log_main/enable

说明：将1写入日志开关文件，1为开，0为关

> echo 2 >/sys/kernel/logger/log_main/priority

说明：将代表level的2写入优先级文件

2.重启adb，如果使用eclipse，先关闭eclipse，再重启adb，再启动eclipse

> adb kill-server

> adb start-server

* 参考：[Android手机调试无法查看logcat](http://blog.csdn.net/huqingwei0824/article/details/6858159)



