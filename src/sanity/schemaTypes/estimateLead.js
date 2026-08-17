export default {
  name: 'estimateLead',
  title: 'Estimator Leads',
  type: 'document',
  fields: [
    { name: 'name', title: 'Client Name', type: 'string' },
    { name: 'contact', title: 'Phone or Email', type: 'string' },
    { name: 'projectType', title: 'Project Type', type: 'string' },
    { name: 'serviceScope', title: 'Service Scope', type: 'string' },
    { name: 'quality', title: 'Quality', type: 'string' },
    { name: 'area', title: 'Area (Sq. Ft.)', type: 'number' },
    { name: 'totalCost', title: 'Estimated Cost (INR)', type: 'number' },
  ],
};