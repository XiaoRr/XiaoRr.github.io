---
layout: post
title:  TShock学习
date:   2018-08-26
categories: c#
tags: 学习
author: XiaoR
---
* content
{:toc}

TShock是游戏《泰拉瑞亚》的服务器端，使用C#编译而成。


-----

## 引子

我发现，写博客的另一个用途是，防止已经学会的知识再次遗忘。TS先前学习过，但是忘记了，因此再学习一次，这次记录笔记。

## 环境配置

首先从Mist的github上下载TS的汉化版，这是一个非常复杂的项目。[项目地址]

跟随文档，首先打开`TShock.4.OTAPI.sln`，选择`TShock.Modifications.Bootstrapper`作为起始项目编译。这里需要选择debug版本。运行生成后的exe文件，下载一些新的dll。

随后打开`TShock.sln`，将编译目录设置为`/TerrariaServerAPI/TerrariaServerAPI/bin/Debug/ServerPlugins`并编译。

如果步骤失败，尝试使用`git`恢复`csproj`到最初的状态。

最后一个步骤是把`prebuilts`文件夹里的`sqlite3.dll`复制到`/TerrariaServerAPI/TerrariaServerAPI/bin/Debug/`

## 插件研究

[项目地址]:https://github.com/mistzzt/TShock