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

	onRouteData(routeData:any){
		this.structure = routeData.data.data.structure
		this.setModel( routeData.data.data.model )
	}

	mod():FormMod{
		return this.isCreating() ? FormMod.create : ( this.isEditing() ? FormMod.edit : FormMod.view )
	}

	beforeSetModel(data:any){

	}

	setModel(data:any){

		const d:any = ( Array.isArray(data) && data.length === 0 ? {} : data )

		this.beforeSetModel(d)
		this.model = (d)

		this.shallow = Object.assign({}, this.model)
		this.onModelData()

	}

	onModelData(){

	}

	getKey(){
		return ( this.model[ this.primaryKey ] ? this.model[ this.primaryKey ] : 0 )
	}

	get id(){
		return ( this.model[ this.primaryKey ] ? this.model[ this.primaryKey ] : 0 )
	}

	isCreating(){
		return this.getKey() === 0 ? true : false
	}

	isEditing(){
		return this.getKey() !== 0 ? true : false
	}

	beforeSave(){
	}

	save(){

		this.beforeSave()

		if( this.isCreating() ){

			const data:any = this.beforeStore(this.model)
			this.store(data)

		}else if( this.isEditing() ){

			const data:any = this.beforeUpdate(this.model)
			this.update(data)

		}

		this.afterSave()

	}

	afterSave(){

	}

	beforeStore(model:any):any{
		return model
	}

	store(model:any){

		this.http.post( (this.constructor as any).url(), model).subscribe((x:Json) => {

			this.setModel( x.data.model )
			this.onStored()

			if( this.isCreating() ){
				console.error('O id não foi retornado para o model')
			}

		})

	}

	onStored(){
	}

	beforeUpdate(model:any):any{
		return model
	}

	update(model:any){

		this.http.put( (this.constructor as any).url() + '/'+this.getKey(), model).subscribe(x => {
			this.setModel( x.data.model )
			this.onUpdated()
		})

	}

	onUpdated(){

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
			//'edit'		: this.url() + '/'+param[0]+'/edit',
			'edit'		: this.url() + '/'+param[0],
			'update'	: this.url() + '/'+param[0],
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

		return http().jsonTo('get', url )

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
