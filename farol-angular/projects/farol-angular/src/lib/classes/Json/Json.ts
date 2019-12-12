import { IJsonFarol } from '../../interfaces/json/IJson'
import { JsonDataObject } from './JsonData'

export interface JsonData{
	items:Array<any>
	structure:{[key:string]:any}
	model:{[key:string]:any}
}

export interface Json{
	success:boolean
	error:boolean
	message:string
	meta:{[key:string]:any}
	links:{[key:string]:any}
	data:JsonData
}

export class JsonObject{

	private _json:any
	private _success:boolean
	private _error:boolean
	private _message:string
	private _meta:{[key:string]:any}
	private _links:{[key:string]:any}
	private _data:JsonDataObject

	constructor(json){
		this.proccess(json)
	}

	proccess(json:IJsonFarol){
		this._success = json.success
		this._error = json.error
		this._message = json.message
		this._meta = json.meta
		this._links = json.links
		this._data = new JsonDataObject( json.data )
		this._json = json
	}

	data(){
		return this._data
	}

	success(){
		return this._success
	}

	error(){
		return this._error
	}

	message(){
		return this._message
	}

	raw(){
		return this._json
	}

	toString(){
		return 'class Json{}'
	}

	static fromRaw(json:any):JsonObject{
		return new JsonObject(json)
	}

}
