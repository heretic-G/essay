
### Debounce
设置一个值 如果在delay时间内没有新值 在时间结束时发送这个值

在delay获取到新值 保存新值 从新重置delay
```javascript
    function debounce(callback,delta=1000){
        let timeOutId = 0;
        return ()=>{
            clearTimeout(timeOutId);
            timeOutId = setTimeout(()=>{
                callback()
            },delta)
        }
    }
```
在看的博客中他的最终是这样的
```javascript
    function debounce(callback,delta=1000,context){
        let timeOutId = 0;
        return function(){
            let argus = arguments;
            clearTimeout(timeOutId);
            timeOutId = setTimeout(()=>{
                callback.apply(context,args)
            },delta)
        }
    }
```
首先return 那里不用箭头函数是因为箭头函数没有`arguments`

我自己的写法如果加参数啥的 可能最终代码的可读性没有下面的更强

比如我的最终会是`getData()` 而他的会是`getData('zhangsan')`


### Immediate
这个其实和上一个是类似相反的

这个是限制性函数在delta之后才能触发下一次

```javascript
    function immediate(callback,delta = 1000,context){
        let state = true,
            timeOutId = null;
        return function(){
            if(state){
                callback.apply(context,arguments);
                state = false
            }
            clearTimeout(timeOutId);
            timeOutId = setTimeout(()=>{
                state = true;
            },delta)

        }
    }

```

### Throttle
这种是执行一个函数在delta之后才能在执行下一个
```javascript
    function throttle(callback,delta=1000,context){
        let state = true;
        return function(){
            if(state){
                callback.call(context,arguments);
                state = false;
                setTimeout(()=>{
                    state = true;
                },delta);
            }
        }
    }
```




### 柯里化
柯里化 把一个多参的函数改为分别传入
实现来说就是return 保存上一个参数的函数调用
```javascript
    function add(x = 0,y = 0) {
        return x+y
    }
```
改为柯里化
```javascript
    function add(x = 0) {
        return function(y = 0) {
            return x+y
        }
    }
```
我一直认为柯里化使用场景很少 (可能也是并没有理解)
或者这种封装的
```javascript
    function curry(fn){
        let arr = Array.prototype.slice.call(arguments,1),
            length = fn.length;
        function callback(){
            arr = arr.concat(Array.prototype.slice.call(arguments,0));
            if(arr.length>=length){
                fn.apply(this,arr)
            }else{
                return callback
            }
        } 
        return callback 
    }
```
这种其实就是在参数满足fn的个数的时候调用或者别的判断调用方式也可以 比如不传参数的时候
### 缓存函数
```javascript
    function cache(fn){
        let cache = Object.create(null);
        return function(str){
            let hit = cache[str];
            return hit || (cache[str] = cb(str))
        }
    }
```
缓存函数算是我们在开发中比较常用的方法

### vertical-align
定义行内元素的基线 就是水平如何对齐 默认就是baseline
inline block根据自己最后一个line box 的基线算 没有就按照margin-bottom 算
那其实注意的地方就只有一点 就是overflow的设置 如果一个inline-block设置了非visible那么他不在根据自己最后一个line box 的基线来计算而是根据margin-bottom来算 

造成这样的原因很简单 如果设置overflow 浏览器不知道最后一个line box还是否会展示出来




