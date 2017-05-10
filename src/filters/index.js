const state = {
	"Y":"有效",
	"N":"无效"
}

export const courseStatus = function(type){
    return state[type]
}
export const normalTime=(time)=>{
	// if(time){
		let d = new Date(time); 
        return time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
	// }
}