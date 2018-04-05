let allNum = 0;
let completeNum = 0;
function log(e){
	completeNum+=1;
	console.log('completeNum'+completeNum);
	document.querySelector('#child').style.width = e[0].offsetX+'px'
}
let fun = throttle(log,50)
function throttle(callback,delta=1000,context){
    let state = true;
    return function(){
    	allNum += 1;
    	console.log('allNum'+allNum)
        if(state){
            callback.call(context,arguments);
            state = false;
            setTimeout(()=>{
                state = true;
            },delta);
        }
    }
}
document.querySelector('#animate').addEventListener('mousemove', fun);
// 这样下来可以有效的减少触发的次数 增加整体的效果根据输出来看 基本相当于4次触发只触发函数1次