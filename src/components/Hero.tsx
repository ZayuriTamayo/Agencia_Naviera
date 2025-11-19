import { Button } from "./ui/button";
import { Anchor } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1673902219551-6e6de00d2e13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHNoaXAlMjBvY2VhbnxlbnwxfHx8fDE3NjMwNDQ0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Cargo ship at sea"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/50" />
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Anchor className="w-8 h-8" />
            <span className="text-xl">NaviTrans Global</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-white">
            <a href="#servicios" className="hover:text-blue-400 transition">Servicios</a>
            <a href="#flota" className="hover:text-blue-400 transition">Flota</a>
            <a href="#rutas" className="hover:text-blue-400 transition">Rutas</a>
            <a href="#contacto" className="hover:text-blue-400 transition">Contacto</a>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="text-white mb-6">
          Conectando el Mundo a Través de los Océanos
        </h1>
        <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
          Soluciones de transporte marítimo confiables y eficientes para su carga internacional
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Solicitar Cotización
          </Button>
          <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20">
            Ver Servicios
          </Button>
        </div>
      </div>
    </div>
  );
}
