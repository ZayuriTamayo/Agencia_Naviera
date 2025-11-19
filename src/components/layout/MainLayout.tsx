import { ReactNode } from 'react';
import { Button } from '../ui/button';
import { 
  Anchor, LayoutDashboard, Users, FileText, Ship, 
  FileCheck, Package, Receipt, MapPin, Truck, 
  Bell, User as UserIcon, LogOut, Menu, X 
} from 'lucide-react';
import { User, UserRole } from '../../App';
import { Badge } from '../ui/badge';
import { useState } from 'react';

interface MainLayoutProps {
  children: ReactNode;
  user: User;
  currentModule: string;
  onModuleChange: (module: string) => void;
  onLogout: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  roles: UserRole[];
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'comercial', 'operador', 'despachante', 'facturador', 'almacen', 'cliente'] },
  { id: 'clientes', label: 'Clientes', icon: Users, roles: ['admin', 'comercial'] },
  { id: 'cotizaciones', label: 'Cotizaciones', icon: FileText, roles: ['admin', 'comercial', 'cliente'] },
  { id: 'operaciones', label: 'Operaciones', icon: Ship, roles: ['admin', 'operador', 'comercial'] },
  { id: 'aduanas', label: 'Aduanas', icon: FileCheck, roles: ['admin', 'despachante'] },
  { id: 'contenedores', label: 'Contenedores', icon: Package, roles: ['admin', 'operador', 'almacen'] },
  { id: 'facturacion', label: 'Facturación', icon: Receipt, roles: ['admin', 'facturador', 'cliente'] },
  { id: 'seguimiento', label: 'Seguimiento', icon: MapPin, roles: ['admin', 'cliente', 'comercial', 'operador'] },
  { id: 'entregas', label: 'Entregas', icon: Truck, roles: ['admin', 'almacen', 'cliente'] },
];

export function MainLayout({ children, user, currentModule, onModuleChange, onLogout }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const filteredMenuItems = menuItems.filter(item => item.roles.includes(user.role));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X /> : <Menu />}
            </Button>
            <div className="flex items-center gap-2">
              <Anchor className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-lg text-slate-900">NaviTrans Global</div>
                <div className="text-xs text-slate-500">Sistema de Gestión</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
            <div className="hidden md:flex items-center gap-3 border-l pl-4">
              <div className="text-right">
                <div className="text-sm text-slate-900">{user.name}</div>
                <div className="text-xs text-slate-500">{user.email}</div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onModuleChange('perfil')}
              >
                <UserIcon className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-16 left-0 z-20 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200
            transform transition-transform duration-200 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="p-4 border-b border-slate-200">
            <Badge variant="secondary" className="w-full justify-center">
              {user.role === 'admin' && 'Administrador'}
              {user.role === 'comercial' && 'Ejecutivo Comercial'}
              {user.role === 'operador' && 'Operador Logístico'}
              {user.role === 'despachante' && 'Despachante'}
              {user.role === 'facturador' && 'Facturador'}
              {user.role === 'almacen' && 'Almacén'}
              {user.role === 'cliente' && 'Cliente'}
            </Badge>
          </div>
          <nav className="p-4 space-y-1">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentModule === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => {
                    onModuleChange(item.id);
                    setSidebarOpen(false);
                  }}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
