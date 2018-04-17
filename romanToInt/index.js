/*
 * leetcode 罗马数字转number 
 * 建立map对应罗马数字对应的阿拉伯数字
 * 从头遍历字符串来累加 (但是当前值大于上一个值的时候那上一个值其实是需要减去的我在这里减去2份)
 * 也可以从后面开始遍历
 */
const map = {
		'I': 1,
		'V': 5,
		'X': 10,
		'L': 50,
		'C': 100,
		'D': 500,
		'M': 1000,
	};
let romanToInt = function(s) {
	let all = 0,
		prev = map[s[0]],
		now;
	let length = s.length;
	for(let i = 0;i < length;i++){
		now = map[s[i]];
		all += now;
		if(now > prev){
			all -= 2*prev;
		}
		prev = now
	}
	return all
};
/**
 * 查看了别人的代码发现另一种方法，在左面当做减法的时候做法更方便
 * 从末尾遍历 当一个单位不能满足当前的值 他需要使用更高位来表示 
 * 他在判断当前值是否大于更高位的值 如果大于那么按道理是要用更高位 现在存在说明是执行的左减的逻辑
 */
let romanToInt = function(s) {
	let all = 0,
		res;
	for(let i = lens.lengthgth;i > 0;i--){
		switch(s.charAt(i)){
            case 'I':res += (res < 5 ? 1 : -1);break;
            case 'V':res += (res < 10 ? 5 : -5);break;
            case 'X':res += (res < 50 ? 10 : -10);break;
            case 'L':res += (res < 100 ? 50 : -50);break;
            case 'C':res += (res < 500 ? 100 : -100);break;
            case 'D':res += (res < 1000 ? 500 : -500);break;
            case 'M':res += (res < 10000 ? 1000 : -1000);break;
		}
	}
	return res
};



