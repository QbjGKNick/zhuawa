# OOP

## 面向过程与面向对象

结构体

由一批数据组合而成的结构
```c
struct {
  int id;
  char b;
  double score
} student
```

### OOP 面向对象 -- 面向过程
学好面向对象
- Java
- 设计模式

一切皆对象

#### example
我 吃 回锅肉

##### 从面向过程
- 养猪
- 杀猪 -- pork
- 切菜，做饭 -- overCooked meat

##### 从面向对象的角度
- 我 -- 吃 -- 回锅肉
- 回锅肉从哪里来？

```js
class Consumer extends Person {
  eat(food: Dish) {
    food.beEat()
  }
}

class Chief extends Person {
  cook(food: Pork) {
    food.cooked()
  }
}

class Food() {}

class Pork extend Food() {
  cooked()
}

class Dish extends Food() {
  beEat() {
    
  }
}

```

## 创建一个对象，有几种方式？

### Object.create()

```js
const foo = Object.create({});

const a = Object.create(b);
// 代表着 a 对象 的原型指向 b 对象
a.__proto__ = b;

///////////////////////////////////////
const bar = {};
// -> 意味着，bar 的原型链，指向了 Object 的原型
// bar.__proto__ === Object.prototype

const foo = Object.create({});
// foo.__proto__ === {}
// foo.__proto__.__proto__ === Object.prototype
```

如果我们不想多这一层，我们又想用 Object.create 创建，怎么办？

```js
const foo = Object.create(Object.prototype);
```

### new Obj()

```js
function Person(name) {
  this.name = name;
}
const p = new Person("菜鸡");

// 1. new 创建了一个对象，这个时候指向了构造函数的原型
p.__proto__ === Person.prototype;
// 2. 构造函数上，有个 原型 prototype，原型里面，有个 constructor 函数，就是构造函数自己
Person.prototype.constructor === Person;
// 3. p 的构造函数，是 Person
p.constructor === Person;
```

#### new 关键字到底干了什么？

1. new 创建了一个对象，这个对象，指向了构造函数的原型
2. 该对象，实现了 这个构造函数的方法
3. 根据一些特定情况，返回对象

- 如果 这个构造函数，没有返回值，或者返回一个基本类型，那么最后返回创建的对象
- 如果 有返回值，且是个对象，则返回这个对象

```js
function newFunc(Father) {
  var obj = Object.create(Father.prototype);
  // obj.Father('菜鸡')
  var result = Father.apply(obj, Array.prototype.slice.call(arguments, 1));
  return result && typeof result === "object" ? result : obj;
}
const p = newFunc(Person, "菜鸡");
```

#### 我们怎么用 new 的方式，来模拟实现 Object.create

```js
function inhert(p) {
  if (Object.create) {
    return Object.create(p);
  }
  function f() {}
  f.prototype = p;
  f.prototype.constructor = f;
  return new f();
}
const a = inhert(b);
```

### var bar = {}

## 继承

### 原型链继承

```js
function Parent() {
  this.name = "parentName";
}
Parent.prototype.getName = function () {
  console.log(this.name);
};

function Child() {}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

(c.__proto__.__proto__ === Child.prototype.__proto__) === Parent.prototype;
// 隐含问题
// 1. 属性如果是引用，一旦某个实例修改了，那么都会改
// 2. 创建 Child 的时候，是没有办法传参的。
```

### 构造函数继承

```js
function Parent(actions, name) {
  this.actions = actions;
  this.name = name;
}

function Child(id) {
  Parent.apply(this, Array.prototype.slice.call(arguments, 1));
  this.id = id;
}
// 隐含问题
// 1. 属性或者方法，想被继承的话，只能在构造函数中定义
// 2. 如果方法在构造函数中定义了，每次都会创建
```

### 组合继承

```js
function Parent(actions, name) {
  this.actions = actions;
  this.name = name;
}

Parent.prototype.getName = function () {
  console.log(this.name);
};

function Child(id) {
  Parent.apply(this, Array.prototype.slice.call(arguments, 1));
  this.id = id;
}

Child.prototype = new Parent();
// Child.prototype.__proto__ = Parent.prototype
Child.prototype.constructor = Child;
```

### 组合寄生式继承

```js
function inherit(p) {
  if (Object.create) {
    return Object.create(p);
  }
  function f() {}
  f.prototype = p;
  f.prototype.constructor = f;
  return new f();
}

function Parent(actions, name) {
  this.actions = actions;
  this.name = name;
}

Parent.prototype.getName = function () {
  console.log(this.name);
};

function Child(id) {
  Parent.apply(this, Array.prototype.slice.call(arugments, 1));
  this.id = id;
}

Child.prototype = inherit(Parent.prototype);
Child.prototype.constructor = Child;
```

### 逻辑

所谓继承， 干的事其实很简单

1. Child.prototype.**proto** === Parent.prototype
2. 你 Parent 构造函数上，初始化的那些个属性，我得有

#### 1. 使用 new

```js
const a = new A();

a.__proto__ = A.prototype;
```

#### 2. 使用 Object.create

```js
const a = Object.create(A.prototype);
```

##### 组合寄生继承和 class 继承 有什么区别？

- class 继承，会继承静态属性
- 子类中，必须在 constructor 调用 supper，因为子类自己的 this 对象，必须通过父类的构造函数完成。
