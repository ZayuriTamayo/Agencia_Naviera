import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Ship, Container, Truck, Clock } from "lucide-react";

export function Services() {
  const services = [
    {
      icon: Ship,
      title: "Transporte Marítimo",
      description: "Servicios de carga completa (FCL) y carga consolidada (LCL) a nivel mundial con las mejores tarifas del mercado.",
    },
    {
      icon: Container,
      title: "Contenedores Especializados",
      description: "Contenedores refrigerados, tanques y equipamiento especial para todo tipo de mercancías.",
    },
    {
      icon: Truck,
      title: "Logística Integral",
      description: "Servicio puerta a puerta con gestión de aduanas, almacenaje y distribución terrestre.",
    },
    {
      icon: Clock,
      title: "Seguimiento 24/7",
      description: "Rastreo en tiempo real de su carga con actualizaciones constantes y atención personalizada.",
    },
  ];

  return (
    <section id="servicios" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-slate-900 mb-4">Nuestros Servicios</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Ofrecemos soluciones completas de transporte marítimo adaptadas a las necesidades de su negocio
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition">
                <CardHeader>
                  <Icon className="w-12 h-12 text-blue-600 mb-4" />
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
