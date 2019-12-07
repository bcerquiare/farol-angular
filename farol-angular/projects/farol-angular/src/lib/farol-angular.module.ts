import { NgModule } from '@angular/core'
import { ChecklistDirective } from './directives/Form/Checklist'
import { ValidationComponent } from './components/validation/validation.component'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TestDirective } from './test.directive'

@NgModule({
	declarations: [

		// components
		ValidationComponent,

		// directives
		ChecklistDirective,

		TestDirective

	],
	imports: [
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		CommonModule
	],
	exports: [
		ValidationComponent,
		ChecklistDirective
	]
})
export class FarolAngularModule { }
