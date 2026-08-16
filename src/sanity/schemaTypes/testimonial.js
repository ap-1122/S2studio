export const testimonial = {
  name: 'testimonial',
  title: 'Client Testimonials',
  type: 'document',
  fields: [
    {
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'projectDetails',
      title: 'Project Details / Location',
      type: 'string',
      description: 'e.g., 4 BHK Villa, Satna or Commercial Office, Bhopal',
    },
    {
      name: 'review',
      title: 'Client Review',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'clientImage',
      title: 'Client Photo (Optional)',
      type: 'image',
      options: { hotspot: true },
    }
  ],
}