import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { User } from '../../App';
import { Plus, Search, Eye, Check, X, DollarSign, FileText, Send } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Textarea } from '../ui/textarea';

interface CotizacionesModuleProps {
  user: User;
}

interface Cotizacion {
  id: string;
  codigo: string;
  cliente: string;
  origen: string;
  destino: string;
  tipoCarga: string;
  peso: string;
  volumen: string;
  tarifaBase: number;
  total: number;
  estado: 'pendiente' | 'aprobada' | 'rechazada' | 'convertida';
  fecha: string;
}

const cotizacionesData: Cotizacion[] = [
  { id: '1', codigo: 'COT-2025-001', cliente: 'Importadora Global S.A.C.', origen: 'Shanghai, China', destino: 'Callao, Perú', tipoCarga: 'Contenedor 40ft', peso: '22,000 kg', volumen: '67.5 m³', tarifaBase: 2800, total: 3360, estado: 'pendiente', fecha: '2025-03-10' },
  { id: '2', codigo: 'COT-2025-002', cliente: 'Exportaciones del Pacífico E.I.R.L.', origen: 'Callao, Perú', destino: 'Los Angeles, USA', tipoCarga: 'Contenedor 20ft', peso: '18,000 kg', volumen: '33 m³', tarifaBase: 1800, total: 2160, estado: 'aprobada', fecha: '2025-03-08' },
  { id: '3', codigo: 'COT-2025-003', cliente: 'Textiles Andinos S.A.', origen: 'Mumbai, India', destino: 'Callao, Perú', tipoCarga: 'Carga Suelta (LCL)', peso: '5,000 kg', volumen: '12 m³', tarifaBase: 950, total: 1140, estado: 'convertida', fecha: '2025-03-05' },
  { id: '4', codigo: 'COT-2025-004', cliente: 'Minera del Sur S.A.A.', origen: 'Callao, Perú', destino: 'Rotterdam, Holanda', tipoCarga: 'Contenedor 40ft HC', peso: '26,000 kg', volumen: '76 m³', tarifaBase: 3200, total: 3840, estado: 'pendiente', fecha: '2025-03-12' },
];

