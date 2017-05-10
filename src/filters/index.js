export const courseStatus = function(courseState){
    return courseState==="Y" ? "有效" : "无效"
}
export const normalTime=(time)=>{
	if(time){
		let d = new Date(time); 
        // return time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
	}
}