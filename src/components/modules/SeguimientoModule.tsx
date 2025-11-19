import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { User } from '../../App';
import { Search, MapPin, Ship, Package, FileText, Download } from 'lucide-react';

interface SeguimientoModuleProps {
  user: User;
}

interface Tracking {
  id: string;
  codigo: string;
  operacion: string;
  contenedor: string;
  origen: string;
  destino: string;
  buque: string;
  eta: string;
  estado: string;
  progreso: number;
  eventos: { fecha: string; hora: string; evento: string; ubicacion: string; estado: 'completado' | 'actual' | 'pendiente' }[];
  documentos: { tipo: string; disponible: boolean }[];
}

const trackingData: Tracking[] = [
  {
    id: '1',
    codigo: 'OP-2025-001',
    operacion: 'Importación',
    contenedor: 'MSCU1234567',
    origen: 'Shanghai, China',
    destino: 'Callao, Perú',
    buque: 'MV Pacific Navigator',
    eta: '2025-03-25',
    estado: 'En Tránsito',
    progreso: 60,
    eventos: [
      { fecha: '2025-03-10', hora: '09:00', evento: 'Reserva Confirmada', ubicacion: 'Shanghai', estado: 'completado' },
      { fecha: '2025-03-12', hora: '14:30', evento: 'Contenedor Cargado', ubicacion: 'Shanghai Port', estado: 'completado' },
      { fecha: '2025-03-13', hora: '08:00', evento: 'Buque Zarpa', ubicacion: 'Shanghai', estado: 'completado' },
      { fecha: '2025-03-18', hora: '12:00', evento: 'En Tránsito', ubicacion: 'Océano Pacífico', estado: 'actual' },
      { fecha: '2025-03-25', hora: '--:--', evento: 'Arribo Esperado', ubicacion: 'Callao', estado: 'pendiente' },
      { fecha: '2025-03-26', hora: '--:--', evento: 'Despacho Aduanero', ubicacion: 'Callao', estado: 'pendiente' },
      { fecha: '2025-03-28', hora: '--:--', evento: 'Disponible para Retiro', ubicacion: 'Almacén', estado: 'pendiente' },
    ],
    documentos: [
      { tipo: 'Bill of Lading', disponible: true },
      { tipo: 'Factura Comercial', disponible: true },
      { tipo: 'Lista de Empaque', disponible: true },
      { tipo: 'Certificado de Origen', disponible: true },
      { tipo: 'Declaración Aduanera', disponible: false },
      { tipo: 'Acta de Entrega', disponible: false },
    ],
  },
  {
    id: '2',
    codigo: 'OP-2025-002',
    operacion: 'Importación',
    contenedor: 'HLCU9876543',
    origen: 'Mumbai, India',
    destino: 'Callao, Perú',
    buque: 'MV Global Express',
    eta: '2025-03-20',
    estado: 'En Puerto',
    progreso: 80,
    eventos: [
      { fecha: '2025-03-08', hora: '10:00', evento: 'Reserva Confirmada', ubicacion: 'Mumbai', estado: 'completado' },
      { fecha: '2025-03-11', hora: '15:00', evento: 'Contenedor Cargado', ubicacion: 'Mumbai Port', estado: 'completado' },
      { fecha: '2025-03-12', hora: '07:00', evento: 'Buque Zarpa', ubicacion: 'Mumbai', estado: 'completado' },
      { fecha: '2025-03-19', hora: '16:30', evento: 'Arribo a Puerto', ubicacion: 'Callao', estado: 'completado' },
      { fecha: '2025-03-20', hora: '09:00', evento: 'Despacho Aduanero', ubicacion: 'Callao', estado: 'actual' },
      { fecha: '2025-03-21', hora: '--:--', evento: 'Disponible para Retiro', ubicacion: 'Almacén', estado: 'pendiente' },
    ],
    documentos: [
      { tipo: 'Bill of Lading', disponible: true },
      { tipo: 'Factura Comercial', disponible: true },
      { tipo: 'Lista de Empaque', disponible: true },
      { tipo: 'Certificado de Origen', disponible: true },
      { tipo: 'Declaración Aduanera', disponible: true },
      { tipo: 'Acta de Entrega', disponible: false },
    ],
  },
];

