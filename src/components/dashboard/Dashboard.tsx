import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { User } from '../../App';
import { 
  TrendingUp, Package, Ship, DollarSign, 
  AlertTriangle, CheckCircle, Clock, Users 
} from 'lucide-react';
import { Badge } from '../ui/badge';

interface DashboardProps {
  user: User;
}

export function Dashboard({ user }: DashboardProps) {
  const getDashboardData = () => {
    switch (user.role) {
      case 'admin':
        return {
          title: 'Panel de Administración',
          stats: [
            { label: 'Clientes Activos', value: '248', icon: Users, trend: '+12%', color: 'text-blue-600' },
            { label: 'Operaciones en Curso', value: '64', icon: Ship, trend: '+8%', color: 'text-green-600' },
            { label: 'Facturación Mensual', value: '$2.4M', icon: DollarSign, trend: '+15%', color: 'text-emerald-600' },
            { label: 'Alertas Pendientes', value: '7', icon: AlertTriangle, trend: '-3%', color: 'text-orange-600' },
          ],
        };
      case 'comercial':
        return {
          title: 'Panel Comercial',
          stats: [
            { label: 'Cotizaciones Pendientes', value: '18', icon: Clock, trend: '+5', color: 'text-blue-600' },
            { label: 'Clientes Asignados', value: '42', icon: Users, trend: '+3', color: 'text-green-600' },
            { label: 'Conversión del Mes', value: '68%', icon: TrendingUp, trend: '+12%', color: 'text-emerald-600' },
            { label: 'Nuevos Leads', value: '24', icon: CheckCircle, trend: '+8', color: 'text-purple-600' },
          ],
        };
      case 'operador':
        return {
          title: 'Panel de Operaciones',
          stats: [
            { label: 'Operaciones Activas', value: '32', icon: Ship, trend: '+4', color: 'text-blue-600' },
            { label: 'Contenedores en Tránsito', value: '128', icon: Package, trend: '+12', color: 'text-green-600' },
            { label: 'Arribos Esta Semana', value: '18', icon: CheckCircle, trend: '+2', color: 'text-emerald-600' },
            { label: 'Incidencias', value: '3', icon: AlertTriangle, trend: '-1', color: 'text-orange-600' },
          ],
        };
      case 'cliente':
        return {
          title: 'Mis Operaciones',
          stats: [
            { label: 'Envíos Activos', value: '5', icon: Ship, trend: '', color: 'text-blue-600' },
            { label: 'En Tránsito', value: '3', icon: Package, trend: '', color: 'text-green-600' },
            { label: 'Por Retirar', value: '2', icon: CheckCircle, trend: '', color: 'text-emerald-600' },
            { label: 'Facturas Pendientes', value: '$12,450', icon: DollarSign, trend: '', color: 'text-orange-600' },
          ],
        };
      default:
        return {
          title: 'Dashboard',
          stats: [
            { label: 'Tareas Pendientes', value: '12', icon: Clock, trend: '', color: 'text-blue-600' },
            { label: 'Completadas Hoy', value: '8', icon: CheckCircle, trend: '', color: 'text-green-600' },
            { label: 'En Proceso', value: '15', icon: Ship, trend: '', color: 'text-orange-600' },
            { label: 'Total del Mes', value: '156', icon: TrendingUp, trend: '+18%', color: 'text-emerald-600' },
          ],
        };
    }
  };

  const data = getDashboardData();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-slate-900 mb-2">{data.title}</h1>
        <p className="text-slate-600">Bienvenido, {user.name}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {data.stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-slate-100`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  {stat.trend && (
                    <Badge variant="secondary" className="text-xs">
                      {stat.trend}
                    </Badge>
                  )}
                </div>
                <div className="text-2xl text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Nueva cotización creada', time: 'Hace 5 minutos', status: 'info' },
                { action: 'Cliente registrado', time: 'Hace 1 hora', status: 'success' },
                { action: 'Contenedor arribó a puerto', time: 'Hace 2 horas', status: 'success' },
                { action: 'Factura generada', time: 'Hace 3 horas', status: 'info' },
                { action: 'Inspección programada', time: 'Hace 4 horas', status: 'warning' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 pb-3 border-b last:border-0">
                  <div className={`w-2 h-2 rounded-full ${
                    item.status === 'success' ? 'bg-green-500' :
                    item.status === 'warning' ? 'bg-orange-500' :
                    'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <div className="text-sm text-slate-900">{item.action}</div>
                    <div className="text-xs text-slate-500">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tareas Pendientes</CardTitle>
            <CardDescription>Acciones que requieren su atención</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.role === 'comercial' && [
                { task: 'Aprobar cotización COT-2025-001', priority: 'Alta' },
                { task: 'Contactar cliente ABC Corp', priority: 'Media' },
                { task: 'Revisar documentación XYZ S.A.', priority: 'Baja' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between pb-3 border-b last:border-0">
                  <div className="text-sm text-slate-900">{item.task}</div>
                  <Badge variant={
                    item.priority === 'Alta' ? 'destructive' :
                    item.priority === 'Media' ? 'secondary' :
                    'outline'
                  }>
                    {item.priority}
                  </Badge>
                </div>
              ))}
              {user.role === 'operador' && [
                { task: 'Confirmar reserva de espacio', priority: 'Alta' },
                { task: 'Asignar contenedor CONT-2025-045', priority: 'Alta' },
                { task: 'Actualizar tracking OP-2025-128', priority: 'Media' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between pb-3 border-b last:border-0">
                  <div className="text-sm text-slate-900">{item.task}</div>
                  <Badge variant={item.priority === 'Alta' ? 'destructive' : 'secondary'}>
                    {item.priority}
                  </Badge>
                </div>
              ))}
              {user.role === 'cliente' && [
                { task: 'Pagar factura FACT-2025-034', priority: 'Alta' },
                { task: 'Confirmar recepción de mercancía', priority: 'Media' },
                { task: 'Revisar documentación de embarque', priority: 'Baja' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between pb-3 border-b last:border-0">
                  <div className="text-sm text-slate-900">{item.task}</div>
                  <Badge variant={
                    item.priority === 'Alta' ? 'destructive' :
                    item.priority === 'Media' ? 'secondary' :
                    'outline'
                  }>
                    {item.priority}
                  </Badge>
                </div>
              ))}
              {!['comercial', 'operador', 'cliente'].includes(user.role) && [
                { task: 'Revisar proceso aduanero', priority: 'Alta' },
                { task: 'Verificar documentación', priority: 'Media' },
                { task: 'Actualizar registro', priority: 'Baja' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between pb-3 border-b last:border-0">
                  <div className="text-sm text-slate-900">{item.task}</div>
                  <Badge variant={
                    item.priority === 'Alta' ? 'destructive' :
                    item.priority === 'Media' ? 'secondary' :
                    'outline'
                  }>
                    {item.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
