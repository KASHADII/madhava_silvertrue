import {
  Calendar,
  ChartBar,
  FilePlus2Icon,
  GalleryVerticalEnd,
  Home,
  Inbox,
  PackageSearch,
  Search,
  Settings,
  Tag,
  Percent,
  List,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setUserLogout } from "@/redux/slices/authSlice";

// Menu items.
const items = [
  {
    title: "Create Products",
    url: "/admin/dashboard",
    icon: FilePlus2Icon,
  },
  {
    title: "All Products",
    url: "/admin/dashboard/all-products",
    icon: GalleryVerticalEnd,
  },
  {
    title: "Product List",
    url: "/admin/dashboard/product-list",
    icon: List,
  },
  {
    title: "Categories",
    url: "/admin/dashboard/categories",
    icon: Tag,
  },
  {
    title: "Discounts",
    url: "/admin/dashboard/discounts",
    icon: Percent,
  },
  {
    title: "Orders",
    url: "/admin/dashboard/orders",
    icon: PackageSearch,
  },
  {
    title: "Analytics",
    url: "/admin/dashboard/analytics",
    icon: ChartBar,
  },
  {
    title: "Settings",
    url: "/admin/dashboard/settings",
    icon: Settings,
  },
];

const AppSidebar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch()

  return (
    <Sidebar>
      <SidebarHeader>
        <h3 className="text-xl font-bold px-2">Dashboard</h3>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`w-full justify-start gap-2 ${
                      pathname === item.url 
                        ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                        : "hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button 
          onClick={() => dispatch(setUserLogout())} 
          variant="outline" 
          className="w-full"
        >
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