export function SeguimientoModule({ user }: SeguimientoModuleProps) {
  const [trackings] = useState<Tracking[]>(trackingData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTracking, setSelectedTracking] = useState<Tracking | null>(trackings[0]);

  const filteredTrackings = trackings.filter(t =>
    t.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.contenedor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-slate-900 mb-2">Seguimiento de Envíos</h1>
          <p className="text-slate-600">Rastreo en tiempo real de sus operaciones</p>
        </div>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Buscar por código de operación o contenedor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Lista de Trackings */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Mis Envíos</CardTitle>
              <CardDescription>{filteredTrackings.length} envíos activos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredTrackings.map((tracking) => (
                <div
                  key={tracking.id}
                  className={`p-4 border rounded-lg cursor-pointer hover:bg-slate-50 transition ${
                    selectedTracking?.id === tracking.id ? 'bg-blue-50 border-blue-300' : ''
                  }`}
                  onClick={() => setSelectedTracking(tracking)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{tracking.codigo}</span>
                    <Badge variant="secondary">{tracking.estado}</Badge>
                  </div>
                  <div className="text-xs text-slate-600 mb-2">
                    <div className="flex items-center gap-1 mb-1">
                      <Package className="w-3 h-3" />
                      {tracking.contenedor}
                    </div>
                    <div>{tracking.origen} → {tracking.destino}</div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full transition-all"
                      style={{ width: `${tracking.progreso}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Detalle del Tracking */}
        <div className="lg:col-span-2">
          {selectedTracking && (
            <div className="space-y-6">
              {/* Header */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl text-slate-900 mb-1">{selectedTracking.codigo}</h2>
                      <p className="text-sm text-slate-600">{selectedTracking.operacion}</p>
                    </div>
                    <Badge variant="secondary" className="text-base px-4 py-2">
                      {selectedTracking.estado}
                    </Badge>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-slate-600 mb-2">
                      <span>Progreso del Envío</span>
                      <span>{selectedTracking.progreso}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${selectedTracking.progreso}%` }}
                      />
                    </div>
                  </div>

                  {/* Info Cards */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-600">Contenedor</div>
                        <div className="text-sm text-slate-900 font-mono">{selectedTracking.contenedor}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Ship className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-600">Buque</div>
                        <div className="text-sm text-slate-900">{selectedTracking.buque}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-600">Origen</div>
                        <div className="text-sm text-slate-900">{selectedTracking.origen}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-600">Destino</div>
                        <div className="text-sm text-slate-900">{selectedTracking.destino}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="text-xs text-slate-600 mb-1">Fecha estimada de arribo (ETA)</div>
                    <div className="text-lg text-blue-600">{selectedTracking.eta}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Línea de Tiempo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedTracking.eventos.map((evento, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            evento.estado === 'completado' ? 'bg-green-600' :
                            evento.estado === 'actual' ? 'bg-blue-600' :
                            'bg-slate-300'
                          }`}>
                            <MapPin className="w-5 h-5 text-white" />
                          </div>
                          {index < selectedTracking.eventos.length - 1 && (
                            <div className={`w-0.5 h-12 ${
                              evento.estado === 'completado' ? 'bg-green-600' : 'bg-slate-300'
                            }`} />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-start justify-between mb-1">
                            <div className={`text-sm ${
                              evento.estado === 'pendiente' ? 'text-slate-500' : 'text-slate-900'
                            }`}>
                              {evento.evento}
                            </div>
                            {evento.estado === 'actual' && (
                              <Badge variant="secondary" className="ml-2">Actual</Badge>
                            )}
                          </div>
                          <div className="text-xs text-slate-600">{evento.ubicacion}</div>
                          <div className="text-xs text-slate-500 mt-1">
                            {evento.fecha} {evento.hora}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Documentos */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Documentos</CardTitle>
                  <CardDescription>Descargue los documentos de su envío</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedTracking.documentos.map((doc, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 border rounded-lg ${
                          doc.disponible ? 'bg-white' : 'bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <FileText className={`w-4 h-4 ${
                            doc.disponible ? 'text-blue-600' : 'text-slate-400'
                          }`} />
                          <span className={`text-sm ${
                            doc.disponible ? 'text-slate-900' : 'text-slate-500'
                          }`}>
                            {doc.tipo}
                          </span>
                        </div>
                        {doc.disponible ? (
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Badge variant="outline">Pendiente</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
