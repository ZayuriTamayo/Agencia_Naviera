import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { User } from '../../App';
import { Search, Eye, MapPin, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface OperacionesModuleProps {
  user: User;
}

interface Operacion {
  id: string;
  codigo: string;
  cliente: string;
  origen: string;
  destino: string;
  contenedor: string;
  buque: string;
  eta: string;
  estado: 'reservado' | 'embarcado' | 'transito' | 'arribado' | 'entregado';
  eventos: { fecha: string; evento: string; ubicacion: string }[];
  fechaInicio: string;
}

const operacionesData: Operacion[] = [
  {
    id: '1',
    codigo: 'OP-2025-001',
    cliente: 'Importadora Global S.A.C.',
    origen: 'Shanghai, China',
    destino: 'Callao, Perú',
    contenedor: 'MSCU1234567',
    buque: 'MV Pacific Navigator',
    eta: '2025-03-25',
    estado: 'transito',
    fechaInicio: '2025-03-10',
    eventos: [
      { fecha: '2025-03-10', evento: 'Reserva confirmada', ubicacion: 'Shanghai' },
      { fecha: '2025-03-12', evento: 'Contenedor cargado', ubicacion: 'Shanghai Port' },
      { fecha: '2025-03-13', evento: 'Buque zarpa', ubicacion: 'Shanghai' },
      { fecha: '2025-03-18', evento: 'En tránsito', ubicacion: 'Océano Pacífico' },
    ],
  },
  {
    id: '2',
    codigo: 'OP-2025-002',
    cliente: 'Textiles Andinos S.A.',
    origen: 'Mumbai, India',
    destino: 'Callao, Perú',
    contenedor: 'HLCU9876543',
    buque: 'MV Global Express',
    eta: '2025-03-20',
    estado: 'embarcado',
    fechaInicio: '2025-03-08',
    eventos: [
      { fecha: '2025-03-08', evento: 'Reserva confirmada', ubicacion: 'Mumbai' },
      { fecha: '2025-03-11', evento: 'Contenedor cargado', ubicacion: 'Mumbai Port' },
      { fecha: '2025-03-12', evento: 'Buque zarpa', ubicacion: 'Mumbai' },
    ],
  },
  {
    id: '3',
    codigo: 'OP-2025-003',
    cliente: 'Exportaciones del Pacífico E.I.R.L.',
    origen: 'Callao, Perú',
    destino: 'Los Angeles, USA',
    contenedor: 'TEMU5555666',
    buque: 'MV Atlantic Star',
    eta: '2025-03-28',
    estado: 'reservado',
    fechaInicio: '2025-03-14',
    eventos: [
      { fecha: '2025-03-14', evento: 'Reserva confirmada', ubicacion: 'Callao' },
    ],
  },
];

export function OperacionesModule({ user }: OperacionesModuleProps) {
  const [operaciones, setOperaciones] = useState<Operacion[]>(operacionesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOperacion, setSelectedOperacion] = useState<Operacion | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const filteredOperaciones = operaciones.filter(op =>
    op.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.contenedor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-slate-900 mb-2">Operaciones Logísticas</h1>
          <p className="text-slate-600">Gestione las operaciones de transporte</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Reservados</div>
            <div className="text-2xl text-blue-600">
              {operaciones.filter(o => o.estado === 'reservado').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Embarcados</div>
            <div className="text-2xl text-orange-600">
              {operaciones.filter(o => o.estado === 'embarcado').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">En Tránsito</div>
            <div className="text-2xl text-purple-600">
              {operaciones.filter(o => o.estado === 'transito').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Arribados</div>
            <div className="text-2xl text-green-600">
              {operaciones.filter(o => o.estado === 'arribado').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Total Activas</div>
            <div className="text-2xl text-slate-900">
              {operaciones.length}
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
              placeholder="Buscar por código, cliente o contenedor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Operaciones Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Operaciones</CardTitle>
          <CardDescription>{filteredOperaciones.length} operaciones encontradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-sm text-slate-600">Código</th>
                  <th className="text-left p-3 text-sm text-slate-600">Cliente</th>
                  <th className="text-left p-3 text-sm text-slate-600">Ruta</th>
                  <th className="text-left p-3 text-sm text-slate-600">Contenedor</th>
                  <th className="text-left p-3 text-sm text-slate-600">Buque</th>
                  <th className="text-left p-3 text-sm text-slate-600">ETA</th>
                  <th className="text-left p-3 text-sm text-slate-600">Estado</th>
                  <th className="text-left p-3 text-sm text-slate-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredOperaciones.map((op) => (
                  <tr key={op.id} className="border-b hover:bg-slate-50">
                    <td className="p-3 text-sm">{op.codigo}</td>
                    <td className="p-3 text-sm">{op.cliente}</td>
                    <td className="p-3 text-sm">
                      <div>{op.origen}</div>
                      <div className="text-xs text-slate-500">→ {op.destino}</div>
                    </td>
                    <td className="p-3 text-sm font-mono">{op.contenedor}</td>
                    <td className="p-3 text-sm">{op.buque}</td>
                    <td className="p-3 text-sm">{op.eta}</td>
                    <td className="p-3">
                      <Badge variant={
                        op.estado === 'entregado' ? 'default' :
                        op.estado === 'arribado' ? 'default' :
                        op.estado === 'transito' ? 'secondary' :
                        'outline'
                      }>
                        {op.estado === 'reservado' ? 'Reservado' :
                         op.estado === 'embarcado' ? 'Embarcado' :
                         op.estado === 'transito' ? 'En Tránsito' :
                         op.estado === 'arribado' ? 'Arribado' :
                         'Entregado'}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedOperacion(op);
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
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Detalle de Operación - Tracking</DialogTitle>
          </DialogHeader>
          {selectedOperacion && (
            <div className="space-y-6 mt-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <div className="text-2xl text-slate-900">{selectedOperacion.codigo}</div>
                  <div className="text-sm text-slate-600">{selectedOperacion.cliente}</div>
                </div>
                <Badge variant="secondary">
                  {selectedOperacion.estado}
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Información de la Operación</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Contenedor:</span>
                      <span className="text-slate-900 font-mono">{selectedOperacion.contenedor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Buque:</span>
                      <span className="text-slate-900">{selectedOperacion.buque}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Origen:</span>
                      <span className="text-slate-900">{selectedOperacion.origen}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Destino:</span>
                      <span className="text-slate-900">{selectedOperacion.destino}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">ETA:</span>
                      <span className="text-slate-900">{selectedOperacion.eta}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Estado Actual</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-slate-900">
                          {selectedOperacion.eventos[selectedOperacion.eventos.length - 1].evento}
                        </div>
                        <div className="text-sm text-slate-600">
                          {selectedOperacion.eventos[selectedOperacion.eventos.length - 1].ubicacion}
                        </div>
                        <div className="text-xs text-slate-500">
                          {selectedOperacion.eventos[selectedOperacion.eventos.length - 1].fecha}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Línea de Tiempo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedOperacion.eventos.map((evento, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            index === selectedOperacion.eventos.length - 1
                              ? 'bg-blue-600'
                              : 'bg-green-600'
                          }`}>
                            {index === selectedOperacion.eventos.length - 1 ? (
                              <Clock className="w-5 h-5 text-white" />
                            ) : (
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            )}
                          </div>
                          {index < selectedOperacion.eventos.length - 1 && (
                            <div className="w-0.5 h-16 bg-slate-200" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="text-slate-900">{evento.evento}</div>
                          <div className="text-sm text-slate-600 mt-1">{evento.ubicacion}</div>
                          <div className="text-xs text-slate-500 mt-1">{evento.fecha}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button className="flex-1" variant="outline">
                  Actualizar Estado
                </Button>
                <Button className="flex-1" variant="outline">
                  Descargar Documentos
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Notificar Cliente
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
