import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { User } from '../../App';
import { Plus, Search, Eye, Package, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

interface ContenedoresModuleProps {
  user: User;
}

interface Contenedor {
  id: string;
  codigo: string;
  tipo: string;
  estado: 'disponible' | 'asignado' | 'transito' | 'puerto' | 'almacen' | 'mantenimiento';
  ubicacion: string;
  operacion?: string;
  cliente?: string;
  ultimoMovimiento: string;
  historial: { fecha: string; evento: string; ubicacion: string }[];
}

const contenedoresData: Contenedor[] = [
  {
    id: '1',
    codigo: 'MSCU1234567',
    tipo: '40ft Standard',
    estado: 'transito',
    ubicacion: 'Océano Pacífico',
    operacion: 'OP-2025-001',
    cliente: 'Importadora Global S.A.C.',
    ultimoMovimiento: '2025-03-18',
    historial: [
      { fecha: '2025-03-10', evento: 'Asignado a operación', ubicacion: 'Shanghai' },
      { fecha: '2025-03-12', evento: 'Cargado en buque', ubicacion: 'Shanghai Port' },
      { fecha: '2025-03-13', evento: 'Zarpe', ubicacion: 'Shanghai' },
    ],
  },
  {
    id: '2',
    codigo: 'HLCU9876543',
    tipo: '20ft Standard',
    estado: 'puerto',
    ubicacion: 'Puerto del Callao',
    operacion: 'OP-2025-002',
    cliente: 'Textiles Andinos S.A.',
    ultimoMovimiento: '2025-03-19',
    historial: [
      { fecha: '2025-03-08', evento: 'Asignado a operación', ubicacion: 'Mumbai' },
      { fecha: '2025-03-11', evento: 'Cargado en buque', ubicacion: 'Mumbai Port' },
      { fecha: '2025-03-19', evento: 'Arribó a puerto', ubicacion: 'Callao' },
    ],
  },
  {
    id: '3',
    codigo: 'TEMU5555666',
    tipo: '40ft High Cube',
    estado: 'disponible',
    ubicacion: 'Terminal Muelle Sur - Callao',
    ultimoMovimiento: '2025-03-15',
    historial: [
      { fecha: '2025-03-10', evento: 'Descargado', ubicacion: 'Callao' },
      { fecha: '2025-03-12', evento: 'Inspección', ubicacion: 'Terminal Callao' },
      { fecha: '2025-03-15', evento: 'Disponible', ubicacion: 'Terminal Muelle Sur' },
    ],
  },
  {
    id: '4',
    codigo: 'CMAU7777888',
    tipo: '40ft Refrigerado',
    estado: 'almacen',
    ubicacion: 'Almacén Frigorífico A1',
    operacion: 'OP-2025-015',
    cliente: 'Pesquera del Sur S.A.',
    ultimoMovimiento: '2025-03-17',
    historial: [
      { fecha: '2025-03-14', evento: 'Arribó a puerto', ubicacion: 'Callao' },
      { fecha: '2025-03-15', evento: 'Inspección SENASA', ubicacion: 'Puerto Callao' },
      { fecha: '2025-03-17', evento: 'Traslado a almacén', ubicacion: 'Almacén A1' },
    ],
  },
  {
    id: '5',
    codigo: 'WHLU3333444',
    tipo: '20ft Standard',
    estado: 'mantenimiento',
    ubicacion: 'Taller de Reparaciones',
    ultimoMovimiento: '2025-03-16',
    historial: [
      { fecha: '2025-03-12', evento: 'Detectado daño', ubicacion: 'Callao' },
      { fecha: '2025-03-16', evento: 'Ingreso a mantenimiento', ubicacion: 'Taller' },
    ],
  },
];

export function ContenedoresModule({ user }: ContenedoresModuleProps) {
  const [contenedores, setContenedores] = useState<Contenedor[]>(contenedoresData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContenedor, setSelectedContenedor] = useState<Contenedor | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showMovimiento, setShowMovimiento] = useState(false);

  const filteredContenedores = contenedores.filter(c =>
    c.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.cliente && c.cliente.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-slate-900 mb-2">Gestión de Contenedores</h1>
          <p className="text-slate-600">Control de inventario y movimientos</p>
        </div>
        <Dialog open={showMovimiento} onOpenChange={setShowMovimiento}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Registrar Movimiento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Registrar Movimiento de Contenedor</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm text-slate-700 mb-2 block">Código de Contenedor</label>
                <Input placeholder="MSCU1234567" className="font-mono" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-700 mb-2 block">Tipo de Movimiento</label>
                  <select className="w-full border rounded-md p-2">
                    <option>Entrada</option>
                    <option>Salida</option>
                    <option>Traslado</option>
                    <option>Asignación</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-700 mb-2 block">Ubicación</label>
                  <Input placeholder="Terminal, Almacén, etc." />
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-700 mb-2 block">Operación (opcional)</label>
                <select className="w-full border rounded-md p-2">
                  <option value="">Sin asignar</option>
                  <option>OP-2025-001</option>
                  <option>OP-2025-002</option>
                  <option>OP-2025-003</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-700 mb-2 block">Observaciones</label>
                <Input placeholder="Detalles del movimiento" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Registrar Movimiento
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setShowMovimiento(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Disponibles</div>
            <div className="text-2xl text-green-600">
              {contenedores.filter(c => c.estado === 'disponible').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Asignados</div>
            <div className="text-2xl text-blue-600">
              {contenedores.filter(c => c.estado === 'asignado').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">En Tránsito</div>
            <div className="text-2xl text-purple-600">
              {contenedores.filter(c => c.estado === 'transito').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">En Puerto</div>
            <div className="text-2xl text-orange-600">
              {contenedores.filter(c => c.estado === 'puerto').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Total</div>
            <div className="text-2xl text-slate-900">
              {contenedores.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Buscar por código, ubicación o cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Contenedores Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventario de Contenedores</CardTitle>
          <CardDescription>{filteredContenedores.length} contenedores encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-sm text-slate-600">Código</th>
                  <th className="text-left p-3 text-sm text-slate-600">Tipo</th>
                  <th className="text-left p-3 text-sm text-slate-600">Ubicación</th>
                  <th className="text-left p-3 text-sm text-slate-600">Operación</th>
                  <th className="text-left p-3 text-sm text-slate-600">Cliente</th>
                  <th className="text-left p-3 text-sm text-slate-600">Estado</th>
                  <th className="text-left p-3 text-sm text-slate-600">Último Movimiento</th>
                  <th className="text-left p-3 text-sm text-slate-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredContenedores.map((cont) => (
                  <tr key={cont.id} className="border-b hover:bg-slate-50">
                    <td className="p-3 text-sm font-mono">{cont.codigo}</td>
                    <td className="p-3 text-sm">{cont.tipo}</td>
                    <td className="p-3 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {cont.ubicacion}
                      </div>
                    </td>
                    <td className="p-3 text-sm">{cont.operacion || '-'}</td>
                    <td className="p-3 text-sm">{cont.cliente || '-'}</td>
                    <td className="p-3">
                      <Badge variant={
                        cont.estado === 'disponible' ? 'default' :
                        cont.estado === 'mantenimiento' ? 'destructive' :
                        'secondary'
                      }>
                        {cont.estado === 'disponible' ? 'Disponible' :
                         cont.estado === 'asignado' ? 'Asignado' :
                         cont.estado === 'transito' ? 'En Tránsito' :
                         cont.estado === 'puerto' ? 'En Puerto' :
                         cont.estado === 'almacen' ? 'En Almacén' :
                         'Mantenimiento'}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm">{cont.ultimoMovimiento}</td>
                    <td className="p-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedContenedor(cont);
                          setShowDetail(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalle del Contenedor</DialogTitle>
          </DialogHeader>
          {selectedContenedor && (
            <div className="space-y-6 mt-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl text-slate-900 font-mono">{selectedContenedor.codigo}</div>
                    <div className="text-sm text-slate-600">{selectedContenedor.tipo}</div>
                  </div>
                </div>
                <Badge variant="secondary">
                  {selectedContenedor.estado}
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Información Actual</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Ubicación:</span>
                      <span className="text-slate-900">{selectedContenedor.ubicacion}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Estado:</span>
                      <span className="text-slate-900">{selectedContenedor.estado}</span>
                    </div>
                    {selectedContenedor.operacion && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Operación:</span>
                        <span className="text-slate-900">{selectedContenedor.operacion}</span>
                      </div>
                    )}
                    {selectedContenedor.cliente && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Cliente:</span>
                        <span className="text-slate-900">{selectedContenedor.cliente}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-600">Último Movimiento:</span>
                      <span className="text-slate-900">{selectedContenedor.ultimoMovimiento}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Especificaciones</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Tipo:</span>
                      <span className="text-slate-900">{selectedContenedor.tipo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Código ISO:</span>
                      <span className="text-slate-900">22G1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Tara:</span>
                      <span className="text-slate-900">
                        {selectedContenedor.tipo.includes('20ft') ? '2,300 kg' : '3,900 kg'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Capacidad:</span>
                      <span className="text-slate-900">
                        {selectedContenedor.tipo.includes('20ft') ? '28,180 kg' : '28,600 kg'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Volumen:</span>
                      <span className="text-slate-900">
                        {selectedContenedor.tipo.includes('20ft') ? '33 m³' : 
                         selectedContenedor.tipo.includes('High Cube') ? '76 m³' : '67 m³'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Historial de Movimientos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedContenedor.historial.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                        <div className="flex-1">
                          <div className="text-sm text-slate-900">{item.evento}</div>
                          <div className="text-xs text-slate-600 mt-1">
                            {item.ubicacion} • {item.fecha}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button className="flex-1" variant="outline">
                  Registrar Movimiento
                </Button>
                <Button className="flex-1" variant="outline">
                  Descargar Reporte
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
