import { PriceList, PriceObject } from "../models/PriceListModel"

export const PRICE_LIST: PriceList =  {
    Photography: [
        {year: 2020, price: 1700},
        {year: 2021, price: 1800},
        {year:2022, price:1900}
    ],
    VideoRecording: [
        {year: 2020, price: 1700},
        {year: 2021, price: 1800},
        {year:2022, price:1900}
    ],
    BlurayPackage: 300,
    TwoDayEvent: 400,
    WeddingSession: 600,
}

export const PACKAGE_DISCOUT: PriceObject[] = [
    {year: 2020, price: 1200},
    {year: 2021, price: 1300},
    {year:2022, price: 1300}
]


export const WEDDING_VIDEO_PHOTO_DISCOUNT = 300;