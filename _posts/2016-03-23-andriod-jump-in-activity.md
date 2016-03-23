---
layout: post
title:  "安卓页面跳转方法"
date:   2016-03-23
categories: 安卓
excerpt: 无
---
* content
{:toc}

偶尔想着要给博客加点新东西，但是学会了的东西往往抱有“这个谁不知道啊”的想法，因此就没有写，不得不说现在应该还有很多知识可以拿出去写博客吧，但是由于太习惯了我是不可能把它找出来了。

---

想在安卓中从页面A跳转到页面B，需要使用名为intent的复杂的玩意，虽然不是很懂但是直接复制粘贴代码也是可行的。

    public void Jump(View v) {
        Intent intent = new Intent(MainActivity.this,MainActivity2.class);
        startActivity(intent);
    }
    
把这个方法放在按钮里就可以跳转了。

---

再从B跳转到A的话，用同样的方法就不是好的选择了，因为你会发现在你完成一次A-B-A跳转后，再按安卓手机自带的返回键，会回退回B，如果B是A的子目录的话，在A按返回键回到B实在是太奇怪了。

于是使用更为简单的代码

    public void Back(View v) {
        finish();
    }

finish一个activity不知道会不会带来什么负担，比如下次得重新载入B之类的。不过暂时只学了这么多，也没有更好方法了，暂时就这样吧。



