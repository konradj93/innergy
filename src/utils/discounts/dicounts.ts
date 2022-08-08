import { PACKAGE_DISCOUT, WEDDING_VIDEO_PHOTO_DISCOUNT } from "../../constans/priceList";
import { PHOTOGRAPHY_VIDEO, PHOTOGRAPHY_WEDDING } from "../../constans/servicesPairs";
import { ServiceType } from "../../models/ServiceModel";
import { checkIfIncludesAllFromServices, checkIfIncludesService, checkIfIsOneFromService } from "../checkServices/checkIfIncludServices";

export type CalculateDiscount = (year: number, services: ServiceType[]) => number

export const calculateDiscountByCondition = (codition: boolean) => (dicount: number) :number => codition ? dicount : 0;

export const getPackagePrice =(packageServices: ServiceType[]) => (year: number, services: ServiceType[]): number =>  
    calculateDiscountByCondition(checkIfIncludesAllFromServices(services)(packageServices))(PACKAGE_DISCOUT.find(el => el.year === year).price)
 
export const getWeddingPrice = (year: number, services: ServiceType[]): number => 
    year !== 2022 ? 0 : calculateDiscountByCondition(checkIfIncludesAllFromServices(services)(PHOTOGRAPHY_WEDDING))(WEDDING_VIDEO_PHOTO_DISCOUNT)

export const getWeddingPriceIfPhotoOrVideo = (year: number, services: ServiceType[]): number => {
    const itHasWedding = checkIfIncludesService(services)('WeddingSession');
    const isItHasPhoOrVideo = checkIfIsOneFromService(services)(PHOTOGRAPHY_VIDEO)
    return calculateDiscountByCondition(itHasWedding && isItHasPhoOrVideo) ( WEDDING_VIDEO_PHOTO_DISCOUNT + getWeddingPrice(year, services));
}

export const calculateDiscount = (discountsMethods: CalculateDiscount[]) => (year: number, services: ServiceType[]): number => 
    discountsMethods.map(el => el(year, services)).reduce((acc, el) => acc + el, 0);
 

export const calculateFinalPrice = calculateDiscount([getPackagePrice(PHOTOGRAPHY_VIDEO), getWeddingPriceIfPhotoOrVideo])