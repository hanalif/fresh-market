import { ItemImg } from "./itemImg.model";
import { ItemPropertyType } from "./itemProperties.model";
import { ItemUnit } from "./itemUnit.model";
import { ItemUnitType } from "./itemUnitType.model";

export interface Item{
    _id: string,
    name: string,
    description: string,
    units: ItemUnit[],
    images: ItemImg[],
    tip: string,
    properties: ItemPropertyType[],
    mainCategoryId: string,
    subCategoryId: string
}
