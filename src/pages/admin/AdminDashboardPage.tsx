import { createCategoriesQueryOptions } from "@/api/queries/categoryQueries";
import { createProductsQueryOptions } from "@/api/queries/productQueries";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Package, Plus, ShoppingBag, TrendingUp } from "lucide-react";
import { Suspense } from "react";
import { Link } from "react-router";

const DashboardStats = () => {
  const { data: categoriesData } = useSuspenseQuery(createCategoriesQueryOptions());
  const { data: productsData } = useSuspenseInfiniteQuery(createProductsQueryOptions({ search: "", categoryId: null }));

  const totalProducts = productsData?.pages[0].total || 0;
  const totalCategories = categoriesData?.total || 0;

  // Calculate average price if products exist
  const allProducts = productsData?.pages.flatMap(page => page.data) || [];
  const averagePrice = allProducts.length > 0
    ? (allProducts.reduce((sum, p) => sum + (p.price || 0), 0) / allProducts.length).toFixed(2)
    : "0.00";

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProducts}</div>
          <CardDescription className="text-xs mt-1">
            Products in your catalog
          </CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCategories}</div>
          <CardDescription className="text-xs mt-1">
            Active product categories
          </CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Price</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${averagePrice}</div>
          <CardDescription className="text-xs mt-1">
            Average product price
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

const QuickActions = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Products Management</CardTitle>
          <CardDescription>
            Manage your product inventory and catalog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full justify-start">
              <Link to="/admin/products">
                <Package className="mr-2 h-4 w-4" />
                View All Products
                <ArrowRight className="ml-auto h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/admin/products?create=true">
                <Plus className="mr-2 h-4 w-4" />
                Add New Product
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categories Management</CardTitle>
          <CardDescription>
            Organize your products with categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full justify-start">
              <Link to="/admin/categories">
                <ShoppingBag className="mr-2 h-4 w-4" />
                View All Categories
                <ArrowRight className="ml-auto h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/admin/categories?create=true">
                <Plus className="mr-2 h-4 w-4" />
                Add New Category
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminDashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Welcome to your admin dashboard. Here's an overview of your store.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
                  <div className="h-3 w-32 bg-muted animate-pulse rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        }
      >
        <DashboardStats />
      </Suspense>

      <div>
        <h2 className="text-xl font-semibold tracking-tight text-gray-900 mb-4">Quick Actions</h2>
        <QuickActions />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Tips to help you get the most out of your admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-primary font-semibold">•</span>
              <span>
                <strong>Add Products:</strong> Start by adding products to your catalog. Make sure to include high-quality images and detailed descriptions.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-semibold">•</span>
              <span>
                <strong>Organize with Categories:</strong> Create categories to help customers find products easily and improve navigation.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-semibold">•</span>
              <span>
                <strong>Keep it Updated:</strong> Regularly update product information, prices, and availability to ensure accuracy.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
