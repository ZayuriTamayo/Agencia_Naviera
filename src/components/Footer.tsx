import { Anchor, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Anchor className="w-6 h-6" />
              <span className="text-lg">NaviTrans Global</span>
            </div>
            <p className="text-slate-400 text-sm">
              Líderes en soluciones de transporte marítimo internacional desde 1985.
            </p>
          </div>

          <div>
            <h4 className="mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition">Transporte Marítimo</a></li>
              <li><a href="#" className="hover:text-white transition">Logística Integral</a></li>
              <li><a href="#" className="hover:text-white transition">Contenedores</a></li>
              <li><a href="#" className="hover:text-white transition">Seguimiento</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition">Acerca de</a></li>
              <li><a href="#" className="hover:text-white transition">Nuestra Flota</a></li>
              <li><a href="#" className="hover:text-white transition">Carreras</a></li>
              <li><a href="#" className="hover:text-white transition">Noticias</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          <p>&copy; 2025 NaviTrans Global. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
