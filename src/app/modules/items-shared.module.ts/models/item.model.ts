import { ItemImg } from "../../items/models/itemImg.model";
import { ItemPropertyType } from "../../items/models/itemProperties.model";
import { ItemUnit } from "../../items/models/itemUnit.model";


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
