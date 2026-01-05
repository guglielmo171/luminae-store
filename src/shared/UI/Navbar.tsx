import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link, NavLink } from "react-router";

// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: "Alert Dialog",
//     href: "/docs/primitives/alert-dialog",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Hover Card",
//     href: "/docs/primitives/hover-card",
//     description:
//       "For sighted users to preview content available behind a link.",
//   },
//   {
//     title: "Progress",
//     href: "/docs/primitives/progress",
//     description:
//       "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
//   },
//   {
//     title: "Scroll-area",
//     href: "/docs/primitives/scroll-area",
//     description: "Visually or semantically separates content.",
//   },
//   {
//     title: "Tabs",
//     href: "/docs/primitives/tabs",
//     description:
//       "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
//   },
//   {
//     title: "Tooltip",
//     href: "/docs/primitives/tooltip",
//     description:
//       "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
//   },
// ]

// function ListItem({
//   title,
//   children,
//   href,
//   ...props
// }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
//   return (
//     <li {...props}>
//       <NavigationMenuLink asChild>
//         <Link to={href}>
//           <div className="text-sm leading-none font-medium">{title}</div>
//           <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
//             {children}
//           </p>
//         </Link>
//       </NavigationMenuLink>
//     </li>
//   )
// }


// const NavbarDemo = () => {
//     return (
//     <NavigationMenu viewport={false}>
//       <NavigationMenuList className="flex-wrap">
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Home</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
//               <li className="row-span-3">
//                 <NavigationMenuLink asChild>
//                   <a
//                     className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
//                     href="/"
//                   >
//                     <div className="mb-2 text-lg font-medium sm:mt-4">
//                       shadcn/ui
//                     </div>
//                     <p className="text-muted-foreground text-sm leading-tight">
//                       Beautifully designed components built with Tailwind CSS.
//                     </p>
//                   </a>
//                 </NavigationMenuLink>
//               </li>
//               <ListItem href="/docs" title="Introduction">
//                 Re-usable components built using Radix UI and Tailwind CSS.
//               </ListItem>
//               <ListItem href="/docs/installation" title="Installation">
//                 How to install dependencies and structure your app.
//               </ListItem>
//               <ListItem href="/docs/primitives/typography" title="Typography">
//                 Styles for headings, paragraphs, lists...etc
//               </ListItem>
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Components</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
//               {components.map((component) => (
//                 <ListItem
//                   key={component.title}
//                   title={component.title}
//                   href={component.href}
//                 >
//                   {component.description}
//                 </ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
//             <Link to="/docs">Docs</Link>
//           </NavigationMenuLink>
//         </NavigationMenuItem>
//         <NavigationMenuItem className="hidden md:block">
//           <NavigationMenuTrigger>List</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[300px] gap-4">
//               <li>
//                 <NavigationMenuLink asChild>
//                   <Link to="#">
//                     <div className="font-medium">Components</div>
//                     <div className="text-muted-foreground">
//                       Browse all components in the library.
//                     </div>
//                   </Link>
//                 </NavigationMenuLink>
//                 <NavigationMenuLink asChild>
//                   <Link to="#">
//                     <div className="font-medium">Documentation</div>
//                     <div className="text-muted-foreground">
//                       Learn how to use the library.
//                     </div>
//                   </Link>
//                 </NavigationMenuLink>
//                 <NavigationMenuLink asChild>
//                   <Link to="#">
//                     <div className="font-medium">Blog</div>
//                     <div className="text-muted-foreground">
//                       Read our latest blog posts.
//                     </div>
//                   </Link>
//                 </NavigationMenuLink>
//               </li>
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem className="hidden md:block">
//           <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[200px] gap-4">
//               <li>
//                 <NavigationMenuLink asChild>
//                   <Link to="#">Components</Link>
//                 </NavigationMenuLink>
//                 <NavigationMenuLink asChild>
//                   <Link to="#">Documentation</Link>
//                 </NavigationMenuLink>
//                 <NavigationMenuLink asChild>
//                   <Link to="#">Blocks</Link>
//                 </NavigationMenuLink>
//               </li>
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem className="hidden md:block">
//           <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[200px] gap-4">
//               <li>
//                 <NavigationMenuLink asChild>
//                   <Link to="#" className="flex-row items-center gap-2">
//                     <CircleHelpIcon />
//                     Backlog
//                   </Link>
//                 </NavigationMenuLink>
//                 <NavigationMenuLink asChild>
//                   <Link to="#" className="flex-row items-center gap-2">
//                     <CircleIcon />
//                     To Do
//                   </Link>
//                 </NavigationMenuLink>
//                 <NavigationMenuLink asChild>
//                   <Link to="#" className="flex-row items-center gap-2">
//                     <CircleCheckIcon />
//                     Done
//                   </Link>
//                 </NavigationMenuLink>
//               </li>
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//       </NavigationMenuList>
//     </NavigationMenu>
//   )
// }

const navbar:{
  title:string
  href:string
  visible?:boolean
  auth:boolean
}[] = [
    {
        title: "Homepage",
        href: "/",
        auth:false
    },
    {
        title: "About",
        href: "/about",
        auth:false
    },
    {
        title: "Products",
        href: "/products",
        auth:false
    },
     {
        title: "Admin",
        href: "/admin",
        auth:true
    }
]

import { authQueryOptions, useSignOutOptions } from "@/api/queries/authQueries";
import logo from "@/assets/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LogOut, User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router";

const Navbar = () => {
    const navigate = useNavigate();
    const { data: user } = useQuery(authQueryOptions.user())
    const {mutate:handleSignOut} = useMutation({
        ...useSignOutOptions(),
        onSuccess:()=>{
            navigate("/login");
        }
    });

    const navbarElements= navbar.map(el=>({...el,visible:(!el.auth || (!!el.auth && !!user))}))
    const navElements = navbarElements.filter((element)=> element.visible);
    
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-6 md:px-12">
                <Link to="/" className="flex items-center gap-2 font-bold text-xl transition-colors hover:text-primary">
                    <img src={logo} alt="Luminae Logo" className="size-12 object-contain" />
                    <span className="hidden sm:inline-block">Luminae</span>
                </Link>
                
   <NavigationMenu>
      <NavigationMenuList className="hidden md:flex gap-1">
        {navElements.map((element) => (
          <NavigationMenuItem key={element.href}>
              <NavLink
                to={element.href}
                end
                className={({ isActive }) =>
                  cn(
                    navigationMenuTriggerStyle(),
                    "cursor-pointer font-medium",
                    isActive && "bg-accent/80 text-accent-foreground font-bold" 
                  )
                }
              >
                {element.title}
              </NavLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>

                <div className="flex items-center gap-4">
                  {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                          <Avatar className="h-9 w-9 border border-border">
                            <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || "User"} />
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                              {user.email?.[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">My Account</p>
                            <p className="text-xs leading-none text-muted-foreground truncate">
                              {user.email}
                            </p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <NavLink to="/profile" className="cursor-pointer">
                                <UserIcon className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={()=>handleSignOut()} className="text-red-600 focus:text-red-600 cursor-pointer">
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
                      <NavLink to="/login">Log in</NavLink>
                    </Button>
                  )}
                </div>
            </div>
        </header>
    )
}

export default Navbar