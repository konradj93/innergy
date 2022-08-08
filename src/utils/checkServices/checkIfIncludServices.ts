import { ServiceType } from "../../models/ServiceModel"

export const checkIfIncludesService = (services: ServiceType[] ) => (service: ServiceType) => services.includes(service)
export const checkIfIncludesAllFromServices = (services: ServiceType[] ) => (includedServices: ServiceType[]) => !includedServices.map(service => services.includes(service)).includes(false)

export const checkIfIsOneFromService = (services: ServiceType[]) => (includedServices: ServiceType[]) => includedServices.some(el=> checkIfIncludesService(services)(el))