export function CotizacionesModule({ user }: CotizacionesModuleProps) {
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>(cotizacionesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCotizacion, setSelectedCotizacion] = useState<Cotizacion | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const filteredCotizaciones = cotizaciones.filter(cot =>
    cot.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cot.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cot.origen.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEstado = (cotizacionId: string, estado: 'aprobada' | 'rechazada' | 'convertida') => {
    setCotizaciones(cotizaciones.map(c =>
      c.id === cotizacionId ? { ...c, estado } : c
    ));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-slate-900 mb-2">Gestión de Cotizaciones</h1>
          <p className="text-slate-600">Administre las solicitudes de cotización</p>
        </div>
        {user.role !== 'cliente' && (
          <Dialog open={showNewForm} onOpenChange={setShowNewForm}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Nueva Cotización
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Crear Nueva Cotización</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm text-slate-700 mb-2 block">Cliente</label>
                  <select className="w-full border rounded-md p-2">
                    <option>Seleccione un cliente</option>
                    <option>Importadora Global S.A.C.</option>
                    <option>Exportaciones del Pacífico E.I.R.L.</option>
                    <option>Textiles Andinos S.A.</option>
                  </select>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-700 mb-2 block">Puerto de Origen</label>
                    <Input placeholder="Ej: Shanghai, China" />
                  </div>
                  <div>
                    <label className="text-sm text-slate-700 mb-2 block">Puerto de Destino</label>
                    <Input placeholder="Ej: Callao, Perú" />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-slate-700 mb-2 block">Tipo de Carga</label>
                    <select className="w-full border rounded-md p-2">
                      <option>Contenedor 20ft</option>
                      <option>Contenedor 40ft</option>
                      <option>Contenedor 40ft HC</option>
                      <option>Carga Suelta (LCL)</option>
                      <option>Carga Refrigerada</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-slate-700 mb-2 block">Peso Total (kg)</label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div>
                    <label className="text-sm text-slate-700 mb-2 block">Volumen (m³)</label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-slate-700 mb-2 block">Descripción de la Carga</label>
                  <Textarea placeholder="Detalle el tipo de mercancía..." rows={3} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-700 mb-2 block">Incoterm</label>
                    <select className="w-full border rounded-md p-2">
                      <option>FOB</option>
                      <option>CIF</option>
                      <option>EXW</option>
                      <option>DDP</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-slate-700 mb-2 block">Tipo de Servicio</label>
                    <select className="w-full border rounded-md p-2">
                      <option>Puerta a Puerta</option>
                      <option>Puerto a Puerto</option>
                      <option>Puerto a Puerta</option>
                    </select>
                  </div>
                </div>
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-700">Tarifa Base:</span>
                      <span className="text-slate-900">$2,800.00</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-700">Recargos (20%):</span>
                      <span className="text-slate-900">$560.00</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-blue-300">
                      <span className="text-slate-900">Total:</span>
                      <span className="text-xl text-blue-600">$3,360.00</span>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Generar Cotización
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => setShowNewForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Pendientes</div>
            <div className="text-2xl text-slate-900">
              {cotizaciones.filter(c => c.estado === 'pendiente').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Aprobadas</div>
            <div className="text-2xl text-green-600">
              {cotizaciones.filter(c => c.estado === 'aprobada').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Convertidas</div>
            <div className="text-2xl text-blue-600">
              {cotizaciones.filter(c => c.estado === 'convertida').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Total Mes</div>
            <div className="text-2xl text-slate-900">
              ${cotizaciones.reduce((sum, c) => sum + c.total, 0).toLocaleString()}
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
              placeholder="Buscar por código, cliente u origen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Cotizaciones Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Cotizaciones</CardTitle>
          <CardDescription>{filteredCotizaciones.length} cotizaciones encontradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-sm text-slate-600">Código</th>
                  <th className="text-left p-3 text-sm text-slate-600">Cliente</th>
                  <th className="text-left p-3 text-sm text-slate-600">Ruta</th>
                  <th className="text-left p-3 text-sm text-slate-600">Tipo</th>
                  <th className="text-left p-3 text-sm text-slate-600">Total</th>
                  <th className="text-left p-3 text-sm text-slate-600">Estado</th>
                  <th className="text-left p-3 text-sm text-slate-600">Fecha</th>
                  <th className="text-left p-3 text-sm text-slate-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredCotizaciones.map((cot) => (
                  <tr key={cot.id} className="border-b hover:bg-slate-50">
                    <td className="p-3 text-sm">{cot.codigo}</td>
                    <td className="p-3 text-sm">{cot.cliente}</td>
                    <td className="p-3 text-sm">
                      <div>{cot.origen}</div>
                      <div className="text-xs text-slate-500">→ {cot.destino}</div>
                    </td>
                    <td className="p-3 text-sm">{cot.tipoCarga}</td>
                    <td className="p-3 text-sm">
                      <span className="text-green-600">${cot.total.toLocaleString()}</span>
                    </td>
                    <td className="p-3">
                      <Badge variant={
                        cot.estado === 'aprobada' ? 'default' :
                        cot.estado === 'convertida' ? 'default' :
                        cot.estado === 'pendiente' ? 'secondary' :
                        'destructive'
                      }>
                        {cot.estado === 'aprobada' ? 'Aprobada' :
                         cot.estado === 'convertida' ? 'Convertida' :
                         cot.estado === 'pendiente' ? 'Pendiente' :
                         'Rechazada'}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm">{cot.fecha}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedCotizacion(cot);
                            setShowDetail(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {cot.estado === 'pendiente' && user.role !== 'cliente' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEstado(cot.id, 'aprobada')}
                            >
                              <Check className="w-4 h-4 text-green-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEstado(cot.id, 'rechazada')}
                            >
                              <X className="w-4 h-4 text-red-600" />
                            </Button>
                          </>
                        )}
                        {cot.estado === 'aprobada' && user.role !== 'cliente' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEstado(cot.id, 'convertida')}
                          >
                            <FileText className="w-4 h-4 text-blue-600" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Send className="w-4 h-4" />
                        </Button>
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
            <DialogTitle>Detalle de Cotización</DialogTitle>
          </DialogHeader>
          {selectedCotizacion && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <div className="text-2xl text-slate-900">{selectedCotizacion.codigo}</div>
                  <div className="text-sm text-slate-600">{selectedCotizacion.fecha}</div>
                </div>
                <Badge variant={selectedCotizacion.estado === 'aprobada' ? 'default' : 'secondary'}>
                  {selectedCotizacion.estado}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-600">Cliente</label>
                  <p className="text-slate-900">{selectedCotizacion.cliente}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-600">Tipo de Carga</label>
                  <p className="text-slate-900">{selectedCotizacion.tipoCarga}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-600">Puerto de Origen</label>
                  <p className="text-slate-900">{selectedCotizacion.origen}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-600">Puerto de Destino</label>
                  <p className="text-slate-900">{selectedCotizacion.destino}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-600">Peso</label>
                  <p className="text-slate-900">{selectedCotizacion.peso}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-600">Volumen</label>
                  <p className="text-slate-900">{selectedCotizacion.volumen}</p>
                </div>
              </div>
              <Card className="bg-slate-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Tarifa Base:</span>
                    <span className="text-slate-900">${selectedCotizacion.tarifaBase.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Recargos:</span>
                    <span className="text-slate-900">${(selectedCotizacion.total - selectedCotizacion.tarifaBase).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-slate-900">Total:</span>
                    <span className="text-xl text-blue-600">${selectedCotizacion.total.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
              <div className="flex gap-3 pt-4">
                {selectedCotizacion.estado === 'aprobada' && user.role !== 'cliente' && (
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <FileText className="w-4 h-4 mr-2" />
                    Convertir a Orden de Servicio
                  </Button>
                )}
                <Button variant="outline" className="flex-1">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Descargar PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
