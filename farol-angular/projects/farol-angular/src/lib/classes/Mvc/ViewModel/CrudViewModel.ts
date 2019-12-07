import { FormViewModel } from './FormViewModel'
import { Json } from '../../json/Json'
import { Observable } from 'rxjs'
import { ActivatedRouteSnapshot } from '@angular/router'
import { http } from '../../../helpers'

export enum FormMod{
	create = 1,
	edit,
	view
}

export class CrudViewModel extends FormViewModel{

	primaryKey:string

	onRouteData(json:Json){
		this.structure = json.data().structure()
		this.setModel( json.data().model().data )
	}

	mod():FormMod{
		return this.isCreating() ? FormMod.create : ( this.isEditing() ? FormMod.edit : FormMod.view )
	}

	setModel(data:any){
		this.model = ( Array.isArray(data) && data.length === 0 ? {} : data )
		console.log('setModel')
		console.log(data)
		console.log(this.model)
		console.log('/setModel')
	}

	getKey(){
		return ( this.model[ this.primaryKey ] ? this.model[ this.primaryKey ] : 0 )
	}

	isCreating(){
		return this.getKey() === 0 ? true : false
	}

	isEditing(){
		return this.getKey() !== 0 ? true : false
	}

	save(){

		if( this.isCreating() ){
			this.store()
		}else if( this.isEditing() ){
			this.update()
		}

	}

	store(){

		this.http.post( (this.constructor as any).url(), this.model).subscribe(x => {
			this.setModel( Json.fromRaw(x).data().model().data )
		})

	}

	update(){

		this.http.put( (this.constructor as any).url() + '/'+this.getKey(), this.model).subscribe(x => {
			this.setModel( Json.fromRaw(x).data().model().data )
		})

	}

	static url():string{
		return ''
	}

	static urlConfig(param?:any){

		param = ( param === undefined ? [] : param )

		return {
			'list'		: this.url() + '/',
			'create'	: this.url() + '/create',
			'store'		: this.url() + '/',
			'edit'		: this.url() + '/'+param[0]+'/edit',
			'update'	: this.url() + '/'+param[0]+'/edit',
			'view'		: this.url() + '/'+param[0]
		}

	}

	static prefetchComponent(route:ActivatedRouteSnapshot):Observable<Json>{

		const mod:FormMod = this.tryToResolveCrudModRoute(route)
		let url:string = ''

		switch( mod ){
			case FormMod.create	: url = this.urlConfig()['create']; break
			case FormMod.edit	: url = this.urlConfig( [route.params.id] )['edit']; 	break
			case FormMod.view	: url = this.urlConfig( [route.params.id] )['view']; 	break
		}

		return http().get( url )

	}

	protected static tryToResolveCrudModRoute(route:ActivatedRouteSnapshot):FormMod{

		const url:string 			= route.routeConfig.path
		const parts:Array<string> 	= url.split('/')
		const last:string 			= parts[ parts.length - 1 ]

		if( route.data && route.data.mod ){
			return ( route.data.mod === FormMod.create ? FormMod.create : ( route.data.mod === FormMod.edit ? FormMod.edit : FormMod.view ) )
		}

		switch(last){
			case 'create': 	return FormMod.create; break
			case 'edit': 	return FormMod.edit; break
			default: 		return FormMod.view; break
		}

	}

}
