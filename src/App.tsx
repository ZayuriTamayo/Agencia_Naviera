import { useState } from 'react';
import { LoginScreen } from './components/auth/LoginScreen';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './components/dashboard/Dashboard';
import { ClientesModule } from './components/modules/ClientesModule';
import { CotizacionesModule } from './components/modules/CotizacionesModule';
import { OperacionesModule } from './components/modules/OperacionesModule';
import { AduanasModule } from './components/modules/AduanasModule';
import { ContenedoresModule } from './components/modules/ContenedoresModule';
import { FacturacionModule } from './components/modules/FacturacionModule';
import { SeguimientoModule } from './components/modules/SeguimientoModule';
import { EntregasModule } from './components/modules/EntregasModule';
import { PerfilModule } from './components/modules/PerfilModule';

export type UserRole = 'cliente' | 'comercial' | 'operador' | 'despachante' | 'facturador' | 'almacen' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentModule, setCurrentModule] = useState<string>('dashboard');

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentModule('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentModule('dashboard');
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderModule = () => {
    switch (currentModule) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'clientes':
        return <ClientesModule user={user} />;
      case 'cotizaciones':
        return <CotizacionesModule user={user} />;
      case 'operaciones':
        return <OperacionesModule user={user} />;
      case 'aduanas':
        return <AduanasModule user={user} />;
      case 'contenedores':
        return <ContenedoresModule user={user} />;
      case 'facturacion':
        return <FacturacionModule user={user} />;
      case 'seguimiento':
        return <SeguimientoModule user={user} />;
      case 'entregas':
        return <EntregasModule user={user} />;
      case 'perfil':
        return <PerfilModule user={user} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <MainLayout
      user={user}
      currentModule={currentModule}
      onModuleChange={setCurrentModule}
      onLogout={handleLogout}
    >
      {renderModule()}
    </MainLayout>
  );
}
