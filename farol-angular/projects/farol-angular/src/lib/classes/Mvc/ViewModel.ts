import { OnInit, AfterViewInit, ElementRef } from '@angular/core'
import { Json } from '../json/Json'
import { ActivatedRoute } from '@angular/router'
import { HttpService } from '../../services/Http/Http'
import { AppInjector } from '../../AppInjector'

export class ViewModel implements OnInit, AfterViewInit{

	dom:any
	http:HttpService
	routeLoadedData:Json

	constructor(protected elementRef:ElementRef, protected route:ActivatedRoute){

		this.http = AppInjector.get(HttpService)

		route.data.subscribe((e:Json) => {
			this.routeLoadedData = e
		})

	}

	ngOnInit(){

		this.onBeforeInit()

		if(this.routeLoadedData !== undefined){
			this.onRouteData(this.routeLoadedData)
		}

		this.onInit()

	}

	onBeforeInit(){

	}

	onInit(){

	}

	ngAfterViewInit(){
		this.dom = this.elementRef.nativeElement
		this.initialize()
		this.setup()
		this.afterViewInit()
	}

	onRouteData(data:Json){
	}

	afterViewInit(){
	}

	initialize(){
	}

	setup(){
	}

}
