---
layout: post
title:  "华为安卓实机调试不显示logcat的解决方法"
date:   2016-03-29
categories: 安卓
author: XiaoR
---
* content
{:toc}







## 问题

在编写安卓代码时，实机测试时程序经常出错退出，但是logcat里却没有调试信息。

换用AVD的话，出错信息正常。

## 解决方法

### 华为手机

1.在拨号界面输入“\*#\*#2846579#\*#\*

2.找到log选单并打开log。

*此举会使手机性能下降。

### 小米手机（待测试）

在电脑上找到 .Android文件夹，win下在C:\Users\dell\.android，mac的就在系统盘根目录下，（可能是隐藏的，我的在win下没有隐藏，mac下是隐藏的）
在这个文件夹里找到adb_usb.ini这个文件，打开在里面添加 0x2717 重启一下logcat。

如果找到不这个文件，新建一个，然后添加0x2717 重启logcat。

### 万能法（待测试）

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

* 参考：[关于小米手机连接电脑，不能查看logcat日志的解决方法](http://blog.sina.com.cn/s/blog_6b3661a90101887l.html)



