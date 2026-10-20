// ==========================================
// TYPES GERAIS - HOTCORE
// ==========================================

export type CollectibleTicket = {
  id: string;
  title: string;
  eventName: string;
  edition: string;
  imageUrl: string;
  price: number;
};

export type CartItem = {
  id: string;
  ticketId: string;
  title: string;
  eventName: string;
  edition: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
};
