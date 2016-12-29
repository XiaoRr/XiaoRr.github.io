---
layout: post
title:  "优雅的使用java String"
date:   2016-12-06
categories: java
tags: 编程技巧 String
author: XiaoR
---
* content
{:toc}

Java的String类，乃至各种高级语言中的String类，几乎被当做一种基本类来看待，其本质是以`final`修饰的char型的数组。

本文将会从2方面解读String：String提供的优雅的函数，以及String内部构造的理解。





## String方法列表

摘自java api 7.0的大量方法，虽然有些用途狭窄，但是一旦用上就会很简洁。

String类位于java.lang.String，父类是java.lang.Object。

### 获取类

```java
void getChars(int srcBegin, int srcEnd, char[] dst, int dstBegin)  //转回chars
char[] toCharArray()  //更优雅的转回chars

int indexOf(int ch)  //获取str[ch]
int lastIndexOf(int ch)  //倒着数，基本没被用过

int length()  //获取长度

static String valueOf(num)  //从各种数字中获取String的静态方法

```

### 判断寻找类

```java
boolean contains(CharSequence s)	//返回字符串是否存在，如果还需要知道位置，可以用下面的函数

int indexOf(int ch,[int fromIndex])  	//这个函数在不存在时返回-1，第二个参数可不填

int lastIndexOf(String str)  //从最后找(太冷门了点)

//如字面所示,第二参数填写后等价于this.substring(toffset).startsWith(prefix)
boolean startsWith(String prefix, [int toffset])  
boolean endsWith(String suffix)

boolean equals(Object anObject) //最常用的一个

boolean equalsIgnoreCase(String anotherString) //很多时候其实可以用，增加鲁棒性

boolean matches(String regex)  //正则表达匹配！

/**例子**/
public static boolean isDate(String theStr) {
   return theStr.matches("\\d{4}\\-\\d{1,2}\\-\\d{1,2}");
}

```

### 比较类

```java
int compareTo(String anotherString)

int compareToIgnoreCase(String str)
```

### 再处理类

```java
static String format(String format, Object... args)  	//神级函数，用法类似c的peintf，用于生成复杂的格式

//替换函数
String replace(char oldChar, char newChar) 
String replace(CharSequence target, CharSequence replacement) 
String replaceAll(String regex, String replacement) 
String replaceFirst(String regex, String replacement)  

//分割函数,第二参数可不填
/**
* limit的作用：大于0：在分割成limit块后不再分割
*              小于0：随意分割
*              等于0：随意分割但是去掉空字符串
**/
String[] split(String regex, [int limit])

String substring(int beginIndex, [int endIndex]) 	//截取string，返回新的string，第二参数可不填

String toLowerCase()	//大小写转化
String toUpperCase() 

String trim()  //去除两侧的空白符，中间的不会去除

```

## String使用指南

