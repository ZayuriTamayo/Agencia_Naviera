import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { User } from '../../App';
import { Search, Eye, DollarSign, FileText, Download, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface FacturacionModuleProps {
  user: User;
}

interface Factura {
  id: string;
  codigo: string;
  operacion: string;
  cliente: string;
  conceptos: { descripcion: string; cantidad: number; precio: number }[];
  subtotal: number;
  igv: number;
  total: number;
  estado: 'pendiente' | 'emitida' | 'pagada' | 'vencida';
  fechaEmision: string;
  fechaVencimiento: string;
  fechaPago?: string;
  metodoPago?: string;
}

const facturasData: Factura[] = [
  {
    id: '1',
    codigo: 'FACT-2025-001',
    operacion: 'OP-2025-001',
    cliente: 'Importadora Global S.A.C.',
    conceptos: [
      { descripcion: 'Flete Marítimo Internacional', cantidad: 1, precio: 2800 },
      { descripcion: 'Gastos Portuarios', cantidad: 1, precio: 450 },
      { descripcion: 'Handling', cantidad: 1, precio: 120 },
    ],
    subtotal: 3370,
    igv: 606.60,
    total: 3976.60,
    estado: 'pagada',
    fechaEmision: '2025-03-15',
    fechaVencimiento: '2025-03-30',
    fechaPago: '2025-03-22',
    metodoPago: 'Transferencia Bancaria',
  },
  {
    id: '2',
    codigo: 'FACT-2025-002',
    operacion: 'OP-2025-002',
    cliente: 'Textiles Andinos S.A.',
    conceptos: [
      { descripcion: 'Flete Marítimo Internacional', cantidad: 1, precio: 1800 },
      { descripcion: 'Gastos Portuarios', cantidad: 1, precio: 280 },
      { descripcion: 'Seguro de Carga', cantidad: 1, precio: 150 },
    ],
    subtotal: 2230,
    igv: 401.40,
    total: 2631.40,
    estado: 'emitida',
    fechaEmision: '2025-03-18',
    fechaVencimiento: '2025-04-02',
  },
  {
    id: '3',
    codigo: 'FACT-2025-003',
    operacion: 'OP-2025-003',
    cliente: 'Exportaciones del Pacífico E.I.R.L.',
    conceptos: [
      { descripcion: 'Flete Marítimo Internacional', cantidad: 1, precio: 3200 },
      { descripcion: 'Gastos de Exportación', cantidad: 1, precio: 520 },
      { descripcion: 'Certificaciones', cantidad: 1, precio: 180 },
    ],
    subtotal: 3900,
    igv: 702,
    total: 4602,
    estado: 'pendiente',
    fechaEmision: '2025-03-20',
    fechaVencimiento: '2025-04-05',
  },
];

export function FacturacionModule({ user }: FacturacionModuleProps) {
  const [facturas, setFacturas] = useState<Factura[]>(facturasData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFactura, setSelectedFactura] = useState<Factura | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const filteredFacturas = facturas.filter(f =>
    f.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.operacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePago = (facturaId: string) => {
    setFacturas(facturas.map(f =>
      f.id === facturaId ? { 
        ...f, 
        estado: 'pagada' as const,
        fechaPago: new Date().toISOString().split('T')[0],
        metodoPago: 'Transferencia Bancaria'
      } : f
    ));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-slate-900 mb-2">Facturación y Pagos</h1>
          <p className="text-slate-600">Gestione las facturas y pagos</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Pendientes</div>
            <div className="text-2xl text-orange-600">
              {facturas.filter(f => f.estado === 'pendiente').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Emitidas</div>
            <div className="text-2xl text-blue-600">
              {facturas.filter(f => f.estado === 'emitida').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Pagadas</div>
            <div className="text-2xl text-green-600">
              {facturas.filter(f => f.estado === 'pagada').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Total del Mes</div>
            <div className="text-2xl text-slate-900">
              ${facturas.reduce((sum, f) => sum + f.total, 0).toLocaleString()}
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

      {/* Facturas Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Facturas</CardTitle>
          <CardDescription>{filteredFacturas.length} facturas encontradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-sm text-slate-600">Código</th>
                  <th className="text-left p-3 text-sm text-slate-600">Operación</th>
                  <th className="text-left p-3 text-sm text-slate-600">Cliente</th>
                  <th className="text-left p-3 text-sm text-slate-600">Subtotal</th>
                  <th className="text-left p-3 text-sm text-slate-600">IGV</th>
                  <th className="text-left p-3 text-sm text-slate-600">Total</th>
                  <th className="text-left p-3 text-sm text-slate-600">Vencimiento</th>
                  <th className="text-left p-3 text-sm text-slate-600">Estado</th>
                  <th className="text-left p-3 text-sm text-slate-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredFacturas.map((factura) => (
                  <tr key={factura.id} className="border-b hover:bg-slate-50">
                    <td className="p-3 text-sm">{factura.codigo}</td>
                    <td className="p-3 text-sm">{factura.operacion}</td>
                    <td className="p-3 text-sm">{factura.cliente}</td>
                    <td className="p-3 text-sm">${factura.subtotal.toLocaleString()}</td>
                    <td className="p-3 text-sm">${factura.igv.toLocaleString()}</td>
                    <td className="p-3 text-sm text-green-600">
                      ${factura.total.toLocaleString()}
                    </td>
                    <td className="p-3 text-sm">{factura.fechaVencimiento}</td>
                    <td className="p-3">
                      <Badge variant={
                        factura.estado === 'pagada' ? 'default' :
                        factura.estado === 'vencida' ? 'destructive' :
                        factura.estado === 'emitida' ? 'secondary' :
                        'outline'
                      }>
                        {factura.estado === 'pagada' ? 'Pagada' :
                         factura.estado === 'vencida' ? 'Vencida' :
                         factura.estado === 'emitida' ? 'Emitida' :
                         'Pendiente'}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedFactura(factura);
                            setShowDetail(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        {factura.estado === 'emitida' && user.role !== 'cliente' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePago(factura.id)}
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
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Detalle de Factura</DialogTitle>
          </DialogHeader>
          {selectedFactura && (
            <div className="space-y-6 mt-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <div className="text-2xl text-slate-900">{selectedFactura.codigo}</div>
                  <div className="text-sm text-slate-600">
                    Fecha de Emisión: {selectedFactura.fechaEmision}
                  </div>
                </div>
                <Badge variant={selectedFactura.estado === 'pagada' ? 'default' : 'secondary'}>
                  {selectedFactura.estado}
                </Badge>
              </div>

              {/* Client Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Información del Cliente</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Cliente:</span>
                    <div className="text-slate-900">{selectedFactura.cliente}</div>
                  </div>
                  <div>
                    <span className="text-slate-600">Operación:</span>
                    <div className="text-slate-900">{selectedFactura.operacion}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Conceptos */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Detalle de Conceptos</CardTitle>
                </CardHeader>
                <CardContent>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 text-sm text-slate-600">Descripción</th>
                        <th className="text-center p-2 text-sm text-slate-600">Cantidad</th>
                        <th className="text-right p-2 text-sm text-slate-600">Precio Unit.</th>
                        <th className="text-right p-2 text-sm text-slate-600">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedFactura.conceptos.map((concepto, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 text-sm">{concepto.descripcion}</td>
                          <td className="p-2 text-sm text-center">{concepto.cantidad}</td>
                          <td className="p-2 text-sm text-right">${concepto.precio.toLocaleString()}</td>
                          <td className="p-2 text-sm text-right">
                            ${(concepto.cantidad * concepto.precio).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              {/* Totales */}
              <Card className="bg-slate-50">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Subtotal:</span>
                      <span className="text-slate-900">${selectedFactura.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">IGV (18%):</span>
                      <span className="text-slate-900">${selectedFactura.igv.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-slate-900">Total:</span>
                      <span className="text-2xl text-green-600">
                        ${selectedFactura.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Info */}
              {selectedFactura.estado === 'pagada' && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-sm text-slate-900 mb-2">Factura Pagada</div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                          <div>
                            <span>Fecha de Pago:</span>
                            <div className="text-slate-900">{selectedFactura.fechaPago}</div>
                          </div>
                          <div>
                            <span>Método de Pago:</span>
                            <div className="text-slate-900">{selectedFactura.metodoPago}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Button className="flex-1" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar PDF
                </Button>
                <Button className="flex-1" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Descargar XML
                </Button>
                {selectedFactura.estado !== 'pagada' && user.role !== 'cliente' && (
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => handlePago(selectedFactura.id)}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Registrar Pago
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
