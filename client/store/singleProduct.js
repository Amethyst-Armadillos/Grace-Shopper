// import axios from 'axios';

// const SHOW_PRODUCT = "SHOW_PRODUCT";

// export const setProduct = (product) => ({
//   type: SHOW_PRODUCT,
//   product
// })

// export const getProduct = (id) => {
//   return async (dispatch)=> {
//     try {
//       console.log('yeuuup')
//       const {data} = await axios.get(`/api/products/${id}`)
//       console.log(data,'this is the datata')
//       dispatch(setProduct(data))
//     } catch (error) {
//       throw new(error)
//     }
//   }
// }

// export default function singleProduct (state = {}, action) {
//   switch (action.type) {
//     case SHOW_PRODUCT:
//       return action.product;

//       default:
//       return state;
//   }
// }
