import { Button } from "@/components/ui/button";
import { Heart, Target, Lightbulb, Rocket } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission Driven",
    description: "We're committed to building tools that make developers' lives easier and more productive."
  },
  {
    icon: Heart,
    title: "User First",
    description: "Every decision we make is centered around creating the best possible experience for our users."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We constantly push boundaries and explore new technologies to stay ahead of the curve."
  },
  {
    icon: Rocket,
    title: "Fast Execution",
    description: "Speed matters. We move quickly to deliver features and improvements that matter most."
  }
];

const team = [
  { name: "Alex Johnson", role: "Founder & CEO", initials: "AJ" },
  { name: "Sarah Chen", role: "Head of Design", initials: "SC" },
  { name: "Michael Brown", role: "Lead Engineer", initials: "MB" },
  { name: "Emma Davis", role: "Product Manager", initials: "ED" },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-accent/5 via-background to-primary/5 px-6 py-32 md:px-12 lg:px-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(120,119,198,0.1),transparent_50%)]" />
        
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-sm animate-fade-in-down">
            <Heart className="size-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              About Us
            </span>
          </div>
          
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl animate-fade-in-up delay-100">
            Building The
            <br />
            <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Future Together
            </span>
          </h1>
          
          <p className="mb-10 max-w-3xl text-lg text-muted-foreground sm:text-xl leading-relaxed animate-fade-in-up delay-200">
            We're a team of passionate developers, designers, and dreamers committed to creating 
            exceptional tools that empower developers worldwide. Our mission is to make web development 
            more accessible, enjoyable, and productive for everyone.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Story
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              It all started in 2024 when a group of developers frustrated with the complexity of 
              modern web development decided to build something better. We believed that creating 
              beautiful, performant web applications shouldn't require jumping through hoops or 
              compromising on quality.
            </p>
            <p>
              Today, we're proud to serve thousands of developers worldwide, helping them build 
              amazing applications with our carefully crafted tools and components. Every feature 
              we add and every improvement we make is driven by feedback from our incredible community.
            </p>
            <p>
              We're just getting started, and we're excited to continue this journey with you.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="border-t border-border bg-muted/30 px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Values
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              The principles that guide everything we do.
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="group rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/50 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                  <value.icon className="size-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              The talented people behind the product.
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="group text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                <div className="mb-4 mx-auto flex size-24 items-center justify-center rounded-full bg-linear-to-br from-primary to-chart-1 text-2xl font-bold text-primary-foreground shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                  {member.initials}
                </div>
                <h3 className="mb-1 text-lg font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-linear-to-br from-primary/5 to-accent/5 px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl animate-fade-in-up">
            Want to Join Us?
          </h2>
          <p className="mb-10 text-lg text-muted-foreground animate-fade-in-up delay-100">
            We're always looking for talented individuals who share our passion for building great products.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-200">
            <Button size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300">
              View Open Positions
            </Button>
            <Button size="lg" variant="outline" className="shadow-sm hover:shadow-md transition-all duration-300">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
