import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Plus, Search, Eye, Edit, CheckCircle, XCircle, Clock, Upload } from 'lucide-react';
import { User } from '../../App';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Textarea } from '../ui/textarea';

interface ClientesModuleProps {
  user: User;
}

interface Cliente {
  id: string;
  codigo: string;
  ruc: string;
  razonSocial: string;
  email: string;
  telefono: string;
  estado: 'pendiente' | 'validado' | 'rechazado';
  fechaRegistro: string;
}

const mockClientes: Cliente[] = [
  { id: '1', codigo: 'CLI-2025-001', ruc: '20123456789', razonSocial: 'Importadora ABC S.A.C.', email: 'contacto@abc.com', telefono: '+51 987654321', estado: 'validado', fechaRegistro: '2025-01-10' },
  { id: '2', codigo: 'CLI-2025-002', ruc: '20987654321', razonSocial: 'Exportadora XYZ S.R.L.', email: 'ventas@xyz.com', telefono: '+51 912345678', estado: 'validado', fechaRegistro: '2025-01-15' },
  { id: '3', codigo: 'CLI-2025-003', ruc: '20456789123', razonSocial: 'Comercial Global E.I.R.L.', email: 'info@global.com', telefono: '+51 998877665', estado: 'pendiente', fechaRegistro: '2025-02-01' },
  { id: '4', codigo: 'CLI-2025-004', ruc: '20789456123', razonSocial: 'Distribuidora Mar S.A.', email: 'contacto@mar.com', telefono: '+51 955443322', estado: 'validado', fechaRegistro: '2025-02-05' },
];

