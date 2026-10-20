// ==========================================
// STORE DO CARRINHO
// Produtos gerais da plataforma
// ==========================================

import { create } from "zustand";
import type { Produto } from "@/types/produto";

export type CartItem = {
  id: string;
  produtoId: string;
  titulo: string;
  descricao: string;
  imagem?: string;
  tipo: Produto["tipo"];
  valorUnitario: number;
  quantidade: number;
};

interface CartStore {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;

  addProduto: (produto: Produto, quantidade?: number) => void;
  removeProduto: (produtoId: string) => void;
  updateQuantity: (produtoId: string, quantidade: number) => void;
  clearCart: () => void;
  isInCart: (produtoId: string) => boolean;
  getItemQuantity: (produtoId: string) => number;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const calculateTotals = (items: CartItem[]) => {
  const totalAmount = items.reduce(
    (sum, item) => sum + item.valorUnitario * item.quantidade,
    0
  );

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantidade,
    0
  );

  return {
    totalAmount,
    totalItems,
  };
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  totalAmount: 0,
  totalItems: 0,

  addProduto: (produto: Produto, quantidade = 1) => {
    const { items } = get();

    const quantidadeFinal = Math.max(1, quantidade);

    const existingItem = items.find(
      (item) => item.produtoId === produto.id
    );

    let updatedItems: CartItem[];

    if (existingItem) {
      updatedItems = items.map((item) =>
        item.produtoId === produto.id
          ? {
              ...item,
              quantidade: item.quantidade + quantidadeFinal,
            }
          : item
      );
    } else {
      const newItem: CartItem = {
        id: generateId(),
        produtoId: produto.id,
        titulo: produto.titulo,
        descricao: produto.descricao,
        imagem: produto.imagem,
        tipo: produto.tipo,
        valorUnitario: produto.valor,
        quantidade: quantidadeFinal,
      };

      updatedItems = [...items, newItem];
    }

    const totals = calculateTotals(updatedItems);

    set({
      items: updatedItems,
      totalAmount: totals.totalAmount,
      totalItems: totals.totalItems,
    });
  },

  removeProduto: (produtoId: string) => {
    const { items } = get();

    const updatedItems = items.filter(
      (item) => item.produtoId !== produtoId
    );

    const totals = calculateTotals(updatedItems);

    set({
      items: updatedItems,
      totalAmount: totals.totalAmount,
      totalItems: totals.totalItems,
    });
  },

  updateQuantity: (produtoId: string, quantidade: number) => {
    const { items } = get();

    if (quantidade <= 0) {
      get().removeProduto(produtoId);
      return;
    }

    const updatedItems = items.map((item) =>
      item.produtoId === produtoId
        ? {
            ...item,
            quantidade,
          }
        : item
    );

    const totals = calculateTotals(updatedItems);

    set({
      items: updatedItems,
      totalAmount: totals.totalAmount,
      totalItems: totals.totalItems,
    });
  },

  clearCart: () => {
    set({
      items: [],
      totalAmount: 0,
      totalItems: 0,
    });
  },

  isInCart: (produtoId: string) => {
    return get().items.some((item) => item.produtoId === produtoId);
  },

  getItemQuantity: (produtoId: string) => {
    const item = get().items.find(
      (cartItem) => cartItem.produtoId === produtoId
    );

    return item?.quantidade ?? 0;
  },
}));
