import { mutationOptions } from "@tanstack/react-query";
import {emailService}from "../services/mailService"

export const mailKeys = {
    newsletter:(email:string)=> ["mail",email] as const,

  };


  export function createNewsletterOptions(){
    return mutationOptions({
        mutationFn: emailService.newsletter
    })
  }
  export function createWorkwithusOptions(){
    return mutationOptions({
        mutationFn: emailService.workWithUs
    })
  }