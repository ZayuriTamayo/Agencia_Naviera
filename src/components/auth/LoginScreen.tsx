import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Anchor, Mail, Lock } from 'lucide-react';
import { User, UserRole } from '../../App';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRoles, setShowRoles] = useState(false);

  const roles: { role: UserRole; label: string; description: string }[] = [
    { role: 'admin', label: 'Administrador', description: 'Acceso completo al sistema' },
    { role: 'comercial', label: 'Ejecutivo Comercial', description: 'Gestión de clientes y cotizaciones' },
    { role: 'operador', label: 'Operador Logístico', description: 'Gestión de operaciones y reservas' },
    { role: 'despachante', label: 'Despachante de Aduanas', description: 'Gestión aduanera y tributos' },
    { role: 'facturador', label: 'Facturador', description: 'Facturación y pagos' },
    { role: 'almacen', label: 'Personal de Almacén', description: 'Gestión de contenedores y entregas' },
    { role: 'cliente', label: 'Cliente', description: 'Seguimiento de envíos' },
  ];

  const handleRoleSelect = (role: UserRole) => {
    const roleData = roles.find(r => r.role === role);
    onLogin({
      id: `user-${role}`,
      name: roleData?.label || 'Usuario',
      email: email || `${role}@navitrans.com`,
      role: role,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRoles(true);
  };

  if (showRoles) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Seleccione su Rol</CardTitle>
            <CardDescription>
              Para esta demostración, seleccione el rol con el que desea acceder
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {roles.map((role) => (
              <Button
                key={role.role}
                variant="outline"
                className="w-full justify-start h-auto py-4"
                onClick={() => handleRoleSelect(role.role)}
              >
                <div className="text-left">
                  <div className="font-semibold">{role.label}</div>
                  <div className="text-sm text-muted-foreground">{role.description}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-4 rounded-full">
              <Anchor className="w-12 h-12 text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl">NaviTrans Global</CardTitle>
            <CardDescription>Sistema de Gestión Integral</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-700">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  type="email"
                  placeholder="usuario@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-700">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-slate-600">Recordarme</span>
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                ¿Olvidó su contraseña?
              </a>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Iniciar Sesión
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-slate-600">
            <p>Demo: Ingrese cualquier email y contraseña</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
