import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { User } from '../../App';
import { Search, Eye, Calendar, CheckCircle2, FileSignature, Truck } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Textarea } from '../ui/textarea';

interface EntregasModuleProps {
  user: User;
}

interface Entrega {
  id: string;
  codigo: string;
  operacion: string;
  contenedor: string;
  cliente: string;
  mercancia: string;
  cantidad: string;
  peso: string;
  direccion: string;
  fechaSolicitud: string;
  fechaProgramada?: string;
  horaProgramada?: string;
  estado: 'solicitada' | 'programada' | 'en_transito' | 'entregada' | 'rechazada';
  observaciones?: string;
}

const entregasData: Entrega[] = [
  {
    id: '1',
    codigo: 'ENT-2025-001',
    operacion: 'OP-2025-001',
    contenedor: 'MSCU1234567',
    cliente: 'Importadora Global S.A.C.',
    mercancia: 'Textiles y confecciones',
    cantidad: '22,000 kg',
    peso: '22 ton',
    direccion: 'Av. Industrial 1234, San Juan de Lurigancho, Lima',
    fechaSolicitud: '2025-03-20',
    fechaProgramada: '2025-03-28',
    horaProgramada: '10:00 - 14:00',
    estado: 'programada',
    observaciones: 'Requiere montacarga para descarga',
  },
  {
    id: '2',
    codigo: 'ENT-2025-002',
    operacion: 'OP-2025-002',
    contenedor: 'HLCU9876543',
    cliente: 'Textiles Andinos S.A.',
    mercancia: 'Telas de algodón',
    cantidad: '5,000 kg',
    peso: '5 ton',
    direccion: 'Parque Industrial Arequipa, Lote 45, Arequipa',
    fechaSolicitud: '2025-03-21',
    estado: 'solicitada',
  },
  {
    id: '3',
    codigo: 'ENT-2025-003',
    operacion: 'OP-2025-015',
    contenedor: 'CMAU7777888',
    cliente: 'Pesquera del Sur S.A.',
    mercancia: 'Productos refrigerados',
    cantidad: '18,000 kg',
    peso: '18 ton',
    direccion: 'Av. Pesquera km 12, Pisco, Ica',
    fechaSolicitud: '2025-03-18',
    fechaProgramada: '2025-03-22',
    horaProgramada: '08:00 - 12:00',
    estado: 'entregada',
    observaciones: 'Entrega realizada sin novedad. Firmado por: Juan Pérez (Almacén)',
  },
];

