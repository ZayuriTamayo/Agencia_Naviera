import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export function Contact() {
  return (
    <section id="contacto" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-slate-900 mb-4">Contáctenos</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Nuestro equipo está listo para ayudarle con sus necesidades de transporte marítimo
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">
                        Nombre Completo
                      </label>
                      <Input placeholder="Juan Pérez" />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">
                        Email
                      </label>
                      <Input type="email" placeholder="juan@empresa.com" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">
                        Teléfono
                      </label>
                      <Input type="tel" placeholder="+1 234 567 890" />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">
                        Empresa
                      </label>
                      <Input placeholder="Nombre de la empresa" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">
                      Mensaje
                    </label>
                    <Textarea 
                      placeholder="Cuéntenos sobre sus necesidades de transporte..."
                      rows={6}
                    />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-slate-900 mb-1">Email</h3>
                    <p className="text-slate-600 text-sm">info@navitransglobal.com</p>
                    <p className="text-slate-600 text-sm">ventas@navitransglobal.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-slate-900 mb-1">Teléfono</h3>
                    <p className="text-slate-600 text-sm">+1 (555) 123-4567</p>
                    <p className="text-slate-600 text-sm">+1 (555) 987-6543</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-slate-900 mb-1">Oficina Principal</h3>
                    <p className="text-slate-600 text-sm">
                      1234 Harbor Boulevard<br />
                      Port City, PC 12345<br />
                      Estados Unidos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
