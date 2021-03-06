---
layout: post
title:  游戏架构之基本逻辑循环
date:   2017-03-25
categories: 
tags: 游戏架构
author: XiaoR
---
* content
{:toc}

浅谈游戏架构设计的一点心得。




-------

## 引子
 
除非使用现成的游戏引擎，否则在编写游戏时多半都会碰到“我该如何实现游戏架构”的问题。

最早由c等简单语言入门的人，会考虑“事件是如何触发的”和“事件是如何监听的”两个问题，第一个问题的通俗表达是：什么情况下这个人会动？第二个问题
则是“我该如何让程序知道这个人该动了？”


## 从简单到复杂

### 最简单的架构

直觉上很容易理解的行为，在程序里往往会走些弯路。举例子来说，假如目前有一个玩家，按住w他会向上走：

```cpp
char input;
while(
	cin>>input;
	if(input=='w')Player.up();
	Player.draw();
}
```

这是单线程的极限了，可以看到，如果不输入值，程序就会锁死在`cin`行，也就是说，目前唯一能改变游戏中玩家位置的事件为玩家的输入。

尽管一些玩家输入单一的游戏（例如2048）已经可以这样实现，但是这和我们平时玩的大多游戏并不相同，玩家就算不按键，游戏画面应该也要照常移动才对。怪物不会因为你
不动就停止下来等你，那么我们会想要是有这样一个函数该有多好。

```cpp
while(
	if(isPressed('W'))Player.up();
	Player.draw();
}
```

例子中假想的isPressed函数在你按下W时返回真，否则返回假。

### 定时器的必要性

没错，如果没有恼人的cin，程序看起来就美好多了，当然你会发现如果你按下W，那么这个循环会飞快的执行无数次直到你松开为止。这显然有些不合理，sleep()函数提供了一种粗暴的方案
来控制循环的次数，在代码简单的情况下可以运用。

```cpp
while(
	if(isPressed('W'))Player.up();
	Player.draw();
	sleep(100);		//暂停100ms
}
```

这样循环执行的就不会快的突破天际了，或许我们还可以考虑下一个60帧的游戏应该sleep多久？

等等，为什么[b]游戏的逻辑要和游戏的画面同步？[/b]，我们把上面的代码分为逻辑部分：`if(isPressed('W'))Player.up();` 和 绘制部分 `Player.draw();`。
我们会发现，60帧的画面就得要60帧的逻辑，假如我把游戏调整至120帧，游戏逻辑执行次数也会加倍---一般来说这是让游戏速度也加倍了。

如果负责绘制和逻辑的判定放在一个循环体里，这两个无关的东西就会互相干扰，这时候寻求一个定时器是必要的。

定时器是多线程的范畴，我简写成Timer(interval,do),interval是定时器的间隔，do则是要做的事，比如

```cpp
int main(){
	Timer(100,do);

void do(){
	print("hello");
}
```

上面是一份伪代码，每0.1秒（100ms）会输出一个hello，一般来说，无论你用的是什么语言，都能找到类似的东西，它会成为之后游戏循环的核心部件。

找到合适的定时器之后，我们来重写代码。

```cpp
int main(){
	Game game = new Game();
	Timer(8,game.logic());
	Timer(16,game.draw());
}
```

一个简单的架构，每16ms执行一次绘制---每秒约60帧，逻辑则更快，选择了8ms一次。这是因为逻辑函数的执行速度往往比绘制速度要快的多。有时候人们也需要灵敏的逻辑函数。

## 



