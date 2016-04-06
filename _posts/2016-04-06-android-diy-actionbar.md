---
layout: post
title:  "自定义actionBar的返回按钮"
date:   2016-04-06
categories: 安卓
excerpt: 无
---
* content
{:toc}

## 问题

AS的默认界面就有一个actionBar，后来要为ActionBar加上返回按钮。自己写实在太麻烦啦，于是准备直接给原来的加上。

	ActionBar actionBar = getActionBar();
	
然后报错了，提示未找到ActionBar.

---

## 获取ActionBar

仔细观察发现自己所有的页面都继承自AppCompatActivity，这时才明白为何安卓页面会自带ActionBar了，在里面翻找了一下，找到这个函数。

	public ActionBar getSupportActionBar() {
        return getDelegate().getSupportActionBar();
    }
	
原来用的是getSupportActionBar，最后把代码改成

	android.support.v7.app.ActionBar actionBar = getSupportActionBar();
	
遂成功。

这时候我才理解了安卓程序部分架构，原来大部分代码都在父类里（惭愧

---

## 编写父类

然后继续完成，我写了很多页面，每个页面获取一次ActionBar未免过于繁琐。于是我想到自定义一个父类。

在网上查找教程，发现他们也都是定义了父类，绕了一大圈才回到了起点，于是根据我贫弱的面向对象知识，我编写了以下父类

	public class MyAppActivity extends AppCompatActivity{

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        android.support.v7.app.ActionBar actionBar = getSupportActionBar();
        actionBar.setShowHideAnimationEnabled(true);
        //actionBar.setTitle("test");
	}
	
然后让其他类都改为继承这个类，果然返回按钮出现了。

---

## 完善

为了让按钮起作用，得去mainfests里定义一个parentActivityName属性，随后返回按钮就可以回到父类了，但是切换效果和跳转相同，和直接按返回键相反，颇为奇怪。

于是重写父类方法。

	public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                finish();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
	
简单暴力的把finish绑定在返回按钮上，页面顿时变得顺滑。

---

## 最终代码

以后想添加更多样式也可以直接修改自己的类了。

	import android.os.Bundle;
	import android.support.v7.app.AppCompatActivity;
	import android.view.MenuItem;

	/**
	 * Created by XiaoR on 2016/4/3 0003.
	 * 自定义actionBar，提供返回按钮
	 */
	public class MyAppActivity extends AppCompatActivity{

		protected void onCreate(Bundle savedInstanceState) {
			super.onCreate(savedInstanceState);
			android.support.v7.app.ActionBar actionBar = getSupportActionBar();
			actionBar.setShowHideAnimationEnabled(true);
			//actionBar.setTitle("test");
		}

		public boolean onOptionsItemSelected(MenuItem item) {
			switch (item.getItemId()) {
				case android.R.id.home:
					finish();
					return true;
				default:
					return super.onOptionsItemSelected(item);
			}
		}
	}

---

## 遗留问题

即使返回不借助parentActivityName属性，在xml里依然要补完这个属性，令人不太愉悦。目前尚未解决。