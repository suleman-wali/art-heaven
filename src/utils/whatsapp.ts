// Art Heaven - WhatsApp Utility
// Neelofar Usman's Direct WhatsApp Number
export const ART_HEAVEN_WHATSAPP = '923013100089'; 

export function getWhatsAppArtworkUrl(title: string, price: string, medium: string, imageSrc: string) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const fullImageUrl = `${origin}${imageSrc}`;
  const message = `Hello Neelofar! I want to buy this painting from Art Heaven:\n\n🎨 *${title}*\n💰 Price: ${price}\n🖌️ Medium: ${medium}\n🖼️ Link: ${fullImageUrl}\n\nPlease let me know if it is available!`;
  
  return `https://wa.me/${ART_HEAVEN_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppCustomOrderUrl(craftType: string = 'Custom Artwork') {
  const message = `Hello Neelofar! I would like to place a custom order with Art Heaven.\n\n✨ Interest: *${craftType}*\n\nPlease let me know how we can discuss details, dimensions, and color palettes!`;
  return `https://wa.me/${ART_HEAVEN_WHATSAPP}?text=${encodeURIComponent(message)}`;
}
