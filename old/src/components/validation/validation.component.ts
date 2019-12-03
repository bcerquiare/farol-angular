import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef, AfterViewChecked, ContentChildren, QueryList, Renderer, Renderer2 } from "@angular/core"
import { NgModel, NgControl, ValidationErrors } from '@angular/forms'

@Component({
	selector: "input-validation",
	templateUrl: "./validation.component.html",
	styleUrls: ["./validation.component.scss"]
})
export class ValidationComponent implements OnInit, AfterViewInit, AfterViewChecked {

	@ContentChildren(NgModel) input:QueryList<NgModel>

	constructor(private el:ElementRef, private renderer:Renderer2) {
	}

	ngOnInit() {
	}

	ngAfterViewInit(){
	}

	ngAfterViewChecked(){

		if( this.isValid ){
			this.renderer.removeClass(this.el.nativeElement, "is-invalid")
		}else{
			this.renderer.removeClass(this.el.nativeElement, "is-invalid")
		}

	}

	get isValid():boolean{
		return this.input.first.valid
	}

	get isInvalid():boolean{
		return !this.isValid
	}

	get isTouched():boolean{
		return this.input.first.touched
	}

	get isDirty():boolean{
		return this.input.first.dirty
	}

	get shouldDisplayErrorMessage():boolean{
		return this.isInvalid && ( this.isTouched || this.isDirty )
	}

	get errors():ValidationErrors{
		return this.input.first.errors
	}

	get errorMessages():string{
		return ""
	}

}
