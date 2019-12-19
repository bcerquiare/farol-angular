import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { filter, map, tap } from 'rxjs/operators'
import { Json } from '../../classes/Json/Json'

@Injectable({
	providedIn: 'root',
})
export class HttpService {

  	private httpOptions:{[key:string]:any}
	base:string

	constructor(private http:HttpClient) {
		this.base = 'http://localhost/Knn/Novo/backend/public/index.php/api/1/'
		this.httpOptions = {
			/*headers': new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'x-auth, content-type, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
			})*/
  		}
	}

	public setBaseUrl(url:string):string{
		return this.base = url
	}

	public makeUrl(url:string):string{

		if( url.startsWith('http') ){
			return url
		}else{
			return this.baseUrl() + url
		}

	}

	public baseUrl():string{
		return this.base
	}

	public get<T = any>(url:string):Observable<T>{
		return this.http.get<T>( this.makeUrl(url) )
	}

	public post<T = any>(url:string, data:any):Observable<T>{
		return this.http.post<T>( this.makeUrl(url), data, this.httpOptions )
	}

	public put<T = any>(url:string, data:any):Observable<T>{
		return this.http.put<T>( this.makeUrl(url), data, this.httpOptions )
	}

	public jsonTo(type:string, url:string, data?:any):Observable<Json>{

		return new Observable<Json>((ob) => {

			switch(type){
				case 'get':

					this.http.get( this.makeUrl(url) ).subscribe((x:Json) => {
						ob.next(x)
						ob.complete()
					}, (err) => {
						ob.error(err)
						ob.complete()
					})

				break

				case 'post':

					this.http.post( this.makeUrl(url), data).subscribe((x:Json) => {
						ob.next(x)
						ob.complete()
					}, (err) => {
						ob.error(err)
						ob.complete()
					})

				break

				case 'put':

					this.http.put( this.makeUrl(url), data).subscribe((x:Json) => {
						ob.next(x)
						ob.complete()
					}, (err) => {
						ob.error(err)
						ob.complete()
					})

				break

				case 'delete':
				break

				default:
				break
			}

		})

	}

}
