import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { User } from '../../App';
import { User as UserIcon, Mail, Phone, Building, MapPin, Lock, Bell, Shield } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface PerfilModuleProps {
  user: User;
}

export function PerfilModule({ user }: PerfilModuleProps) {
  const [editMode, setEditMode] = useState(false);

  const getRoleLabel = (role: string) => {
    const roles: Record<string, string> = {
      admin: 'Administrador del Sistema',
      comercial: 'Ejecutivo Comercial',
      operador: 'Operador Logístico',
      despachante: 'Despachante de Aduanas',
      facturador: 'Facturador / Contador',
      almacen: 'Personal de Almacén',
      cliente: 'Cliente',
    };
    return roles[role] || role;
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-slate-900 mb-2">Mi Perfil</h1>
        <p className="text-slate-600">Gestione su información personal y configuración</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <UserIcon className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-xl text-slate-900 mb-1">{user.name}</h3>
                <p className="text-sm text-slate-600 mb-3">{user.email}</p>
                <Badge variant="secondary" className="mb-4">
                  {getRoleLabel(user.role)}
                </Badge>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Mail className="w-4 h-4 text-slate-600" />
                  <div>
                    <div className="text-xs text-slate-500">Email</div>
                    <div className="text-slate-900">{user.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Phone className="w-4 h-4 text-slate-600" />
                  <div>
                    <div className="text-xs text-slate-500">Teléfono</div>
                    <div className="text-slate-900">+51 999 888 777</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Building className="w-4 h-4 text-slate-600" />
                  <div>
                    <div className="text-xs text-slate-500">Empresa</div>
                    <div className="text-slate-900">NaviTrans Global</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <MapPin className="w-4 h-4 text-slate-600" />
                  <div>
                    <div className="text-xs text-slate-500">Ubicación</div>
                    <div className="text-slate-900">Lima, Perú</div>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-6" variant="outline">
                Cambiar Foto de Perfil
              </Button>
            </CardContent>
          </Card>

          {user.role === 'cliente' && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-base">Información de la Empresa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="text-xs text-slate-500 mb-1">RUC</div>
                  <div className="text-slate-900">20123456789</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Razón Social</div>
                  <div className="text-slate-900">Importadora Global S.A.C.</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Estado</div>
                  <Badge variant="default">Cliente Validado</Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Settings Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="informacion">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="informacion">Información</TabsTrigger>
              <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
              <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
            </TabsList>

            <TabsContent value="informacion" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Información Personal</CardTitle>
                      <CardDescription>Actualice sus datos personales</CardDescription>
                    </div>
                    <Button
                      variant={editMode ? 'default' : 'outline'}
                      onClick={() => setEditMode(!editMode)}
                    >
                      {editMode ? 'Guardar Cambios' : 'Editar'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-700 mb-2 block">Nombre Completo</label>
                      <Input defaultValue={user.name} disabled={!editMode} />
                    </div>
                    <div>
                      <label className="text-sm text-slate-700 mb-2 block">Email</label>
                      <Input defaultValue={user.email} disabled={!editMode} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-700 mb-2 block">Teléfono</label>
                      <Input defaultValue="+51 999 888 777" disabled={!editMode} />
                    </div>
                    <div>
                      <label className="text-sm text-slate-700 mb-2 block">Cargo</label>
                      <Input defaultValue={getRoleLabel(user.role)} disabled={!editMode} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-slate-700 mb-2 block">Dirección</label>
                    <Input defaultValue="Av. Principal 123, Lima, Perú" disabled={!editMode} />
                  </div>
                </CardContent>
              </Card>

              {user.role !== 'cliente' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Información de la Empresa</CardTitle>
                    <CardDescription>Datos de la organización</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-slate-700 mb-2 block">Empresa</label>
                        <Input defaultValue="NaviTrans Global" disabled />
                      </div>
                      <div>
                        <label className="text-sm text-slate-700 mb-2 block">Departamento</label>
                        <Input defaultValue={
                          user.role === 'comercial' ? 'Ventas' :
                          user.role === 'operador' ? 'Operaciones' :
                          user.role === 'despachante' ? 'Aduanas' :
                          user.role === 'facturador' ? 'Finanzas' :
                          user.role === 'almacen' ? 'Logística' :
                          'Administración'
                        } disabled />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-slate-700 mb-2 block">Oficina</label>
                      <Input defaultValue="Av. República de Panamá 3535, San Isidro, Lima" disabled />
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="seguridad" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    <div>
                      <CardTitle>Cambiar Contraseña</CardTitle>
                      <CardDescription>Actualice su contraseña de acceso</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-slate-700 mb-2 block">Contraseña Actual</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="text-sm text-slate-700 mb-2 block">Nueva Contraseña</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="text-sm text-slate-700 mb-2 block">Confirmar Nueva Contraseña</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Actualizar Contraseña
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <div>
                      <CardTitle>Autenticación de Dos Factores</CardTitle>
                      <CardDescription>Agregue una capa adicional de seguridad</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <div className="text-sm text-slate-900 mb-1">Autenticación 2FA</div>
                      <div className="text-xs text-slate-600">
                        Requiere un código adicional al iniciar sesión
                      </div>
                    </div>
                    <Button variant="outline">Activar</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sesiones Activas</CardTitle>
                  <CardDescription>Dispositivos donde ha iniciado sesión</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { device: 'Chrome en Windows', location: 'Lima, Perú', time: 'Ahora', current: true },
                    { device: 'Safari en iPhone', location: 'Lima, Perú', time: 'Hace 2 horas', current: false },
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="text-sm text-slate-900 flex items-center gap-2">
                          {session.device}
                          {session.current && <Badge variant="secondary" className="text-xs">Actual</Badge>}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          {session.location} • {session.time}
                        </div>
                      </div>
                      {!session.current && (
                        <Button variant="ghost" size="sm">
                          Cerrar
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notificaciones" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    <div>
                      <CardTitle>Preferencias de Notificaciones</CardTitle>
                      <CardDescription>Configure cómo desea recibir notificaciones</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: 'Nuevas cotizaciones', email: true, push: true },
                    { label: 'Actualizaciones de operaciones', email: true, push: true },
                    { label: 'Facturas generadas', email: true, push: false },
                    { label: 'Cambios en entregas', email: true, push: true },
                    { label: 'Alertas de documentos', email: false, push: true },
                    { label: 'Resumen semanal', email: true, push: false },
                  ].map((notif, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="text-sm text-slate-900">{notif.label}</div>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 text-sm text-slate-600">
                          <input type="checkbox" defaultChecked={notif.email} />
                          Email
                        </label>
                        <label className="flex items-center gap-2 text-sm text-slate-600">
                          <input type="checkbox" defaultChecked={notif.push} />
                          Push
                        </label>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resumen de Actividad</CardTitle>
                  <CardDescription>Frecuencia de reportes por email</CardDescription>
                </CardHeader>
                <CardContent>
                  <select className="w-full border rounded-md p-2">
                    <option>Diario</option>
                    <option>Semanal</option>
                    <option>Quincenal</option>
                    <option>Mensual</option>
                    <option>Nunca</option>
                  </select>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
