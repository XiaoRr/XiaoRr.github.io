---
layout: post
title:  制作简单的安装程序
date:   2017-04-24
categories: c#
tags: 小工具
author: XiaoR
---
* content
{:toc}

沙盒小游戏《terraria》终于有官中了，抗药汉化组的事情基本告一段落。然而鉴于目前的翻译质量较低，汉化组依然发行了1351版本的汉化。

我注意到每次的汉化方式较为简陋（手动覆盖文件）因此准备着手写一个简单安装程序。





-----------

## 需求分析

用户能够通过本软件实现`一键汉化`。汉化本质为部分文件的替换。

软件需要寻找游戏的安装目录，再去覆写目录下的文件。

-----------

## 平台选择

虽然一开始准备用熟悉的java或是c++，但是寻找安装目录方面都比较困难，这时候mist给我推荐了[tshock的代码][1]

既然有现成的轮子，那么自然要体验下c#的便捷了。

[1]:https://github.com/mistzzt/Terraria-Map-Editor/blob/cn_master/TEditXna/DependencyChecker.cs

-----------

## WPF框架

新建项目-WPF项目，首先映入眼帘的就是一个可视化窗口，按以往的经验，在xaml文件里新建了一个button标签，稍微调整下大小。再双击创建出的按钮，果然就进入了代码编辑。

-----------

## 资源文件

下一个问题是如何将要替换的文件准备好。这些文件放在exe文件外未免过于尴尬，幸好c#有成熟的资源文件管理方案。直接项目-添加-新建项-常规-资源文件，插入准备好的
新文件，然后就可以调用了。

资源文件只能用流的方式调用，因此将其转为文件流直接写入。

```c#
MemoryStream i = new MemoryStream(资源文件.Terraria);
var o = File.Open(path + "\\terraria.exe", FileMode.Create);
CopyStream(i, o);
```
	
CopyStream:

```c#
public static void CopyStream(Stream i, Stream o)
{
	byte[] b = new byte[32768];
	while (true)
	{
		int r = i.Read(b, 0, b.Length);
		if (r <= 0)
			return;
		o.Write(b, 0, r);
	}
}
```
解决这个已经没什么难点了。替换文件后，成功获得了一份汉化版的terraria。

-----------

## 总结

在这个程序中基本从头到尾都是别人的轮子，这也是写项目的一种趋势吧。C#这门语言的确非常的优秀，兼顾c++的短小与java的能力。这次从发现问题到解决问题用时不足2小时，也算是
一种乐趣了。

