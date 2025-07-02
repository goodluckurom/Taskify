import DashboardLayout from "@/components/layout/dashboard-layout";
import { DashboardProvider } from "@/context/dashboard-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </DashboardProvider>
  );
}
