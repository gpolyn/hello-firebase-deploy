import { Injectable } from '@angular/core';

@Injectable()
export class WindowRefService {

	private _window: any;

	constructor() {
		this._window = window;
	}

	get nativeWindow() : any {
		return this._window;
	}

}
