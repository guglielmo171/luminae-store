import { apiClientRest } from "../axiosClient";
import { handleApiCall } from "../utils/apiUtils";

export const emailService={
    newsletter: (email:string)=>handleApiCall(
      apiClientRest.post(`/email/newsletter`,{email}),
      `send mail for newsletter (email: ${email})`
    ),
    workWithUs:(data:{
        name: string
        email: string
        message: string
      })=> handleApiCall(
        apiClientRest.post(`/email/work-with-us`,data),
      `send mail for work with us (email: ${data.email})`
      )
}