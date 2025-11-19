import { Ship, Globe, Package, Users } from "lucide-react";

export function Stats() {
  const stats = [
    { icon: Ship, value: "150+", label: "Buques en Flota" },
    { icon: Globe, value: "200+", label: "Puertos Conectados" },
    { icon: Package, value: "2M+", label: "Contenedores Anuales" },
    { icon: Users, value: "5000+", label: "Clientes Satisfechos" },
  ];

  return (
    <div className="bg-slate-900 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <Icon className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                <div className="text-white mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
