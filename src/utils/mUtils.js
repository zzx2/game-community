
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}

// 节流函数
export const throttle=(fn,time)=>{
	let last=0
     return function(){
		 let context=this
		 let args=arguments
		 let now=+new Date()
		 if(now-last>=time){
			 last=now;
			 fn.apply(context,args)
		 }
	 }
}

// 防抖函数
export const Debounce=(fn,time)=>{
	let timer=null
	return function(){
		let context=this
		let args=arguments
		if(timer){
			clearTimeout(timer)
		}
		timer=setTimeout(function(){
			fn.apply(context,args)
		},time)
	}
}

// 防抖和节流

export const throttles=(fn,time)=>{
	let timer=null,last=0
	return function(){
		let context=this
		let args=arguments
		let now=+new Date()
		if(now-last>=time){
			if(timer){
				clearTimeout(timer)
			}
			timer=setTimeout(function(){
				last = now
				fn.apply(context,args)
			},time)
		}else{
			last = now
			fn.apply(context,args)
		}
		
	}
}