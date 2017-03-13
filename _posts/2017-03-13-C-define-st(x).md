---
layout: post
title:  深入理解#define st(x) do { x } while (__LINE__ == -1)
date:   2017-03-13
categories: c
tags: 编程技巧
author: XiaoR
---
* content
{:toc}

第一次接触这个宏定义我也是一头雾水，下面来解析下这个宏定义的原理。






------

## 分段解析

`__LINE__`：内置宏变量，代表当前代码所在行数。

`__LINE__ == -1`：由于该宏变量大于等于0，因此该表达值为`false`。

`do {x} while(false)`： 在执行完x后由于while不成立于是跳出。实际上就是执行一次x。

综上，st(x) 就是把x执行一次。

------

## 疑惑

然而这和直接执行x有何区别？熟悉宏定义的人都知道宏定义由于是暴力字符替换，所以经常出Bug，如下面的例子。

```c
if(flag)
	st(a = b;b = c;);
	
```

若 `#define st(x) x` 则会出现

```c
if(flag)
	a = b;
b = c;
```

的情况。

-------

## 疑惑x2

Q: 若如此直接#define st(x) {x} 不行吗

A: 部分编译器会报错。

Q: 为啥需要这个define而不是用花括号直接包含代码？

A: st(x)一般被用于其他宏定义中，例

```c
#define HAL_ENTER_CRITICAL_SECTION(x)   st( x = EA;  HAL_DISABLE_INTERRUPTS(); )
```

Q：直接while(0)不行吗，为何要用到宏变量？

A: 不知道，大抵又是编译器的锅。

## 总结

这个写法虽然炫酷但是确实脱离目前实际太远了，现实中已经失去了意义。

## 额外参考

```
/*
 *  This macro is for use by other macros to form a fully valid C statement.
 *  Without this, the if/else conditionals could show unexpected behavior.
 *
 *  For example, use...
 *    #define SET_REGS()  st( ioreg1 = 0; ioreg2 = 0; )
 *  instead of ...
 *    #define SET_REGS()  { ioreg1 = 0; ioreg2 = 0; }
 *  or
 *    #define  SET_REGS()    ioreg1 = 0; ioreg2 = 0;
 *  The last macro would not behave as expected in the if/else construct.
 *  The second to last macro will cause a compiler error in certain uses
 *  of if/else construct
 *
 *  It is not necessary, or recommended, to use this macro where there is
 *  already a valid C statement.  For example, the following is redundant...
 *    #define CALL_FUNC()   st(  func();  )
 *  This should simply be...
 *    #define CALL_FUNC()   func()
 *
 * (The while condition below evaluates false without generating a
 *  constant-controlling-loop type of warning on most compilers.)
 */
#define st(x)      do { x } while (__LINE__ == -1)
```
