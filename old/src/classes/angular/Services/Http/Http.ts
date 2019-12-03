import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Json } from "../../../json/Json"
import { Observable } from "rxjs"
import { filter, map, tap } from "rxjs/operators"

@Injectable({
	providedIn: "root",
})
export class HttpService {

  	private httpOptions:{[key:string]:any}
	base:string

	constructor(private http:HttpClient) {
		this.base = "http://localhost/Knn/Novo/backend/public/index.php/api/1/"
		this.httpOptions = {
			"headers": new HttpHeaders({
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "x-auth, content-type, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
			})
  		}
	}

	public baseUrl(){
		return this.base
	}

	public json(url:string):Observable<Json>{

		return new Observable<JSON>((ob) => {

			this.http.get( this.baseUrl() + url).subscribe((x) => {
				ob.next(new Json(x))
				ob.complete()
			})

		})

	}

	public get(url:string):Observable<any>{

		return this.http.get( this.baseUrl() + url).pipe(
			map(x => (x as any).data)
		)

	}

	public post(url:string, data:any):Observable<any>{
		console.log("Post")
		console.log(data)
		console.log("/Post")
		return this.http.post( this.baseUrl() + url, data, this.httpOptions )
	}

	public put(url:string, data:any):Observable<any>{
		return this.http.put( this.baseUrl() + url, data, this.httpOptions )
	}

	public jsonTo(url:string, className:any){
	}

}
