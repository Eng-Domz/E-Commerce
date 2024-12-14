import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react"
import { useNavigate } from "react-router"
import * as YUP from "yup"
export default function Checkout() {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const url = "https://ecommerce.routemisr.com/api/v1/orders/checkout-session/66c91634ed0dc0016c217bb3";
  const redirectUrl = "http://localhost:5173/";


  const body = {
    shippingAddress: {
      details: "details",
      phone: "01010700999",
      city: "Cairo",
    },
  };

    

    async function handleSubmit(value){
        try {
            console.log(value);
            
            setIsLoading(true);
            const response = await axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/66c91634ed0dc0016c217bb3?url=http://localhost:5173" , {shippingAddress : {details : value.details , phone : value.phone , city : value.city}} , {headers : {token : localStorage.getItem("token")}});

            // setIsLoading(false);
            // setError(null);
            console.log(response);
            
        } catch (error) {
            setError(error.response.data.message);
            console.log(error);
        }finally{
            setIsLoading(false);
        }

    }


    const validationSchema = YUP.object().shape({
        details : YUP.string("No numbers allowed").required("Please enter your details").min(3,"Minuim 3 charecters").max(40,"Maximum 40 charecters")
        ,phone : YUP.string().required("Phone number is required").matches(/^01[0125][0-9]{8}/ , "Please enter a valid egyptian Phone number").max(11,"Please enter a valid egyptian Phone number")
        ,city : YUP.string("No Numbers allowed").required("Please enter you city").min(3,"please enter a valid city")
    })

    const x = useFormik({
        initialValues:{
            details:"",
            phone:"",
            city:""
        },
        onSubmit : handleSubmit,
        validationSchema : validationSchema
    })


    return (

    <div>
        <form onSubmit={x.handleSubmit} className="w-1/2 flex flex-col justify-center mx-auto">
        {
    error? <div id="alert-border-2" className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
    </svg>
    <div className="ms-3 text-sm font-medium">
      {error}
    </div>
    
  </div>: null
}   

        <div className=" ">
          <label htmlFor="error" className="block mb-2 text-sm font-medium">Details</label>
          <input onBlur={x.handleBlur} onChange={x.handleChange} value={x.values.details} name="details" type="text"  className="bg-gray-100 border  text-sm rounded-lg dark:bg-gray-700  block w-full p-2.5 "  />
            {
            x.errors.details && x.touched.details ? 
            
            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{x.errors.details}</span></p>
             :  
            null
            }

          <label htmlFor="Phone" className="mt-3 block mb-2 text-sm font-medium">Phone number</label>
          <input onBlur={x.handleBlur} onChange={x.handleChange} value={x.values.phone} name="phone" type="text" className="bg-gray-100 border  text-sm rounded-lg dark:bg-gray-700  block w-full p-2.5 "  />
            {
            x.errors.phone && x.touched.phone ? 
            
            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{x.errors.phone}</span></p>
             :  
            null
            }


          <label htmlFor="city" className="mt-3 block mb-2 text-sm font-medium">City</label>
          <input onBlur={x.handleBlur} onChange={x.handleChange} value={x.values.city} name="city" type="text" className="bg-gray-100 border  text-sm rounded-lg dark:bg-gray-700  block w-full p-2.5 "  />
            {
            x.errors.city && x.touched.city ? 
            
            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{x.errors.city}</span></p>
             :  
            null
            }
        </div>

        <button className="mt-10 bg-specialBlue w-1/5 mx-auto border rounded-md p-1 text-white" type="submit">Submit</button>
          
        </form>
    </div>
  )
}






// <div>
//   <div className="mb-6">
//     <label htmlFor="success" className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Your name</label>
//     <input type="text" id="success" className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" placeholder="Success input" />
//     <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p>
//   </div>
//   <div>
//     <label htmlFor="error" className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">Your name</label>
//     <input type="text" id="error" className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" placeholder="Error input" />
//     <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snapp!</span> Some error message.</p>
//   </div>
// </div>
