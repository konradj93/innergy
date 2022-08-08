import { checkIfIncludesService, checkIfIsOneFromService } from "./utils/checkServices/checkIfIncludServices";
import { PHOTOGRAPHY_VIDEO, TWODAYS_WEDDING } from "./constans/servicesPairs";
import { ActionType } from "./models/ActionModel";
import { ServiceType, ServiceYear } from "./models/ServiceModel";
import { PriceModel } from "./models/CheckoutModel";
import { PRICE_LIST } from "./constans/priceList";
import { calculateBasePrice } from "./utils/discounts/basePrice";
import { calculateFinalPrice } from "./utils/discounts/dicounts";


export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: ActionType; service: ServiceType }
): ServiceType[] =>  {
    const checkIfPreviousIncludeService = checkIfIncludesService(previouslySelectedServices)
    const checkIfIncludeOneFromPreviousService= checkIfIsOneFromService(previouslySelectedServices)

    const isItHasPhoOrVideo = checkIfIncludeOneFromPreviousService(PHOTOGRAPHY_VIDEO)
    const isIsTwoDayWedding = checkIfIncludeOneFromPreviousService(TWODAYS_WEDDING)

    const {type} = action; 

    switch (type) {
        case(ActionType.Select):{
            if(action.service ==="BlurayPackage") {
                return !checkIfPreviousIncludeService('VideoRecording') ? previouslySelectedServices : [...previouslySelectedServices, action.service]
            }
            return checkIfPreviousIncludeService(action.service) ? previouslySelectedServices : [...previouslySelectedServices, action.service]
        }
        case(ActionType.Deselect):{
            if(isItHasPhoOrVideo && isIsTwoDayWedding){
                const temporaryArray = previouslySelectedServices.filter(el => el !== action.service)
                if(checkIfIsOneFromService(temporaryArray)(PHOTOGRAPHY_VIDEO)) return temporaryArray
                return temporaryArray.filter(el => el !== 'TwoDayEvent')
            }
            return previouslySelectedServices.filter(el => el !== action.service)
        }
        default:{
            return previouslySelectedServices
        }
    }
}


export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear): PriceModel => {
    const calculateYearPrice = calculateBasePrice(selectedYear);
    const basePrice = selectedServices.reduce((acc, service) =>  acc += calculateYearPrice(PRICE_LIST[service]), 0);
    return {
        basePrice,
        finalPrice: basePrice - calculateFinalPrice(selectedYear, selectedServices)
    }
};