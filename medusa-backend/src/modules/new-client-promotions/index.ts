import NewClientPromotionsService from "./service"
import { Module } from "@medusajs/framework/utils"

export const NEW_CLIENT_PROMOTIONS_MODULE = "newClientPromotionsService"

export default Module(NEW_CLIENT_PROMOTIONS_MODULE, {
  service: NewClientPromotionsService,
})










