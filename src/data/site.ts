export const site = { name: 'CL Potret', instagram: '@clpotret_', instagramUrl: 'https://instagram.com/clpotret_', whatsapp: '628xxxxxxxxxx', location: 'Malang, Jawa Timur' };
export const whatsappUrl = (message = 'Halo CL Potret 📸 Saya ingin bertanya tentang sesi foto.') => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
