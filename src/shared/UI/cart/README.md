# Cart UI Implementation

## Componenti creati

### 1. CartButton.tsx
Bottone icona carrello con badge per il numero di articoli. Posizionato nella Navbar.

**Features:**
- Icona ShoppingBag di lucide-react
- Badge con count articoli (mostra "9+" se più di 9)
- Apre il CartDrawer al click

### 2. CartDrawer.tsx
Drawer laterale (Sheet) che mostra il carrello completo.

**Features:**
- Side drawer da destra con shadcn Sheet
- Header con titolo e count articoli
- Lista scrollable di CartItem
- Empty state con icona e CTA
- Footer con:
  - Subtotale
  - Spedizione (gratis sopra $100)
  - Totale
  - Bottone "Procedi al checkout"

### 3. CartItem.tsx
Card per visualizzare un singolo item del carrello.

**Features:**
- Avatar con immagine prodotto e fallback
- Titolo e categoria prodotto
- Controlli quantità (-, input, +)
- Prezzo totale item
- Bottone rimuovi (icona trash)
- Calcolo automatico prezzo basato su quantità

## Mock Data

### Cart.interface.ts
Interfacce TypeScript:
- `CartItem`: singolo item con product, quantity, id
- `Cart`: items[], totalItems, subtotal
- `CartContextType`: per future implementazioni context/zustand

### cartMockData.ts
Mock data con 3 prodotti:
- Elegant Wooden Chair (qty: 2) - $129.99
- Modern Table Lamp (qty: 1) - $89.99
- Ceramic Vase Set (qty: 1) - $45.50

**Totale mock:** 4 items, $395.47

## Integrazione

CartButton è stato integrato in [Navbar.tsx](../Navbar.tsx:256) tra la NavigationMenu e il dropdown utente.

## TODO - Zustand Integration

Attualmente usa `useState` locale e mock data. Per integrare Zustand:

1. Creare store: `src/store/cartStore.ts`
2. Implementare actions:
   - `addToCart(product, quantity)`
   - `removeFromCart(itemId)`
   - `updateQuantity(itemId, quantity)`
   - `clearCart()`
   - `openCart()` / `closeCart()`
3. Sostituire mock data e useState nei componenti
4. Collegare bottoni "Add to Cart" in ProductItem e ProductPage

## Componenti shadcn utilizzati

- Sheet (drawer principale)
- Card (layout items)
- Button (CTA e controlli)
- Badge (count carrello)
- Avatar (immagini prodotti)
- Input (quantità)
- Separator (divisori)

## Styling

Tutti i componenti usano Tailwind CSS con le classi del tema configurato (radix-vega).
Responsive design con breakpoint sm: per mobile.
