import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Shield, Users } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built with modern web technologies for maximum performance and speed."
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with best practices built in from the ground up."
  },
  {
    icon: Users,
    title: "Collaborative",
    description: "Work seamlessly with your team with real-time collaboration features."
  },
  {
    icon: Sparkles,
    title: "Beautiful Design",
    description: "Stunning UI components built with shadcn/ui and Tailwind CSS."
  }
];

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 px-6 py-32 md:px-12 lg:px-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.1),transparent_50%)]" />
        
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-sm animate-fade-in-down">
            <Sparkles className="size-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Built with shadcn/ui · New York Style
            </span>
          </div>
          
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl animate-fade-in-up delay-100">
            Create Something
            <br />
            <span className="bg-linear-to-r from-primary to-chart-1 bg-clip-text text-transparent">
              Beautiful
            </span>
          </h1>
          
          <p className="mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl animate-fade-in-up delay-200">
            Experience the power of modern web development with our cutting-edge platform. 
            Built with React, Vite, and the best UI components from shadcn/ui.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
            <Button size="lg" className="group shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started
              <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="shadow-sm hover:shadow-md transition-all duration-300">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Everything You Need
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Powerful features designed to help you build better, faster, and smarter.
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/50 animate-fade-in-up"
                style={{ animationDelay: `${index * 100 + 400}ms` }}
              >
                <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                  <feature.icon className="size-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-border bg-muted/30 px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "10K+", label: "Active Users" },
              { value: "99.9%", label: "Uptime" },
              { value: "50+", label: "Countries" },
              { value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100 + 800}ms` }}
              >
                <div className="mb-2 text-4xl font-bold text-primary sm:text-5xl">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl animate-fade-in-up">
            Ready to Get Started?
          </h2>
          <p className="mb-10 text-lg text-muted-foreground animate-fade-in-up delay-100">
            Join thousands of developers building the future with our platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-200">
            <Button size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300">
              Start Building Now
            </Button>
            <Button size="lg" variant="outline" className="shadow-sm hover:shadow-md transition-all duration-300">
              View Documentation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
