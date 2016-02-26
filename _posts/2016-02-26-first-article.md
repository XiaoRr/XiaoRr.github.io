---
layout: post
title:  "JavaScript 作用域和作用域链"
date:   2016-02-26 15:05:00
categories: Front-end JavaScript
excerpt: 无
---
* content
{:toc}

## JavaScript 作用域 

作用域就是变量与函数的可访问范围。在JavaScript中，变量的作用域有全局作用域和局部作用域两种。

---

### 全局作用域(Global Scope)

在代码中任何地方都能访问到的对象拥有全局作用域，一般来说以下 3 种情形拥有全局作用域。

1. 最外层函数和在最外层函数外面定义的变量拥有全局作用域
2. 所有末定义直接赋值的变量自动声明为拥有全局作用域
3. 所有window对象的属性拥有全局作用域   
    window对象的内置属性都拥有全局作用域，例如window.name、window.location、window.top等。

### 局部作用域(Local Scope)

和全局作用域相反，局部作用域一般只在固定的代码片段内可访问到，最常见的例如函数内部，所有在一些地方也会看到有人把这种作用域称为函数作用域
。

---

## 作用域链(Scope Chain)