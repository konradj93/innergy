import { PriceObject } from "../../models/PriceListModel";
import { ServiceYear } from "../../models/ServiceModel";

export const calculateBasePrice =(year: ServiceYear) => (price: number | PriceObject[]) => Array.isArray(price) ? price.find(el=> el.year === year).price : price;
