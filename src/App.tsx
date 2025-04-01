"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Calendar } from "lucide-react";
import unsaLogo from "./assets/unsa_logo.png";
import ceprunsaLogo from "./assets/ceprunsa_logo.png";

// Primero, definamos las interfaces para nuestros tipos de datos
interface AreaData {
  name: string;
  postulantes: number;
  color: string;
  cursos: string[];
  salones?: number;
}

interface HorasData {
  name: string;
  horas: number;
}

interface ProfesorData {
  name: string;
  profesores: number;
}

interface PostulanteData {
  name: string;
  value: number;
  color: string;
}

interface HorasCursoArea {
  area: string;
  curso: string;
  horas: number;
}

interface HorasCursoFinal {
  curso: string;
  horas: number;
}

function App() {
  const [activeTab, setActiveTab] = useState("resumen");
  const [alumnosPorSalon, setAlumnosPorSalon] = useState(100);

  // Datos base
  const areaData: AreaData[] = [
    {
      name: "Biomédicas",
      postulantes: 621,
      color: "#4ade80",
      cursos: ["RV (Comprensión de Lectura)", "Biología", "Química"],
    },
    {
      name: "Ingenierías",
      postulantes: 1976,
      color: "#36a2eb",
      cursos: ["RV (Comprensión de Lectura)", "Matemática", "Física"],
    },
    {
      name: "Sociales",
      postulantes: 2922,
      color: "#fdba74",
      cursos: [
        "RV (Comprensión de Lectura)",
        "Lenguaje",
        "Razonamiento Matemático",
      ],
    },
  ];

  // Estados para datos calculados
  const [salonesData, setSalonesData] = useState<AreaData[]>([]);
  const [totalSalones, setTotalSalones] = useState(0);
  const [horasData, setHorasData] = useState<HorasData[]>([]);
  const [profesoresData, setProfesoresData] = useState<ProfesorData[]>([]);
  const [totalHoras, setTotalHoras] = useState(0);
  const [costoMonitoreo, setCostoMonitoreo] = useState(0);
  const [costoDictado, setCostoDictado] = useState(0);
  const [costoTotal, setCostoTotal] = useState(0);
  const [postulantesData, setPostulantesData] = useState<PostulanteData[]>([]);
  const [horasPorCursoArea, setHorasPorCursoArea] = useState<HorasCursoArea[]>(
    []
  );
  const [horasPorCursoFinal, setHorasPorCursoFinal] = useState<
    HorasCursoFinal[]
  >([]);

  // Recalcular datos cuando cambia el número de alumnos por salón
  useEffect(() => {
    // Calcular salones por área
    const newSalonesData = areaData.map((area) => {
      const salones = Math.ceil(area.postulantes / alumnosPorSalon);
      return {
        ...area,
        salones,
      };
    });

    // Calcular total de salones
    const newTotalSalones = newSalonesData.reduce(
      (acc, curr) => acc + curr.salones,
      0
    );

    // Calcular horas por curso por área (20 horas por salón)
    const horasBiomedicas = newSalonesData[0].salones * 20;
    const horasIngenierias = newSalonesData[1].salones * 20;
    const horasSociales = newSalonesData[2].salones * 20;

    // Calcular horas por curso final
    const horasRV = horasBiomedicas + horasIngenierias + horasSociales;
    const horasBiologia = horasBiomedicas;
    const horasQuimica = horasBiomedicas;
    const horasMatematica = horasIngenierias;
    const horasFisica = horasIngenierias;
    const horasLenguaje = horasSociales;
    const horasRazonamiento = horasSociales;

    // Calcular total de horas
    const newTotalHoras =
      horasRV +
      horasBiologia +
      horasQuimica +
      horasMatematica +
      horasFisica +
      horasLenguaje +
      horasRazonamiento;

    // Datos para gráficos y tablas
    const newHorasData: HorasData[] = [
      { name: "RV", horas: horasRV },
      { name: "Biología", horas: horasBiologia },
      { name: "Química", horas: horasQuimica },
      { name: "Matemática", horas: horasMatematica },
      { name: "Física", horas: horasFisica },
      { name: "Lenguaje", horas: horasLenguaje },
      { name: "Razonamiento Matemático", horas: horasRazonamiento },
    ];

    // Calcular profesores necesarios (máximo 60 horas por profesor)
    const newProfesoresData: ProfesorData[] = newHorasData.map((curso) => ({
      name: curso.name,
      profesores: Math.ceil(curso.horas / 60),
    }));

    // Calcular costo de monitoreo (500 por monitor/salón)
    const newCostoMonitoreo = newTotalSalones * 500;

    // Calcular costo de dictado (40 soles por hora)
    const newCostoDictado = newTotalHoras * 40;

    // Calcular costo total
    const newCostoTotal = newCostoMonitoreo + newCostoDictado;

    // Datos para la tabla de horas por curso y área
    const newHorasPorCursoArea: HorasCursoArea[] = [
      {
        area: "Biomédicas",
        curso: "RV (Comprensión de Lectura)",
        horas: horasBiomedicas,
      },
      { area: "Biomédicas", curso: "Biología", horas: horasBiologia },
      { area: "Biomédicas", curso: "Química", horas: horasQuimica },
      {
        area: "Ingenierías",
        curso: "RV (Comprensión de Lectura)",
        horas: horasIngenierias,
      },
      { area: "Ingenierías", curso: "Matemática", horas: horasMatematica },
      { area: "Ingenierías", curso: "Física", horas: horasFisica },
      {
        area: "Sociales",
        curso: "RV (Comprensión de Lectura)",
        horas: horasSociales,
      },
      { area: "Sociales", curso: "Lenguaje", horas: horasLenguaje },
      {
        area: "Sociales",
        curso: "Razonamiento Matemático",
        horas: horasRazonamiento,
      },
    ];

    // Datos para la tabla de horas finales por curso
    const newHorasPorCursoFinal: HorasCursoFinal[] = [
      { curso: "RV (Comprensión de Lectura)", horas: horasRV },
      { curso: "Biología", horas: horasBiologia },
      { curso: "Química", horas: horasQuimica },
      { curso: "Matemática", horas: horasMatematica },
      { curso: "Física", horas: horasFisica },
      { curso: "Lenguaje", horas: horasLenguaje },
      { curso: "Razonamiento Matemático", horas: horasRazonamiento },
    ];

    // Actualizar estados
    setSalonesData(newSalonesData);
    setTotalSalones(newTotalSalones);
    setHorasData(newHorasData);
    setProfesoresData(newProfesoresData);
    setTotalHoras(newTotalHoras);
    setCostoMonitoreo(newCostoMonitoreo);
    setCostoDictado(newCostoDictado);
    setCostoTotal(newCostoTotal);
    setHorasPorCursoArea(newHorasPorCursoArea);
    setHorasPorCursoFinal(newHorasPorCursoFinal);
    setPostulantesData(
      newSalonesData.map((area) => ({
        name: area.name,
        value: area.postulantes,
        color: area.color,
      }))
    );
  }, [alumnosPorSalon]);

  const handleAlumnosPorSalonChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number.parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setAlumnosPorSalon(value);
    }
  };

  // Calcular total de profesores
  const totalProfesores =
    profesoresData.reduce((acc, curr) => acc + curr.profesores, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src={ceprunsaLogo || "/placeholder.svg"}
              alt="CEPRUNSA Logo"
              className="h-12"
            />
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard de Cursos de Nivelación
            </h1>
          </div>
          <img
            src={unsaLogo || "/placeholder.svg"}
            alt="UNSA Logo"
            className="h-16"
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-64">
              <Label htmlFor="alumnosPorSalon">Alumnos por Salón:</Label>
              <Input
                id="alumnosPorSalon"
                type="number"
                value={alumnosPorSalon}
                onChange={handleAlumnosPorSalonChange}
                min="1"
                className="mt-1"
              />
            </div>
            <div className="text-sm text-gray-500">
              Modifique este valor para recalcular el número de salones, horas y
              costos asociados.
            </div>
          </div>
        </div>

        <Tabs
          defaultValue="resumen"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="resumen">Resumen</TabsTrigger>
            <TabsTrigger value="cursos">Cursos por Área</TabsTrigger>
            <TabsTrigger value="desglose">Desglose de Horas</TabsTrigger>
            <TabsTrigger value="costeo">Costeo</TabsTrigger>
            <TabsTrigger value="cronograma">Cronograma</TabsTrigger>
          </TabsList>

          {/* Pestaña de Resumen */}
          <TabsContent value="resumen" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Postulantes a Nivelar</CardTitle>
                  <CardDescription>
                    Distribución por área académica
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={postulantesData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {postulantesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [
                            `${value} postulantes`,
                            "Cantidad",
                          ]}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Horas por Curso</CardTitle>
                  <CardDescription>Distribución total de horas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={horasData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip
                          formatter={(value) => [`${value} horas`, "Total"]}
                        />
                        <Legend />
                        <Bar dataKey="horas" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Resumen General</CardTitle>
                <CardDescription>
                  Datos principales del programa de nivelación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium">
                      Total de Postulantes
                    </h3>
                    <p className="text-3xl font-bold">5,519</p>
                    <p className="text-sm text-gray-500">
                      Distribuidos en {totalSalones} salones
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium">Total de Horas</h3>
                    <p className="text-3xl font-bold">
                      {totalHoras.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Distribuidas en 7 cursos
                    </p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium">Costo Total</h3>
                    <p className="text-3xl font-bold">
                      S/ {costoTotal.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Incluye dictado y monitoreo
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pestaña de Cursos por Área */}
          <TabsContent value="cursos" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {salonesData.map((area, index) => (
                <Card key={index}>
                  <CardHeader
                    className={
                      area.name === "Biomédicas"
                        ? "bg-green-100"
                        : area.name === "Ingenierías"
                        ? "bg-blue-50"
                        : "bg-orange-100"
                    }
                  >
                    <CardTitle>{area.name}</CardTitle>
                    <CardDescription>
                      60 horas de nivelación por salón
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Curso</TableHead>
                          <TableHead>Horas por Salón</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {area.cursos.map((curso, i) => (
                          <TableRow key={i}>
                            <TableCell>{curso}</TableCell>
                            <TableCell>20</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="mt-4 p-3 bg-gray-50 rounded-md">
                      <p className="font-medium">
                        Postulantes: {area.postulantes.toLocaleString()}
                      </p>
                      <p className="font-medium">Salones: {area.salones}</p>
                      <p className="font-medium">
                        Horas totales: {(area.salones ?? 0) * 60}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Cálculo de Salones</CardTitle>
                <CardDescription>
                  {alumnosPorSalon} alumnos por salón
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Área</TableHead>
                      <TableHead>Postulantes</TableHead>
                      <TableHead>Salones</TableHead>
                      <TableHead>Horas Totales</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salonesData.map((area, index) => (
                      <TableRow key={index}>
                        <TableCell>{area.name}</TableCell>
                        <TableCell>
                          {area.postulantes.toLocaleString()}
                        </TableCell>
                        <TableCell>{area.salones}</TableCell>
                        <TableCell>
                          {((area.salones ?? 0) * 60).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="font-medium">
                      <TableCell>TOTAL</TableCell>
                      <TableCell>5,519</TableCell>
                      <TableCell>{totalSalones}</TableCell>
                      <TableCell>{totalHoras.toLocaleString()}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pestaña de Desglose de Horas */}
          <TabsContent value="desglose" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Desglose por Curso y Área</CardTitle>
                  <CardDescription>Horas totales por curso</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Área</TableHead>
                        <TableHead>Curso</TableHead>
                        <TableHead>Horas Totales</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {horasPorCursoArea.map((item, index) => (
                        <TableRow key={index}>
                          {index === 0 ||
                          horasPorCursoArea[index - 1].area !== item.area ? (
                            <TableCell rowSpan={3} className="font-medium">
                              {item.area}
                            </TableCell>
                          ) : null}
                          <TableCell>{item.curso}</TableCell>
                          <TableCell>{item.horas.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="font-medium bg-gray-50">
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell>{totalHoras.toLocaleString()}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Desglose Final por Curso</CardTitle>
                  <CardDescription>Horas finales por curso</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Curso</TableHead>
                        <TableHead>Horas Finales</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {horasPorCursoFinal.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.curso}</TableCell>
                          <TableCell>{item.horas.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="font-medium bg-gray-50">
                        <TableCell>Total</TableCell>
                        <TableCell>{totalHoras.toLocaleString()}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Visualización de Horas por Curso</CardTitle>
                <CardDescription>Distribución gráfica</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={horasData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`${value} horas`, "Total"]}
                      />
                      <Legend />
                      <Bar dataKey="horas" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profesores por Curso</CardTitle>
                <CardDescription>
                  Considerando máximo 60 horas por profesor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Curso</TableHead>
                      <TableHead>Horas Totales</TableHead>
                      <TableHead>Profesores Necesarios</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profesoresData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          {horasData[index].horas.toLocaleString()}
                        </TableCell>
                        <TableCell>{item.profesores}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="font-medium bg-gray-50">
                      <TableCell>Total</TableCell>
                      <TableCell>{totalHoras.toLocaleString()}</TableCell>
                      <TableCell>{totalProfesores}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="mt-6 p-4 bg-blue-50 rounded-md">
                  <h3 className="font-medium mb-2">Notas:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Cada profesor puede dictar un máximo de 60 horas en total.
                    </li>
                    <li>
                      Se requieren {totalProfesores} profesores en total para
                      cubrir todas las horas.
                    </li>
                    <li>
                      El curso de RV (Comprensión de Lectura) requiere la mayor
                      cantidad de profesores debido a que se imparte en todas
                      las áreas.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="h-80 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={profesoresData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`${value} profesores`, "Total"]}
                  />
                  <Legend />
                  <Bar dataKey="profesores" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          {/* Pestaña de Costeo */}
          <TabsContent value="costeo" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Dictado de Clases</CardTitle>
                  <CardDescription>Costos asociados al dictado</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Pago por Hora
                        </TableCell>
                        <TableCell>S/ 40.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Horas Totales
                        </TableCell>
                        <TableCell>{totalHoras.toLocaleString()}</TableCell>
                      </TableRow>
                      <TableRow className="bg-blue-50">
                        <TableCell className="font-medium">
                          Pago Total Dictado de clases
                        </TableCell>
                        <TableCell className="font-bold">
                          S/ {costoDictado.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Personal de Monitoreo</CardTitle>
                  <CardDescription>
                    Costos asociados al monitoreo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Pago por Monitor
                        </TableCell>
                        <TableCell>S/ 500.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          # de Monitores
                        </TableCell>
                        <TableCell>{totalSalones}</TableCell>
                      </TableRow>
                      <TableRow className="bg-green-50">
                        <TableCell className="font-medium">
                          Pago Total por Personal de Monitoreo
                        </TableCell>
                        <TableCell className="font-bold">
                          S/ {costoMonitoreo.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Costo Total</CardTitle>
                <CardDescription>
                  Resumen de costos del programa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Pago Total Dictado de clases
                      </TableCell>
                      <TableCell>S/ {costoDictado.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Pago Total por Personal de Monitoreo
                      </TableCell>
                      <TableCell>
                        S/ {costoMonitoreo.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-amber-50">
                      <TableCell className="font-medium text-lg">
                        Costo Total
                      </TableCell>
                      <TableCell className="font-bold text-lg">
                        S/ {costoTotal.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="mt-6">
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium mb-2">
                      Distribución del Presupuesto:
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Dictado de Clases:{" "}
                        <span className="font-bold">
                          S/ {costoDictado.toLocaleString()}
                        </span>{" "}
                        ({((costoDictado / costoTotal) * 100).toFixed(1)}%)
                      </li>
                      <li>
                        Personal de Monitoreo:{" "}
                        <span className="font-bold">
                          S/ {costoMonitoreo.toLocaleString()}
                        </span>{" "}
                        ({((costoMonitoreo / costoTotal) * 100).toFixed(1)}%)
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pestaña de Cronograma */}
          <TabsContent value="cronograma" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cronograma de Actividades</CardTitle>
                  <CardDescription>Fechas importantes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Actividad</TableHead>
                        <TableHead>Inicio</TableHead>
                        <TableHead>Fin</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Preparativos</TableCell>
                        <TableCell>1/04/2025</TableCell>
                        <TableCell>3/04/2025</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Clases</TableCell>
                        <TableCell>4/04/2025</TableCell>
                        <TableCell>15/04/2025</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Prueba de Entrada</TableCell>
                        <TableCell>4/04/2025</TableCell>
                        <TableCell>-</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Prueba de Salida</TableCell>
                        <TableCell>15/04/2025</TableCell>
                        <TableCell>-</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          Redacción de Informe de Nivelación
                        </TableCell>
                        <TableCell>10/04/2025</TableCell>
                        <TableCell>18/04/2025</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Entrega de Informe de Nivelación</TableCell>
                        <TableCell>19/04/2025</TableCell>
                        <TableCell>-</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Horarios de Clases</CardTitle>
                  <CardDescription>
                    Distribución de cursos por horario
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-3 bg-indigo-100 rounded-md">
                      <h3 className="font-medium mb-2">Primer Curso</h3>
                      <div className="space-y-2">
                        <div className="flex items-center p-2 bg-white rounded-md">
                          <Calendar className="mr-2 h-5 w-5 text-indigo-600" />
                          <span className="font-medium">16:00-16:40 (1)</span>
                        </div>
                        <div className="flex items-center p-2 bg-white rounded-md">
                          <Calendar className="mr-2 h-5 w-5 text-indigo-600" />
                          <span className="font-medium">16:45-17:25 (2)</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-rose-100 rounded-md">
                      <h3 className="font-medium mb-2">Segundo Curso</h3>
                      <div className="space-y-2">
                        <div className="flex items-center p-2 bg-white rounded-md">
                          <Calendar className="mr-2 h-5 w-5 text-rose-600" />
                          <span className="font-medium">17:30-18:10 (3)</span>
                        </div>
                        <div className="flex items-center p-2 bg-white rounded-md">
                          <Calendar className="mr-2 h-5 w-5 text-rose-600" />
                          <span className="font-medium">18:15-18:55 (4)</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-amber-100 rounded-md">
                      <h3 className="font-medium mb-2">Tercer Curso</h3>
                      <div className="space-y-2">
                        <div className="flex items-center p-2 bg-white rounded-md">
                          <Calendar className="mr-2 h-5 w-5 text-amber-600" />
                          <span className="font-medium">19:00-19:40 (5)</span>
                        </div>
                        <div className="flex items-center p-2 bg-white rounded-md">
                          <Calendar className="mr-2 h-5 w-5 text-amber-600" />
                          <span className="font-medium">19:45-20:25 (6)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white border-t py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            © 2025 CEPRUNSA - Universidad Nacional de San Agustín de Arequipa
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
