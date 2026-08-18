export default {
  name: 'contactLead',
  title: 'Contact Leads',
  type: 'document',
  fields: [
    { name: 'name', title: 'Full Name', type: 'string' },
    { name: 'email', title: 'Email Address', type: 'string' },
    { name: 'phone', title: 'Phone Number', type: 'string' },
    { name: 'service', title: 'Service Requested', type: 'string' },
    { name: 'details', title: 'Project Details', type: 'text' },
    { name: 'submittedAt', title: 'Submitted At', type: 'datetime' }
  ],
};