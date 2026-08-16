export const project = {
  name: 'project',
  title: 'Projects Portfolio',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title', // Automatically generates the URL from the title
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Architecture', value: 'Architecture' },
          { title: 'Interior Design', value: 'Interior Design' },
          { title: 'Commercial', value: 'Commercial' },
          { title: 'Construction', value: 'Construction' },
        ],
        layout: 'dropdown'
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Project Description',
      type: 'text', // For long paragraphs
    },
    {
      name: 'mainImage',
      title: 'Main Project Image (Cover)',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'gallery',
      title: 'Project Gallery (Multiple Images)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'projectPdf',
      title: 'Project Plan / Brochure (PDF)',
      type: 'file',
      options: { accept: '.pdf' }
    },

    // --- NEW: VIDEO WALKTHROUGH ---
    {
      name: 'youtubeUrl',
      title: '3D Walkthrough (YouTube Link)',
      type: 'url',
      description: 'Apne YouTube video ka link yahan paste karein (e.g., https://www.youtube.com/watch?v=...)',
    }
  ],
}






// export const project = {
//   name: 'project',
//   title: 'Projects Portfolio',
//   type: 'document',
//   fields: [
//     {
//       name: 'title',
//       title: 'Project Title',
//       type: 'string',
//       validation: (Rule) => Rule.required(),
//     },
//     {
//       name: 'category',
//       title: 'Category',
//       type: 'string',
//       options: {
//         list: [
//           { title: 'Architecture', value: 'Architecture' },
//           { title: 'Interior Design', value: 'Interior Design' },
//           { title: 'Commercial', value: 'Commercial' },
//           { title: 'Construction', value: 'Construction' },
//         ],
//         layout: 'dropdown'
//       },
//       validation: (Rule) => Rule.required(),
//     },
//     {
//       name: 'mainImage',
//       title: 'Main Project Image (Cover)',
//       type: 'image',
//       options: { hotspot: true },
//       validation: (Rule) => Rule.required(),
//     },
//     // NEW: Multiple Images ka array
//     {
//       name: 'gallery',
//       title: 'Project Gallery (Multiple Images)',
//       type: 'array',
//       of: [{ type: 'image', options: { hotspot: true } }],
//     },
//     // NEW: PDF / Brochure File
//     {
//       name: 'projectPdf',
//       title: 'Project Plan / Brochure (PDF)',
//       type: 'file',
//       options: {
//         accept: '.pdf'
//       }
//     }
//   ],
// }









// // project.js file ke andar
// export const project = {
//   name: 'project',
//   title: 'Projects Portfolio',
//   type: 'document',
//   fields: [
//     {
//       name: 'title',
//       title: 'Project Title',
//       type: 'string',
//       validation: (Rule) => Rule.required(),
//     },
//     {
//       name: 'category',
//       title: 'Category',
//       type: 'string',
//       options: {
//         list: [
//           { title: 'Architecture', value: 'Architecture' },
//           { title: 'Interior Design', value: 'Interior Design' },
//           { title: 'Commercial', value: 'Commercial' },
//           { title: 'Construction', value: 'Construction' },
//         ],
//         layout: 'dropdown'
//       },
//       validation: (Rule) => Rule.required(),
//     },
//     {
//       name: 'mainImage',
//       title: 'Project Image',
//       type: 'image',
//       options: {
//         hotspot: true, // Isse admin image ko website ke hisab se set/crop kar payega
//       },
//       validation: (Rule) => Rule.required(),
//     }
//   ],
// }