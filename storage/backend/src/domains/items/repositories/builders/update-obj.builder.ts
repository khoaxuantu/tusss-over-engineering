import { ItemUpdateModel } from "@/items/models/item.model";
import { UpdateObjBuilder } from "@/shared/repos/abstracts/updater.abstract";

export class ItemUpdateObjBuilder extends UpdateObjBuilder<ItemUpdateModel> {
  setName(name: string) {
    this.data.name = name;
    this.activate();
    return this;
  }

  setPrice(price: number) {
    this.data.price = price;
    this.activate();
    return this;
  }

  setDescription(description?: string) {
    this.data.description = description;
    this.activate();
    return this;
  }

  setHref(href?: string) {
    this.data.href = href;
    this.activate();
    return this;
  }

  setArchived(archived: boolean) {
    this.data.archived = archived;
    this.activate();
    return this;
  }
}