摘自：[Java 中String类的终极总结](http://blog.csdn.net/hakunamatata2008/article/details/3961952)，为满足markdown格式有排版修改

### 不变模式

一个字符串对象创建后它的值不能改变。

```java
String str1="hello";//创建一个对象hello，不会变；
System.out.println(str1);
str1+=" world!";//两个字符串对象粘粘，系统其实创建了一个新对象，把Str1的指向改向新的对象；hello就变成了垃圾；
System.out.println(str1);
//如果一直这样创建会影响系统的效率；要频繁的改变字符串对象的值就用StringBuffer来描述；
StringBuffer sb=new StringBuffer("[");
sb.append("hehe");
sb.append("]");//append();不会制造垃圾，真正在改sb的值；
System.out.println(sb);
```

### 对象池
 
首先要明白，

```java
 Object obj = new Object();
```

obj是对象的引用，它位于栈中， new Object() 才是对象，它位于堆中。

可以这样理解obj是拴在氢气球上的绳子，new Object() 是氢气球，我们通过对象的引用访问对象，就像我们那着绳子氢气球才不会跑掉。
 
创建一个Stirng对象，主要就有以下两种方式：

```java
String str1 = new String("abc");    
Stirng str2 = "abc";  
```

虽然两个语句都是返回一个String对象的引用，但是jvm对两者的处理方式是不一样的。对于第一种，jvm会马上在heap中创建一个String对象，然后将该对象的引用返回给用户。对于第二种，jvm首先会在内部维护的strings pool中通过String的 equels 方法查找是对象池中是否存放有该String对象，如果有，则返回已有的String对象给用户，而不会在heap中重新创建一个新的String对象；如果对象池中没有该String对象，jvm则在heap中创建新的String对象，将其引用返回给用户，同时将该引用添加至strings pool中。注意：使用第一种方法创建对象时，jvm是不会主动把该对象放到strings pool里面的，除非程序调用 String的intern方法。看下面的例子：

```java
String str1 = new String("abc"); //jvm 在堆上创建一个String对象   
  
//jvm 在strings pool中找不到值为“abc”的字符串，因此   
//在堆上创建一个String对象，并将该对象的引用加入至strings pool中   
//此时堆上有两个String对象   
Stirng str2 = "abc";   //并没有创建对象，因为对象池里已经有"abc" 了
 
if(str1 == str2){   
	System.out.println("str1 == str2");   
}else{   
	System.out.println("str1 != str2");   
}   
//打印结果是 str1 != str2,因为它们是堆上两个不同的对象   
  
String str3 = "abc";   
//此时，jvm发现strings pool中已有“abc”对象了，因为“abc”equels “abc”   
//因此直接返回str2指向的对象给str3，也就是说str2和str3是指向同一个对象的引用   
if(str2 == str3){   
	System.out.println("str2 == str3");   
}else{   
	System.out.println("str2 != str3");   
}   
 //打印结果为 str2 == str3  
```

### String / StringBuffer / StringBuilder 
 
String类是字符串常量，是不可更改的常量。而StringBuffer是字符串变量，它的对象是可以扩充和修改的。
 
```java
StringBuffer sb=new StringBuffer("[");//创建StringBuffer对象
sb.append("hehe");//把hehe加入字符串，变成 "[hehe"
sb.append("]");//append();不会制造垃圾，真正在改sb的值；
System.out.println(sb);
String str = sb.toString();//把"[hehe]"，赋值给一个字符串对象str
```

StringBuilder,一个可变的字符序列。此类提供一个与 StringBuffer 兼容的 API，但不保证同步。该类被设计用作StringBuffer 的一个简易替换，用在字符串缓冲区被单个线程使用的时候（这种情况很普遍）。如果可能，建议优先采用该类，因为在大多数实现中，它比 StringBuffer 要快。

```java
StringBuilder sb=new StringBuilder("[");//创建StringBuilder对象
sb.append("hehe");//把hehe加入字符串，变成 "[hehe"
sb.append("]");//append();不会制造垃圾，真正在改sb的值；
System.out.println(sb);
String str = sb.toString();//把"[hehe]"，赋值给一个字符串对象str
```

### 为何要采取不变模式

改自[如何理解 String 类型值的不可变？ - 回答作者: 胖胖](http://zhihu.com/question/20618891/answer/114125846)

```java
public final class String implements java.io.Serializable, Comparable<String>, CharSequence {
    /** String本质是个char数组. 而且用final关键字修饰.*/
    private final char value[];
	...
	...
}
```

在上面的结构中我们可以一目了然的看见String不变性的原因，`final`甚至将继承的道路都锁死了，再加上代码没有提供任何直接修改这个数组的方法，成功实现了String的不变性。

不变模式的代价在于其无法简单的修改String内元素的值，就算是一个简单的加操作也会消耗大量的资源。

但是其优点在于[b]安全[/b]，在下面的例子中，假如String具有可变的形式（如`StringBuilder`），就有可能因为程序员的无意而导致其本身值的改变。

```java
class Test{
    //不可变的String
    public static String appendStr(String s){
        s+="bbb";
        return s;
    }

    //可变的StringBuilder
    public static StringBuilder appendSb(StringBuilder sb){
        return sb.append("bbb");
    }

    public static void main(String[] args){
        //String做参数
        String s=new String("aaa");
        String ns=Test.appendStr(s);
        System.out.println("String aaa >>> "+s.toString());

        //StringBuilder做参数
        StringBuilder sb=new StringBuilder("aaa");
        StringBuilder nsb=Test.appendSb(sb);
        System.out.println("StringBuilder aaa >>> "+sb.toString());
    }
}

//Output: 
//String aaa >>> aaa
//StringBuilder aaa >>> aaabbb
```

下面这个例子更是直接破坏了hash的键值唯一性

```java
//可变类型做键值的风险
class Test{
    public static void main(String[] args){
        HashSet<StringBuilder> hs=new HashSet<StringBuilder>();
        StringBuilder sb1=new StringBuilder("aaa");
        StringBuilder sb2=new StringBuilder("aaabbb");
        hs.add(sb1);
        hs.add(sb2);    //这时候HashSet里是{"aaa","aaabbb"}

        StringBuilder sb3=sb1;
        sb3.append("bbb");  //这时候HashSet里是{"aaabbb","aaabbb"}
        System.out.println(hs);
    }
}
//Output:
//[aaabbb, aaabbb]
```

此外，String在不可变的情况下，也保证了多个线程同时读取时不出错（线程安全），以及可共用同一个字符串常量池（内存优化）

而其修改不易的缺陷可交由StringBuilder解决。

-----------------

综上，String是一个非常优雅的数据类型，希望你能优雅的使用它。