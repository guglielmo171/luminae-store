# Roadmap Progetto Luminae (Features)

## Contesto
Stack: React + Vite, Zustand, Fastify backend, Supabase, Stripe, Vercel.  
Obiettivo: e-commerce leggero con pagamenti Stripe e UX ottimizzata.

---

## Feature 1 – Carrello con Zustand + Stripe-ready

- **ID**: FEAT-001
- **Branch**: `feat/cart-zustand`
- **Stato**: TODO | IN_PROGRESS | DONE
- **Obiettivo**:
  - Gestire il carrello lato client con Zustand (persist su localStorage).
  - Esporre un oggetto `cart` pronto per integrazione futura con Stripe Checkout / webhooks.
- **Todo tecnici**:
  - [ ] Creare `useCartStore` con:
    - `items`, `count`, `total`
    - `addItem`, `updateQuantity`, `removeItem`, `clear`
  - [ ] Persistenza con `zustand/middleware` (`persist`)
  - [ ] Badge carrello nella navbar
  - [ ] Drawer/modale carrello con lista item e totale
  - [ ] Funzione `prepareCheckoutPayload()` per collegamento Stripe
- **Note**:
  - Persist solo lato client, niente salvataggio nel DB per ora.
  - In futuro: sync carrello per utente loggato (Supabase).

---

## Feature 2 – Lazy loading globale

- **ID**: FEAT-002
- **Branch**: `feat/lazy-loading`
- **Stato**: TODO | IN_PROGRESS | DONE
- **Obiettivo**:
  - Ridurre il bundle iniziale con `React.lazy` + `Suspense`.
  - Caricare in modo lazy pagine pesanti (es. Checkout, Dashboard utente).
- **Todo tecnici**:
  - [ ] Trasformare le route principali in lazy:
    - `ProductsPage`, `CartPage`, `CheckoutPage`, `ProfilePage`
  - [ ] Aggiungere `<Suspense fallback={<Loader />}>` sugli entry point
  - [ ] Lazy per componenti secondari (es. grafici, tabelle grandi)
  - [ ] Verificare caricamento corretto con React DevTools / Network
- **Metriche da controllare**:
  - [ ] `First Load JS` su Vercel Analytics
  - [ ] Tempo di first paint percepito

---

## Feature 3 – Invio email reali (Resend / Postmark)

- **ID**: FEAT-003
- **Branch**: `feat/email-transactions`
- **Stato**: TODO | IN_PROGRESS | DONE
- **Obiettivo**:
  - Inviare email transazionali reali (con provider tipo Resend o Postmark) al completamento ordine.
- **Todo tecnici**:
  - [ ] Scegli provider (Resend consigliato)
  - [ ] Aggiungere SDK nel backend Fastify
  - [ ] Endpoint: `POST /api/email/order-confirmation`
  - [ ] Payload minimo: `email`, `orderId`, `total`
  - [ ] Template HTML semplice per email di conferma ordine
  - [ ] Variabili ambiente su Vercel (`RESEND_API_KEY`)
  - [ ] Test con account email personale
- **Note**:
  - In futuro collegare a webhook Stripe `payment_intent.succeeded`.
  - Non salvare dati sensibili nelle email.

---

## Log avanzamento

### 2026-01-18
- [ ] Definita roadmap features (carrello, lazy loading, email).
- [ ] Creato file `FEATURES_LOG.md` e branch di partenza:
  - `feat/cart-zustand`
  - `feat/lazy-loading`
  - `feat/email-transactions`

### 2026-01-XX
- FEAT-001:
  - [ ] Implementato store Zustand e UI carrello.
  - [ ] Collegato al flusso di checkout.
