import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Injectable } from '@angular/core'
import { of, Observable } from 'rxjs'
import { HttpService } from '../services/Http/Http'
import { AppInjector } from '../AppInjector'

@Injectable()
export class RoutePrefetchDataResolver implements Resolve<any> {

	http:HttpService

	constructor(){
		this.http = AppInjector.get(HttpService)
	}

	resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<any>{
		return (route.component as any as IRoutePrefetchData).prefetchComponent(route)
	}

}

export interface IRoutePrefetchData{
	prefetchComponent(route:ActivatedRouteSnapshot):Observable<any>
}
