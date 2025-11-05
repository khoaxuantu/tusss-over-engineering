import { SellerType } from "@/db/types/enums.auto";
import { UpdateObjBuilder } from "@/shared/repos/abstracts/updater.abstract";
import { SellerUpdateModel } from "../../seller.model";

export class SellerUpdateBuilder extends UpdateObjBuilder<SellerUpdateModel> {
  setName(name: string) {
    this.data.name = name;
    this.activate();
    return this;
  }

  setType(type: SellerType) {
    this.data.type = type;
    this.activate();
    return this;
  }

  setHref(href: string) {
    this.data.href = href;
    this.activate();
    return this;
  }

  setLocation(location: string) {
    this.data.location = location;
    this.activate();
    return this;
  }
}
