import { Updateable } from "kysely";

export abstract class UpdateObjBuilder<O extends Updateable<any> = Updateable<any>> {
  private _active: boolean;
  protected data: O;

  constructor() {
    this.data = {} as O;
    this._active = false;
  }

  get isActive() {
    return this._active;
  }

  build() {
    return this.data;
  }

  protected activate() {
    this._active = true;
  }
}
