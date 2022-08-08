import { ServiceType, ServiceYear } from "./ServiceModel";


export interface PriceObject {
    price: number;
    year: ServiceYear;
}

export type ServiceYearPrice = Extract<ServiceType, 'Photography' | 'VideoRecording'>
export type ConsantServicePrice = Exclude<ServiceType, 'Photography' | 'VideoRecording'>

export type PriceList = {
    [key in ServiceType]: PriceObject[] | number
}



