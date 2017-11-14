
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
