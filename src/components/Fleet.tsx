import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Fleet() {
  const vessels = [
    {
      name: "MV Pacific Explorer",
      type: "Portacontenedores",
      capacity: "18,000 TEU",
      status: "En servicio",
      image: "https://images.unsplash.com/photo-1673902219551-6e6de00d2e13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHNoaXAlMjBvY2VhbnxlbnwxfHx8fDE3NjMwNDQ0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      name: "MV Atlantic Star",
      type: "Granelero",
      capacity: "75,000 DWT",
      status: "En servicio",
      image: "https://images.unsplash.com/photo-1634638022229-5a52221886dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlwcGluZyUyMGxvZ2lzdGljcyUyMGhhcmJvcnxlbnwxfHx8fDE3NjMxMzc3MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      name: "MV Global Trader",
      type: "Multipropósito",
      capacity: "35,000 DWT",
      status: "En servicio",
      image: "https://images.unsplash.com/photo-1724364552281-dbed323c4633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWluZXIlMjBwb3J0JTIwYWVyaWFsfGVufDF8fHx8MTc2MzExODk0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <section id="flota" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-slate-900 mb-4">Nuestra Flota</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Contamos con una moderna flota de buques equipados con la última tecnología
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vessels.map((vessel, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition">
              <div className="relative h-48">
                <ImageWithFallback
                  src={vessel.image}
                  alt={vessel.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-slate-900">{vessel.name}</h3>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {vessel.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Tipo:</span>
                    <span>{vessel.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Capacidad:</span>
                    <span>{vessel.capacity}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
