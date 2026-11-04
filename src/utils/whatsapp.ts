// Art Heaven - WhatsApp Utility
export const ART_HEAVEN_DOMAIN = 'https://artheaven.store';
export const ART_HEAVEN_WHATSAPP = '923013100089';

export function getWhatsAppArtworkUrl(
  title: string,
  price: string,
  medium: string,
  imageSrc: string
) {
  const fullImageUrl = imageSrc.startsWith('http://') || imageSrc.startsWith('https://')
    ? imageSrc
    : `${ART_HEAVEN_DOMAIN}${imageSrc.startsWith('/') ? '' : '/'}${imageSrc}`;

  const message = `Hello Neelofar! I want to buy this artwork from Art Heaven:\n\n🎨 *${title}*\n💰 Price: ${price}\n🖌️ Medium: ${medium}\n🖼️ Artwork Link: ${fullImageUrl}\n🌐 Store: ${ART_HEAVEN_DOMAIN}\n\nPlease let me know if it is available!`;

  return `https://wa.me/${ART_HEAVEN_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppCustomOrderUrl(craftType: string = 'Custom Artwork') {
  const message = `Hello Neelofar! I would like to place a custom order with Art Heaven.\n\n✨ Interest: *${craftType}*\n🌐 Store: ${ART_HEAVEN_DOMAIN}\n\nPlease let me know how we can discuss details, dimensions, and color palettes!`;
  return `https://wa.me/${ART_HEAVEN_WHATSAPP}?text=${encodeURIComponent(message)}`;
}
