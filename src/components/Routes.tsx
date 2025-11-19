import { Card, CardContent } from "./ui/card";
import { ArrowRight, MapPin } from "lucide-react";

export function Routes() {
  const routes = [
    {
      from: "Asia-Pacífico",
      to: "América del Norte",
      duration: "14-18 días",
      frequency: "Semanal",
    },
    {
      from: "Europa",
      to: "América del Sur",
      duration: "18-22 días",
      frequency: "Quincenal",
    },
    {
      from: "Medio Oriente",
      to: "Asia",
      duration: "10-12 días",
      frequency: "Semanal",
    },
    {
      from: "África",
      to: "Europa",
      duration: "8-10 días",
      frequency: "Semanal",
    },
    {
      from: "América del Norte",
      to: "Europa",
      duration: "12-15 días",
      frequency: "Bi-semanal",
    },
    {
      from: "Asia",
      to: "América del Sur",
      duration: "25-30 días",
      frequency: "Quincenal",
    },
  ];

  return (
    <section id="rutas" className="py-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-slate-900 mb-4">Rutas Principales</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Conectamos los principales puertos del mundo con servicios regulares y confiables
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route, index) => (
            <Card key={index} className="hover:shadow-lg transition">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2 flex-1">
                    <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-slate-900">{route.from}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  <div className="flex items-center gap-2 flex-1">
                    <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-slate-900">{route.to}</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Duración:</span>
                    <span>{route.duration}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Frecuencia:</span>
                    <span>{route.frequency}</span>
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