export function ClientesModule({ user }: ClientesModuleProps) {
  const [view, setView] = useState<'list' | 'create' | 'detail'>('list');
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [clientes] = useState<Cliente[]>(mockClientes);

  const filteredClientes = clientes.filter(c =>
    c.razonSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.ruc.includes(searchTerm) ||
    c.codigo.includes(searchTerm)
  );

  if (view === 'create') {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-slate-900 mb-2">Nuevo Cliente</h1>
            <p className="text-slate-600">Registrar información del cliente</p>
          </div>
          <Button variant="outline" onClick={() => setView('list')}>
            Volver
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Información del Cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">RUC / Tax ID</label>
                    <Input placeholder="20123456789" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">Tipo de Cliente</label>
                    <select className="w-full h-10 px-3 rounded-md border border-slate-300">
                      <option>Importador</option>
                      <option>Exportador</option>
                      <option>Ambos</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Razón Social</label>
                  <Input placeholder="Nombre de la empresa" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">Email Corporativo</label>
                    <Input type="email" placeholder="contacto@empresa.com" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">Teléfono</label>
                    <Input type="tel" placeholder="+51 987654321" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Dirección Fiscal</label>
                  <Textarea placeholder="Dirección completa" rows={3} />
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Datos de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">Nombre del Contacto</label>
                    <Input placeholder="Juan Pérez" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">Cargo</label>
                    <Input placeholder="Gerente de Operaciones" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">Email de Contacto</label>
                    <Input type="email" placeholder="juan.perez@empresa.com" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">Teléfono Directo</label>
                    <Input type="tel" placeholder="+51 912345678" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Documentación Requerida</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  'Ficha RUC',
                  'Vigencia de Poder',
                  'DNI del Representante Legal',
                  'Registro de Importador/Exportador',
                ].map((doc, index) => (
                  <div key={index} className="border border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-500 cursor-pointer transition">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                    <div className="text-sm text-slate-900">{doc}</div>
                    <div className="text-xs text-slate-500 mt-1">PDF, máx. 5MB</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent className="p-6 space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Registrar Cliente
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setView('list')}>
                  Cancelar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'detail' && selectedCliente) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-slate-900 mb-2">{selectedCliente.razonSocial}</h1>
            <p className="text-slate-600">{selectedCliente.codigo}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setView('list')}>
              Volver
            </Button>
            <Button>
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información General</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-slate-600 mb-1">RUC</div>
                    <div className="text-slate-900">{selectedCliente.ruc}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Código</div>
                    <div className="text-slate-900">{selectedCliente.codigo}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Email</div>
                    <div className="text-slate-900">{selectedCliente.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Teléfono</div>
                    <div className="text-slate-900">{selectedCliente.telefono}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Estado</div>
                    <Badge variant={selectedCliente.estado === 'validado' ? 'default' : selectedCliente.estado === 'pendiente' ? 'secondary' : 'destructive'}>
                      {selectedCliente.estado === 'validado' && 'Validado'}
                      {selectedCliente.estado === 'pendiente' && 'Pendiente'}
                      {selectedCliente.estado === 'rechazado' && 'Rechazado'}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Fecha de Registro</div>
                    <div className="text-slate-900">{selectedCliente.fechaRegistro}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Historial de Operaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { operacion: 'OP-2025-045', tipo: 'Importación', estado: 'En tránsito', fecha: '2025-02-10' },
                    { operacion: 'OP-2025-032', tipo: 'Exportación', estado: 'Entregado', fecha: '2025-01-28' },
                    { operacion: 'OP-2025-018', tipo: 'Importación', estado: 'Entregado', fecha: '2025-01-15' },
                  ].map((op, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="text-sm text-slate-900">{op.operacion}</div>
                        <div className="text-xs text-slate-600">{op.tipo} · {op.fecha}</div>
                      </div>
                      <Badge variant="outline">{op.estado}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Documentos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { nombre: 'Ficha RUC', estado: 'validado' },
                  { nombre: 'Vigencia de Poder', estado: 'validado' },
                  { nombre: 'DNI Representante', estado: 'validado' },
                  { nombre: 'Registro Importador', estado: 'validado' },
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="text-sm text-slate-900">{doc.nombre}</div>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estadísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-slate-600 mb-1">Total Operaciones</div>
                  <div className="text-2xl text-slate-900">24</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600 mb-1">Volumen Anual</div>
                  <div className="text-2xl text-slate-900">450 TEU</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600 mb-1">Facturación Total</div>
                  <div className="text-2xl text-slate-900">$128,500</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-slate-900 mb-2">Gestión de Clientes</h1>
          <p className="text-slate-600">Administre la cartera de clientes</p>
        </div>
        <Button onClick={() => setView('create')} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Cliente
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Clientes</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Buscar cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm text-slate-600">Código</th>
                  <th className="text-left py-3 px-4 text-sm text-slate-600">RUC</th>
                  <th className="text-left py-3 px-4 text-sm text-slate-600">Razón Social</th>
                  <th className="text-left py-3 px-4 text-sm text-slate-600">Contacto</th>
                  <th className="text-left py-3 px-4 text-sm text-slate-600">Estado</th>
                  <th className="text-left py-3 px-4 text-sm text-slate-600">Fecha</th>
                  <th className="text-left py-3 px-4 text-sm text-slate-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredClientes.map((cliente) => (
                  <tr key={cliente.id} className="border-b hover:bg-slate-50">
                    <td className="py-3 px-4 text-sm text-slate-900">{cliente.codigo}</td>
                    <td className="py-3 px-4 text-sm text-slate-900">{cliente.ruc}</td>
                    <td className="py-3 px-4 text-sm text-slate-900">{cliente.razonSocial}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">
                      <div>{cliente.email}</div>
                      <div className="text-xs">{cliente.telefono}</div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={
                        cliente.estado === 'validado' ? 'default' :
                        cliente.estado === 'pendiente' ? 'secondary' :
                        'destructive'
                      }>
                        {cliente.estado === 'validado' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {cliente.estado === 'pendiente' && <Clock className="w-3 h-3 mr-1" />}
                        {cliente.estado === 'rechazado' && <XCircle className="w-3 h-3 mr-1" />}
                        {cliente.estado === 'validado' && 'Validado'}
                        {cliente.estado === 'pendiente' && 'Pendiente'}
                        {cliente.estado === 'rechazado' && 'Rechazado'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{cliente.fechaRegistro}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedCliente(cliente);
                            setView('detail');
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {cliente.estado === 'pendiente' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedCliente(cliente);
                              setShowValidationDialog(true);
                            }}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showValidationDialog} onOpenChange={setShowValidationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Validar Cliente</DialogTitle>
            <DialogDescription>
              Revise la documentación y valide al cliente
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-sm text-slate-900 mb-2">{selectedCliente?.razonSocial}</div>
              <div className="text-xs text-slate-600">RUC: {selectedCliente?.ruc}</div>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Aprobar
              </Button>
              <Button variant="destructive" className="flex-1">
                <XCircle className="w-4 h-4 mr-2" />
                Rechazar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