export function EntregasModule({ user }: EntregasModuleProps) {
  const [entregas, setEntregas] = useState<Entrega[]>(entregasData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntrega, setSelectedEntrega] = useState<Entrega | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showProgramar, setShowProgramar] = useState(false);

  const filteredEntregas = entregas.filter(e =>
    e.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.operacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProgramar = (entregaId: string) => {
    setEntregas(entregas.map(e =>
      e.id === entregaId ? {
        ...e,
        estado: 'programada' as const,
        fechaProgramada: '2025-03-30',
        horaProgramada: '10:00 - 14:00',
      } : e
    ));
    setShowProgramar(false);
  };

  const handleEntregada = (entregaId: string) => {
    setEntregas(entregas.map(e =>
      e.id === entregaId ? {
        ...e,
        estado: 'entregada' as const,
        observaciones: 'Entrega completada exitosamente',
      } : e
    ));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-slate-900 mb-2">Gestión de Entregas</h1>
          <p className="text-slate-600">Administre las solicitudes de entrega</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Solicitadas</div>
            <div className="text-2xl text-orange-600">
              {entregas.filter(e => e.estado === 'solicitada').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Programadas</div>
            <div className="text-2xl text-blue-600">
              {entregas.filter(e => e.estado === 'programada').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">En Tránsito</div>
            <div className="text-2xl text-purple-600">
              {entregas.filter(e => e.estado === 'en_transito').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Entregadas</div>
            <div className="text-2xl text-green-600">
              {entregas.filter(e => e.estado === 'entregada').length}
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
              placeholder="Buscar por código, operación o cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Entregas Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Entregas</CardTitle>
          <CardDescription>{filteredEntregas.length} entregas encontradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-sm text-slate-600">Código</th>
                  <th className="text-left p-3 text-sm text-slate-600">Operación</th>
                  <th className="text-left p-3 text-sm text-slate-600">Cliente</th>
                  <th className="text-left p-3 text-sm text-slate-600">Mercancía</th>
                  <th className="text-left p-3 text-sm text-slate-600">Fecha Programada</th>
                  <th className="text-left p-3 text-sm text-slate-600">Estado</th>
                  <th className="text-left p-3 text-sm text-slate-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntregas.map((entrega) => (
                  <tr key={entrega.id} className="border-b hover:bg-slate-50">
                    <td className="p-3 text-sm">{entrega.codigo}</td>
                    <td className="p-3 text-sm">{entrega.operacion}</td>
                    <td className="p-3 text-sm">{entrega.cliente}</td>
                    <td className="p-3 text-sm">
                      <div>{entrega.mercancia}</div>
                      <div className="text-xs text-slate-500">{entrega.cantidad}</div>
                    </td>
                    <td className="p-3 text-sm">
                      {entrega.fechaProgramada ? (
                        <div>
                          <div>{entrega.fechaProgramada}</div>
                          <div className="text-xs text-slate-500">{entrega.horaProgramada}</div>
                        </div>
                      ) : (
                        <span className="text-slate-400">Sin programar</span>
                      )}
                    </td>
                    <td className="p-3">
                      <Badge variant={
                        entrega.estado === 'entregada' ? 'default' :
                        entrega.estado === 'rechazada' ? 'destructive' :
                        entrega.estado === 'en_transito' ? 'secondary' :
                        'outline'
                      }>
                        {entrega.estado === 'solicitada' ? 'Solicitada' :
                         entrega.estado === 'programada' ? 'Programada' :
                         entrega.estado === 'en_transito' ? 'En Tránsito' :
                         entrega.estado === 'entregada' ? 'Entregada' :
                         'Rechazada'}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedEntrega(entrega);
                            setShowDetail(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {entrega.estado === 'solicitada' && user.role !== 'cliente' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedEntrega(entrega);
                              setShowProgramar(true);
                            }}
                          >
                            <Calendar className="w-4 h-4 text-blue-600" />
                          </Button>
                        )}
                        {entrega.estado === 'programada' && user.role === 'almacen' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEntregada(entrega.id)}
                          >
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
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

      {/* Detail Dialog */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalle de Entrega</DialogTitle>
          </DialogHeader>
          {selectedEntrega && (
            <div className="space-y-6 mt-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <div className="text-2xl text-slate-900">{selectedEntrega.codigo}</div>
                  <div className="text-sm text-slate-600">Solicitud: {selectedEntrega.fechaSolicitud}</div>
                </div>
                <Badge variant="secondary">
                  {selectedEntrega.estado}
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Información de la Operación</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Operación:</span>
                      <span className="text-slate-900">{selectedEntrega.operacion}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Contenedor:</span>
                      <span className="text-slate-900 font-mono">{selectedEntrega.contenedor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Cliente:</span>
                      <span className="text-slate-900">{selectedEntrega.cliente}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Detalles de la Mercancía</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Tipo:</span>
                      <span className="text-slate-900">{selectedEntrega.mercancia}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Cantidad:</span>
                      <span className="text-slate-900">{selectedEntrega.cantidad}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Peso Total:</span>
                      <span className="text-slate-900">{selectedEntrega.peso}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Dirección de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-900">{selectedEntrega.direccion}</p>
                </CardContent>
              </Card>

              {selectedEntrega.fechaProgramada && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm text-slate-900 mb-1">Entrega Programada</div>
                        <div className="text-sm text-slate-600">
                          Fecha: {selectedEntrega.fechaProgramada}
                        </div>
                        <div className="text-sm text-slate-600">
                          Hora: {selectedEntrega.horaProgramada}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {selectedEntrega.observaciones && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Observaciones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">{selectedEntrega.observaciones}</p>
                  </CardContent>
                </Card>
              )}

              {selectedEntrega.estado === 'entregada' && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm text-slate-900 mb-1">Entrega Completada</div>
                        <div className="text-xs text-slate-600">
                          Firma digital registrada • Acta de entrega disponible
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-3">
                {selectedEntrega.estado === 'programada' && user.role === 'almacen' && (
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    <FileSignature className="w-4 h-4 mr-2" />
                    Confirmar Entrega
                  </Button>
                )}
                <Button className="flex-1" variant="outline">
                  Descargar Acta de Entrega
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Programar Dialog */}
      <Dialog open={showProgramar} onOpenChange={setShowProgramar}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Programar Entrega</DialogTitle>
          </DialogHeader>
          {selectedEntrega && (
            <div className="space-y-4 mt-4">
              <Card className="bg-slate-50">
                <CardContent className="p-4">
                  <div className="text-sm text-slate-600 mb-1">Cliente</div>
                  <div className="text-slate-900">{selectedEntrega.cliente}</div>
                  <div className="text-sm text-slate-600 mt-2 mb-1">Mercancía</div>
                  <div className="text-slate-900">{selectedEntrega.mercancia} - {selectedEntrega.cantidad}</div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-700 mb-2 block">Fecha de Entrega</label>
                  <Input type="date" defaultValue="2025-03-30" />
                </div>
                <div>
                  <label className="text-sm text-slate-700 mb-2 block">Hora</label>
                  <select className="w-full border rounded-md p-2">
                    <option>08:00 - 12:00</option>
                    <option>10:00 - 14:00</option>
                    <option>14:00 - 18:00</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-700 mb-2 block">Vehículo/Transportista</label>
                <select className="w-full border rounded-md p-2">
                  <option>Camión Placa ABC-123</option>
                  <option>Camión Placa XYZ-789</option>
                  <option>Transporte Externo</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-slate-700 mb-2 block">Observaciones</label>
                <Textarea placeholder="Instrucciones especiales para la entrega..." rows={3} />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => selectedEntrega && handleProgramar(selectedEntrega.id)}
                >
                  Confirmar Programación
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setShowProgramar(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
