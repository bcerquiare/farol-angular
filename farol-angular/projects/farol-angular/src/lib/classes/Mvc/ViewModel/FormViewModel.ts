import { ViewModel } from '../ViewModel'
import { Model } from '../Model'

export class FormViewModel extends ViewModel{

	structure:{[key:string]:any}	= {} // Dados da estrutura
	model:{[key:string]:any} 		= {} // Dados da view
	shallow:{[key:string]:any}		= {} // Copia 'rasa' dos dados da model

}
