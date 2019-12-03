export interface IJsonFarol{
	success:boolean
	error:boolean
	message:string
	meta:{[key:string]:any}
	links:{[key:string]:any}
	data:any
}

export interface IJsonFarolData{
	model:any
	structure:any
	items:Array<any>
}
