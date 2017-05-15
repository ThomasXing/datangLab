const courseState = {
	"Y": "有效",
	"N": "失效"
}
const classState = {
	W:'准备开课',
	S:'开课',
	E:'结课',
	N:'无效'
}
const classState1 = {
	W:'无效',
	S:'无效',
	E:'无效',
	N:'启用'
}
const get_courseState={
	"N":"启用",
	"Y":"失效"
}
const get_sex ={
	"F":'女性',
	"M":'男性'
}
const get_managementState = {
	A:'在读',
	B:'旁听',
	C:'休学',
	D:'退学',
	E:'已毕业',
	F:'已结业'
}
export const courseStatus = function (type) {
	return courseState[type]
}
export const courseFilter = function(type){
	return get_courseState[type]
}
export const classStatus = function (type) {
	return classState[type]
}
export const sex = function(type){
	return get_sex[type]
}
export const managementState = function(type){
	return get_managementState[type]
}
export const classFilter = function(type){	
	return classState1[type]
}
export const normalTime = (time) => {
	// if(time){
	let d = new Date(time);
	return time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
	// }
}