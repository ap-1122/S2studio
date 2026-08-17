// schemaTypes/index.js file ke andar
import { project } from './project'
import { testimonial } from './testimonial' // Add this line
import estimateLead from './estimateLead'     // 1. Ye import line add karo


 export const schema = {
  types: [project, testimonial], // Add testimonial here
  types: [project, testimonial, estimateLead], // 2. Yahan array me estimateLead daal do
}


// export const schema = {
//   types: [],
// }


