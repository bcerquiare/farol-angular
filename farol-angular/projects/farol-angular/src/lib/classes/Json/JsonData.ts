import { IJsonFarolData } from "../../interfaces/json/IJson"
import { JsonObject } from "./JsonObject"

export class JsonDataObject{

	private _items:Array<any>
	private _structure:{[key:string]:any}
	private _model:JsonObject

	constructor(jsonData:IJsonFarolData){
		this._items = jsonData.items
		this._structure = jsonData.structure
		this._model = new JsonObject(jsonData.model)
	}

	model():JsonObject{
		return this._model
	}

	structure():{[key:string]:any}{
		return this._structure
	}

	items():Array<any>{
		return this._items
	}

}
