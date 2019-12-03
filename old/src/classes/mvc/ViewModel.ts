import { OnInit, AfterViewInit, ElementRef } from "@angular/core"
import { HttpService } from "src/app/services/shared/http/Http.service"
import { AppInjector } from "../angular/AppInjector/AppInjector"
import { Json } from "../json/Json"
import { ActivatedRoute } from "@angular/router"

export class ViewModel implements OnInit, AfterViewInit{

	dom:any
	http:HttpService
	routeLoadedData:Json

	constructor(protected elementRef:ElementRef, protected route:ActivatedRoute){

		this.http = AppInjector.get(HttpService)

		route.data.subscribe((e) => {
			this.routeLoadedData = Json.fromRaw(e)
		})

	}

	ngOnInit(){

		if(this.routeLoadedData === undefined){
			return
		}

		this.onRouteData(this.routeLoadedData)

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
