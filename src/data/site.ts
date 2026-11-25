// Datos personales y de contacto: editá acá y se actualiza todo el sitio.
export const site = {
  name: 'Franco Marinozzi',
  shortName: 'Franco',
  role: 'Páginas web para comercios y emprendimientos',
  location: 'Hurlingham, Buenos Aires',
  email: 'francomarinozzi4@gmail.com',
  whatsapp: '5491156350137', // sin +, espacios ni guiones
  whatsappDisplay: '+54 9 11 5635-0137',
  whatsappMessage: '¡Hola Franco! Vi tu página y me interesa tener un sitio web para mi negocio.',
  // Precio: dejalo en null para mostrar "Consultá", o poné un texto tipo 'Desde $XX.XXX'
  price: null as string | null,
};

export const whatsappUrl = (message = site.whatsappMessage) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
