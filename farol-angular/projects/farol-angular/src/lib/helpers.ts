import { HttpService } from './services/Http/Http'
import { AppInjector } from './AppInjector'

export function http(){
	return AppInjector.get<HttpService>(HttpService)
}
