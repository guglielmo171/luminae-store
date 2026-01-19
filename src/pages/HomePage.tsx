import { useQuery } from "@tanstack/react-query";
import { createCategoriesQueryOptions } from "@/api/queries/categoryQueries";
import { productsService } from "@/api/services/productsApi";
import type { Product } from "@/api/types/Product.interface";
import type { Category } from "@/api/types/Category.interface";
import ProductItem from "@/shared/UI/product/ProductItem";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import hero from "../assets/homepage-hero.jpg"
import {
  ArrowRight,
  Sparkles,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
  Star,
  Package
} from "lucide-react";
import { Link } from "react-router";

const HomePage = () => {
  // Fetch featured products (latest 8)
  const { data: featuredProducts, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      const response = await productsService.getProducts({
        sortField: "creationAt",
        direction: "backward"
      });
      return response.data.slice(0, 8);
    },
  });

  // Fetch categories
  const { data: categories, isLoading: isLoadingCategories } = useQuery(
    createCategoriesQueryOptions()
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-6 py-24 md:px-12 lg:px-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.08),transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-sm animate-fade-in-down">
                <Sparkles className="size-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  Premium Tech & Lifestyle
                </span>
              </div>

              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up delay-100">
                Scopri il Futuro
                <br />
                <span className="bg-linear-to-r from-primary to-chart-1 bg-clip-text text-transparent">
                  del Design
                </span>
              </h1>

              <p className="mb-8 max-w-xl text-lg text-muted-foreground animate-fade-in-up delay-200">
                Esplora la nostra collezione curata di prodotti tech e lifestyle di alta gamma,
                progettati per il professionista moderno.
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
                <Link to="/products">
                  <Button size="lg" className="group shadow-lg hover:shadow-xl transition-all duration-300">
                    Esplora Prodotti
                    <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="shadow-sm hover:shadow-md transition-all duration-300">
                    Chi Siamo
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Product Showcase */}
            <div className="relative animate-fade-in-up delay-400">
              <div className="relative aspect-square rounded-3xl bg-linear-to-br from-muted/50 to-muted overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-transparent" />
                {featuredProducts?.[0]?.images?.[0] ? (
                  <img
                    src={hero}
                    alt={featuredProducts[0].title}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <Package className="size-32 text-muted-foreground/30" />
                  </div>
                )}
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 rounded-2xl border border-border bg-card p-4 shadow-lg animate-fade-in-up delay-500">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                    <Star className="size-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Qualita Premium</p>
                    <p className="text-lg font-bold text-foreground">100% Garantita</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y border-border bg-muted/30 px-6 py-8 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Truck, title: "Spedizione Gratuita", description: "Ordini sopra i 50$" },
              { icon: Shield, title: "Garanzia 2 Anni", description: "Su tutti i prodotti" },
              { icon: RotateCcw, title: "Reso Facile", description: "30 giorni per il reso" },
            ].map((item, index) => (
              <div
                key={item.title}
                className="flex items-center gap-4 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="size-6" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-6 py-20 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <Badge variant="secondary" className="mb-4">Categorie</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Esplora per Categoria
              </h2>
            </div>
            <Link to="/products" className="hidden sm:block">
              <Button variant="ghost" className="group">
                Vedi Tutte
                <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {isLoadingCategories ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-[4/3] rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categories?.data.slice(0, 4).map((category: Category, index: number) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.id}`}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="py-0 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30">
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.name}
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center">
                          <Package className="size-16 text-muted-foreground/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white">{category.name}</h3>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link to="/products">
              <Button variant="outline">
                Vedi Tutte le Categorie
                <ChevronRight className="ml-1 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-muted/30 px-6 py-20 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <Badge variant="secondary" className="mb-4">In Evidenza</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Prodotti Selezionati
              </h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                I nostri prodotti piu amati, scelti per qualita e design.
              </p>
            </div>
            <Link to="/products" className="hidden sm:block">
              <Button variant="ghost" className="group">
                Vedi Tutti
                <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {isLoadingProducts ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-square" />
                  <CardContent className="p-4">
                    <Skeleton className="mb-2 h-4 w-20" />
                    <Skeleton className="mb-4 h-6 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts?.slice(0, 4).map((product: Product, index: number) => (
                <div
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductItem product={product} />
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to="/products">
              <Button size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300">
                Scopri Tutti i Prodotti
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="px-6 py-20 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary to-chart-1 px-8 py-16 text-center shadow-2xl md:px-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]" />

            <div className="relative">
              <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30">
                Offerta Speciale
              </Badge>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                Nuova Collezione 2026
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
                Scopri i nuovi arrivi della stagione. Design innovativo e tecnologia all'avanguardia
                per trasformare il tuo stile di vita.
              </p>
              <Link to="/products">
                <Button
                  size="lg"
                  variant="secondary"
                  className="shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Scopri la Collezione
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="px-6 py-20 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <Badge variant="secondary" className="mb-4">Novita</Badge>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ultimi Arrivi
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              I prodotti piu recenti aggiunti al nostro catalogo.
            </p>
          </div>

          {isLoadingProducts ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-square" />
                  <CardContent className="p-4">
                    <Skeleton className="mb-2 h-4 w-20" />
                    <Skeleton className="mb-4 h-6 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts?.slice(4, 8).map((product: Product, index: number) => (
                <div
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductItem product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="border-t border-border bg-muted/30 px-6 py-20 md:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl text-center">
          <Sparkles className="mx-auto mb-6 size-12 text-primary" />
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Rimani Aggiornato
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Iscriviti alla newsletter per ricevere novita esclusive, offerte speciali
            e anteprime sui nuovi prodotti.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="La tua email"
              className="rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary sm:w-80"
            />
            <Button size="lg" className="shadow-lg">
              Iscriviti
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
