import { Inter } from "next/font/google";
import { Caption } from "@/components/caption";
import { Header } from "@/components/header";
import { QueryClient, QueryClientProvider } from "react-query";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function Home() {
  return (
    <div className={`flex flex-col min-h-screen ${inter.className}`}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Caption />
      </QueryClientProvider>
    </div>
  );
}
