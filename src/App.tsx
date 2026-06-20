import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PoliticaDePrivacidade from "./pages/PoliticaDePrivacidade";
import TermosDeUso from "./pages/TermosDeUso";
import BlogPost from "./pages/BlogPost";

const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminPosts = lazy(() => import("./pages/admin/Posts"));
const AdminPostEditor = lazy(() => import("./pages/admin/PostEditor"));
const ProtectedRoute = lazy(() => import("./components/admin/ProtectedRoute"));

const queryClient = new QueryClient();

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
  </div>
);

const AdminProtected = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingSpinner />}>
    <ProtectedRoute>{children}</ProtectedRoute>
  </Suspense>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidade />} />
            <Route path="/termos-de-uso" element={<TermosDeUso />} />
            {/* Blog */}
            <Route path="/blog" element={<Navigate to="/#blog" replace />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/agendar" element={<Navigate to="/#agendar" replace />} />
            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminProtected><AdminDashboard /></AdminProtected>} />
            <Route path="/admin/posts" element={<AdminProtected><AdminPosts /></AdminProtected>} />
            <Route path="/admin/posts/new" element={<AdminProtected><AdminPostEditor /></AdminProtected>} />
            <Route path="/admin/posts/:id" element={<AdminProtected><AdminPostEditor /></AdminProtected>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
