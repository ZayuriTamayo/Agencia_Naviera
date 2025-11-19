import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { User } from '../../App';
import { Search, Eye, Check, X, FileCheck, Calculator, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface AduanasModuleProps {
  user: User;
}

interface Despacho {
  id: string;
  codigo: string;
  operacion: string;
  cliente: string;
  tipoRegimen: string;
  valorFob: number;
  pesoNeto: number;
  partida: string;
  tributos: {
    advalorem: number;
    igv: number;
    ipm: number;
    total: number;
  };
  estado: 'validacion' | 'clasificado' | 'liquidado' | 'aceptado' | 'rechazado' | 'levante';
  fecha: string;
}

const despachosData: Despacho[] = [
  {
    id: '1',
    codigo: 'DAM-2025-001',
    operacion: 'OP-2025-001',
    cliente: 'Importadora Global S.A.C.',
    tipoRegimen: 'Importación Definitiva',
    valorFob: 45000,
    pesoNeto: 22000,
    partida: '6109.10.00.31',
    tributos: {
      advalorem: 2250,
      igv: 8505,
      ipm: 405,
      total: 11160,
    },
    estado: 'liquidado',
    fecha: '2025-03-15',
  },
  {
    id: '2',
    codigo: 'DAM-2025-002',
    operacion: 'OP-2025-002',
    cliente: 'Textiles Andinos S.A.',
    tipoRegimen: 'Importación Definitiva',
    valorFob: 28000,
    pesoNeto: 5000,
    partida: '5208.31.00.00',
    tributos: {
      advalorem: 1680,
      igv: 5342,
      ipm: 252,
      total: 7274,
    },
    estado: 'clasificado',
    fecha: '2025-03-12',
  },
  {
    id: '3',
    codigo: 'DAM-2025-003',
    operacion: 'OP-2025-003',
    cliente: 'Exportaciones del Pacífico E.I.R.L.',
    tipoRegimen: 'Exportación Definitiva',
    valorFob: 62000,
    pesoNeto: 18000,
    partida: '0306.17.00.00',
    tributos: {
      advalorem: 0,
      igv: 0,
      ipm: 0,
      total: 0,
    },
    estado: 'validacion',
    fecha: '2025-03-18',
  },
];

export function AduanasModule({ user }: AduanasModuleProps) {
  const [despachos, setDespachos] = useState<Despacho[]>(despachosData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDespacho, setSelectedDespacho] = useState<Despacho | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const filteredDespachos = despachos.filter(d =>
    d.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.operacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEstado = (despachoId: string, estado: Despacho['estado']) => {
    setDespachos(despachos.map(d =>
      d.id === despachoId ? { ...d, estado } : d
    ));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-slate-900 mb-2">Gestión Aduanera</h1>
          <p className="text-slate-600">Administre los despachos aduaneros</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">En Validación</div>
            <div className="text-2xl text-orange-600">
              {despachos.filter(d => d.estado === 'validacion').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Clasificados</div>
            <div className="text-2xl text-blue-600">
              {despachos.filter(d => d.estado === 'clasificado').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Aceptados</div>
            <div className="text-2xl text-green-600">
              {despachos.filter(d => d.estado === 'aceptado').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Tributos del Mes</div>
            <div className="text-2xl text-slate-900">
              ${despachos.reduce((sum, d) => sum + d.tributos.total, 0).toLocaleString()}
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
              placeholder="Buscar por código DAM, operación o cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Despachos Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Despachos Aduaneros</CardTitle>
          <CardDescription>{filteredDespachos.length} despachos encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-sm text-slate-600">Código DAM</th>
                  <th className="text-left p-3 text-sm text-slate-600">Operación</th>
                  <th className="text-left p-3 text-sm text-slate-600">Cliente</th>
                  <th className="text-left p-3 text-sm text-slate-600">Régimen</th>
                  <th className="text-left p-3 text-sm text-slate-600">Valor FOB</th>
                  <th className="text-left p-3 text-sm text-slate-600">Tributos</th>
                  <th className="text-left p-3 text-sm text-slate-600">Estado</th>
                  <th className="text-left p-3 text-sm text-slate-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredDespachos.map((despacho) => (
                  <tr key={despacho.id} className="border-b hover:bg-slate-50">
                    <td className="p-3 text-sm">{despacho.codigo}</td>
                    <td className="p-3 text-sm">{despacho.operacion}</td>
                    <td className="p-3 text-sm">{despacho.cliente}</td>
                    <td className="p-3 text-sm">{despacho.tipoRegimen}</td>
                    <td className="p-3 text-sm">${despacho.valorFob.toLocaleString()}</td>
                    <td className="p-3 text-sm text-green-600">
                      ${despacho.tributos.total.toLocaleString()}
                    </td>
                    <td className="p-3">
                      <Badge variant={
                        despacho.estado === 'aceptado' || despacho.estado === 'levante' ? 'default' :
                        despacho.estado === 'rechazado' ? 'destructive' :
                        'secondary'
                      }>
                        {despacho.estado === 'validacion' ? 'Validación' :
                         despacho.estado === 'clasificado' ? 'Clasificado' :
                         despacho.estado === 'liquidado' ? 'Liquidado' :
                         despacho.estado === 'aceptado' ? 'Aceptado' :
                         despacho.estado === 'levante' ? 'Levante' :
                         'Rechazado'}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedDespacho(despacho);
                            setShowDetail(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {despacho.estado === 'liquidado' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEstado(despacho.id, 'aceptado')}
                            >
                              <Check className="w-4 h-4 text-green-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEstado(despacho.id, 'rechazado')}
                            >
                              <X className="w-4 h-4 text-red-600" />
                            </Button>
                          </>
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
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Detalle del Despacho Aduanero</DialogTitle>
          </DialogHeader>
          {selectedDespacho && (
            <div className="space-y-6 mt-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <div className="text-2xl text-slate-900">{selectedDespacho.codigo}</div>
                  <div className="text-sm text-slate-600">{selectedDespacho.fecha}</div>
                </div>
                <Badge variant="secondary">
                  {selectedDespacho.estado}
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileCheck className="w-5 h-5" />
                      Información del Despacho
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Operación:</span>
                      <span className="text-slate-900">{selectedDespacho.operacion}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Cliente:</span>
                      <span className="text-slate-900">{selectedDespacho.cliente}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Régimen:</span>
                      <span className="text-slate-900">{selectedDespacho.tipoRegimen}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Partida Arancelaria:</span>
                      <span className="text-slate-900 font-mono">{selectedDespacho.partida}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Valor FOB:</span>
                      <span className="text-slate-900">${selectedDespacho.valorFob.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Peso Neto:</span>
                      <span className="text-slate-900">{selectedDespacho.pesoNeto.toLocaleString()} kg</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Calculator className="w-5 h-5" />
                      Liquidación de Tributos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Ad Valorem (5%):</span>
                      <span className="text-slate-900">${selectedDespacho.tributos.advalorem.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">IGV (18%):</span>
                      <span className="text-slate-900">${selectedDespacho.tributos.igv.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">IPM (0.9%):</span>
                      <span className="text-slate-900">${selectedDespacho.tributos.ipm.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t">
                      <span className="text-slate-900">Total Tributos:</span>
                      <span className="text-xl text-green-600">${selectedDespacho.tributos.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-slate-900">Valor CIF:</span>
                      <span className="text-lg text-slate-900">
                        ${(selectedDespacho.valorFob + selectedDespacho.tributos.total).toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Documentos Aduaneros</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'Factura Comercial',
                      'Conocimiento de Embarque',
                      'Declaración de Valor',
                      'Certificado de Origen',
                      'Registro Sanitario',
                      'Lista de Empaque',
                    ].map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileCheck className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{doc}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Ver
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {selectedDespacho.estado === 'validacion' && (
                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm text-slate-900 mb-1">
                          Pendiente de Validación Documental
                        </div>
                        <div className="text-xs text-slate-600">
                          Se requiere revisión completa de la documentación antes de proceder con la clasificación arancelaria
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-3">
                <Button className="flex-1" variant="outline">
                  Descargar DAM
                </Button>
                <Button className="flex-1" variant="outline">
                  Imprimir Liquidación
                </Button>
                {selectedDespacho.estado === 'aceptado' && (
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    Autorizar Levante
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
