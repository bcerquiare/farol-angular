import { AppInjector } from "./classes/angular/AppInjector/AppInjector"
import { HttpService } from "../services/shared/http/Http.service"

export function http(){
	return AppInjector.get<HttpService>(HttpService)
}
