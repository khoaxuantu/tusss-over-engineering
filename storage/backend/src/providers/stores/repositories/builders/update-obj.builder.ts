import { StoreUpdateModel } from "@/sellers/models/seller.model";
import { StoreType } from "@/shared/db/types/enums.auto";
import { UpdateObjBuilder } from "@/shared/repos/abstracts/updater.abstract";

export class StoreUpdateBuilder extends UpdateObjBuilder<StoreUpdateModel> {
  setName(name: string) {
    this.data.name = name;
    this.activate();
    return this;
  }

  setType(type: StoreType) {
    this.data.type = type;
    this.activate();
    return this;
  }

  setHref(href: string) {
    this.data.href = href;
    this.activate();
    return this;
  }
}
