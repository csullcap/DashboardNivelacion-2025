"use client";

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
import { Calendar, Search } from "lucide-react";
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

interface EscuelaSalon {
  escuela: string;
  area: string;
  salon: string;
  alumnos: number;
}

function App() {
  const [activeTab, setActiveTab] = useState("resumen");
  const [searchTerm, setSearchTerm] = useState("");

  // Datos de escuelas y salones con número de alumnos
  const escuelasSalones: EscuelaSalon[] = [
    {
      escuela: "ESCUELA PROFESIONAL DE BIOLOGÍA",
      area: "Biomédicas",
      salon: "B-101",
      alumnos: 89,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE CIENCIAS DE LA NUTRICIÓN",
      area: "Biomédicas",
      salon: "B-102",
      alumnos: 72,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE INGENIERÍA PESQUERA",
      area: "Biomédicas",
      salon: "B-103",
      alumnos: 86,
    },
    {
      escuela: "FACULTAD DE ENFERMERÍA",
      area: "Biomédicas",
      salon: "B-104",
      alumnos: 85,
    },
    {
      escuela: "FACULTAD DE AGRONOMÍA",
      area: "Biomédicas",
      salon: "B-105",
      alumnos: 144,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE INGENIERÍA DE MINAS",
      area: "Ingenierías",
      salon: "I-101",
      alumnos: 73,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE INGENIERÍA DE GEOFÍSICA",
      area: "Ingenierías",
      salon: "I-102",
      alumnos: 53,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE INGENIERÍA CIVIL",
      area: "Ingenierías",
      salon: "I-103",
      alumnos: 94,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE INGENIERÍA SANITARIA",
      area: "Ingenierías",
      salon: "I-104",
      alumnos: 32,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE INGENIERÍA DE METALÚRGICA",
      area: "Ingenierías",
      salon: "I-105",
      alumnos: 81,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE INGENIERÍA QUÍMICA",
      area: "Ingenierías",
      salon: "I-106",
      alumnos: 105,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE INGENIERÍA DE SISTEMAS",
      area: "Ingenierías",
      salon: "I-107",
      alumnos: 90,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE INGENIERÍA INDUSTRIAL",
      area: "Ingenierías",
      salon: "I-108",
      alumnos: 149,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE INGENIERÍA DE TELECOMUNICACIONES",
      area: "Ingenierías",
      salon: "I-109",
      alumnos: 61,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE CIENCIAS DE LA COMPUTACIÓN",
      area: "Ingenierías",
      salon: "I-110",
      alumnos: 48,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE INGENIERÍA AMBIENTAL",
      area: "Ingenierías",
      salon: "I-111",
      alumnos: 74,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE INGENIERÍA DE MATERIALES",
      area: "Ingenierías",
      salon: "I-112",
      alumnos: 80,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE INGENIERÍA ELECTRÓNICA",
      area: "Ingenierías",
      salon: "I-113",
      alumnos: 106,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE INGENIERIA DE INDUSTRIAS ALIMENTARIAS",
      area: "Ingenierías",
      salon: "I-114",
      alumnos: 116,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE LITERATURA Y LINGÜÍSTICA",
      area: "Sociales",
      salon: "S-101",
      alumnos: 85,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE BANCA Y SEGUROS",
      area: "Sociales",
      salon: "S-102",
      alumnos: 55,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE MARKETING",
      area: "Sociales",
      salon: "S-103",
      alumnos: 43,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE FINANZAS",
      area: "Sociales",
      salon: "S-104",
      alumnos: 74,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE TRABAJO SOCIAL",
      area: "Sociales",
      salon: "S-105",
      alumnos: 76,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE GESTIÓN",
      area: "Sociales",
      salon: "S-106",
      alumnos: 119,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE FILOSOFÍA",
      area: "Sociales",
      salon: "S-107",
      alumnos: 51,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE CONTABILIDAD",
      area: "Sociales",
      salon: "S-108",
      alumnos: 97,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE CONTABILIDAD",
      area: "Sociales",
      salon: "S-109",
      alumnos: 97,
    },
    {
      escuela: "FACULTAD DE CIENCIAS DE LA EDUCACIÓN",
      area: "Sociales",
      salon: "S-110",
      alumnos: 161,
    },
    {
      escuela: "FACULTAD DE CIENCIAS DE LA EDUCACIÓN",
      area: "Sociales",
      salon: "S-111",
      alumnos: 161,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE CIENCIAS DE LA COMUNICACIÓN",
      area: "Sociales",
      salon: "S-112",
      alumnos: 177,
    },
    {
      escuela: "FACULTAD DE DERECHO",
      area: "Sociales",
      salon: "S-113",
      alumnos: 173,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE RELACIONES INDUSTRIALES",
      area: "Sociales",
      salon: "S-114",
      alumnos: 123,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE RELACIONES INDUSTRIALES",
      area: "Sociales",
      salon: "S-115",
      alumnos: 123,
    },
    {
      escuela: "ESCUELA PROFESIONAL DE TURÍSMO Y HOTELERÍA",
      area: "Sociales",
      salon: "S-116",
      alumnos: 75,
    },
  ];

  // Calcular totales por área
  const calcularTotalesPorArea = () => {
    const biomedicas = escuelasSalones
      .filter((item) => item.area === "Biomédicas")
      .reduce((sum, item) => sum + item.alumnos, 0);

    const ingenierias = escuelasSalones
      .filter((item) => item.area === "Ingenierías")
      .reduce((sum, item) => sum + item.alumnos, 0);

    const sociales = escuelasSalones
      .filter((item) => item.area === "Sociales")
      .reduce((sum, item) => sum + item.alumnos, 0);

    return [
      {
        name: "Biomédicas",
        postulantes: biomedicas,
        color: "#4ade80",
        cursos: ["RV (Comprensión Lectora)", "Matemáticas"],
      },
      {
        name: "Ingenierías",
        postulantes: ingenierias,
        color: "#36a2eb",
        cursos: ["RV (Comprensión Lectora)", "Matemáticas"],
      },
      {
        name: "Sociales",
        postulantes: sociales,
        color: "#fdba74",
        cursos: ["RV (Comprensión Lectora)", "Matemáticas"],
      },
    ];
  };

  // Filtrar escuelas por término de búsqueda
  const filteredEscuelas = escuelasSalones.filter(
    (item) =>
      item.escuela.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.salon.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Datos base con estado para permitir modificación - ahora todas las áreas tienen los mismos cursos
  const [areaData] = useState<AreaData[]>(calcularTotalesPorArea());

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
  const [totalPostulantes, setTotalPostulantes] = useState(0);

  const ALUMNOS_POR_SALON = 100;

  // Recalcular datos cuando cambia el número de alumnos por salón o los postulantes por área
  useEffect(() => {
    // Calcular total de postulantes
    const newTotalPostulantes = areaData.reduce(
      (acc, curr) => acc + curr.postulantes,
      0
    );
    setTotalPostulantes(newTotalPostulantes);

    // Calcular salones por área
    const newSalonesData = areaData.map((area) => {
      const salones = Math.ceil(area.postulantes / ALUMNOS_POR_SALON);
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

    // Calcular horas por curso por área (10 horas por salón)
    const horasBiomedicas = newSalonesData[0].salones * 10;
    const horasIngenierias = newSalonesData[1].salones * 10;
    const horasSociales = newSalonesData[2].salones * 10;

    // Calcular horas por curso final
    const horasRV = horasBiomedicas + horasIngenierias + horasSociales;
    const horasMatematicas = horasBiomedicas + horasIngenierias + horasSociales;

    // Calcular total de horas
    const newTotalHoras = horasRV + horasMatematicas;

    // Datos para gráficos y tablas
    const newHorasData: HorasData[] = [
      { name: "RV (Comprensión Lectora)", horas: horasRV },
      { name: "Matemáticas", horas: horasMatematicas },
    ];

    // Calcular profesores necesarios (máximo 20 horas por profesor)
    const newProfesoresData: ProfesorData[] = newHorasData.map((curso) => ({
      name: curso.name,
      profesores: Math.ceil(curso.horas / 20),
    }));

    // Calcular costo de monitoreo (300 por monitor/salón)
    const newCostoMonitoreo = newTotalSalones * 300;

    // Calcular costo de dictado (40 soles por hora)
    const newCostoDictado = newTotalHoras * 40;

    // Calcular costo total
    const newCostoTotal = newCostoMonitoreo + newCostoDictado;

    // Datos para la tabla de horas por curso y área
    const newHorasPorCursoArea: HorasCursoArea[] = [
      {
        area: "Biomédicas",
        curso: "RV (Comprensión Lectora)",
        horas: horasBiomedicas,
      },
      { area: "Biomédicas", curso: "Matemáticas", horas: horasBiomedicas },
      {
        area: "Ingenierías",
        curso: "RV (Comprensión Lectora)",
        horas: horasIngenierias,
      },
      { area: "Ingenierías", curso: "Matemáticas", horas: horasIngenierias },
      {
        area: "Sociales",
        curso: "RV (Comprensión Lectora)",
        horas: horasSociales,
      },
      { area: "Sociales", curso: "Matemáticas", horas: horasSociales },
    ];

    // Datos para la tabla de horas finales por curso
    const newHorasPorCursoFinal: HorasCursoFinal[] = [
      { curso: "RV (Comprensión Lectora)", horas: horasRV },
      { curso: "Matemáticas", horas: horasMatematicas },
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
  }, [areaData]);

  // Calcular total de profesores
  const totalProfesores =
    profesoresData.reduce((acc, curr) => acc + curr.profesores, 0) || 0;

  // Calcular totales por área para mostrar en la pestaña de distribución
  const totalAlumnosBiomedicas = escuelasSalones
    .filter((item) => item.area === "Biomédicas")
    .reduce((sum, item) => sum + item.alumnos, 0);

  const totalAlumnosIngenierias = escuelasSalones
    .filter((item) => item.area === "Ingenierías")
    .reduce((sum, item) => sum + item.alumnos, 0);

  const totalAlumnosSociales = escuelasSalones
    .filter((item) => item.area === "Sociales")
    .reduce((sum, item) => sum + item.alumnos, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-3 py-3 sm:px-4 sm:py-4 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <div className="flex items-center space-x-2 sm:space-x-4 w-full">
            <img
              src={ceprunsaLogo || "/placeholder.svg"}
              alt="CEPRUNSA Logo"
              className="h-10 sm:h-12"
            />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
              Dashboard de Cursos de Nivelación
            </h1>
          </div>
          <img
            src={unsaLogo || "/placeholder.svg"}
            alt="UNSA Logo"
            className="h-12 sm:h-16"
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 py-4 sm:px-4 sm:py-6 lg:px-8">
        {/* Modificar la estructura de los tabs para asegurar que el contenido se muestre correctamente */}
        {/* Cambiar la estructura de Tabs para que sea más robusta */}
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white rounded-lg shadow-sm">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">
              Resumen de Postulantes por Área
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {areaData.map((area, index) => (
                <div
                  key={index}
                  className="p-3 rounded-md"
                  style={{ backgroundColor: `${area.color}20` }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: area.color }}
                    ></div>
                    <span className="font-medium">{area.name}</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {area.postulantes.toLocaleString()} postulantes
                  </p>
                  <p className="text-sm text-gray-600">
                    {Math.ceil(area.postulantes / 100)} salones (100
                    alumnos/salón)
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Tabs
          defaultValue="resumen"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-0 relative"
        >
          {/* Reemplazar la sección de tabs móvil con esta implementación: */}
          <div className="block sm:hidden mb-4">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="w-full p-3 bg-white border-none text-sm font-medium focus:ring-0 focus:outline-none"
              >
                <option value="resumen">Resumen</option>
                <option value="cursos">Cursos por Área</option>
                <option value="desglose">Desglose de Horas</option>
                <option value="costeo">Costeo</option>
                <option value="cronograma">Cronograma</option>
                <option value="distribucion">Distribución</option>
              </select>
            </div>
          </div>

          <div className="hidden sm:block bg-white rounded-t-lg shadow-sm relative z-10">
            <TabsList className="grid grid-cols-6 w-full bg-white p-0 rounded-t-lg">
              <TabsTrigger
                value="resumen"
                className="text-sm py-3 rounded-none data-[state=active]:bg-gray-100"
              >
                Resumen
              </TabsTrigger>
              <TabsTrigger
                value="cursos"
                className="text-sm py-3 rounded-none data-[state=active]:bg-gray-100"
              >
                Cursos por Área
              </TabsTrigger>
              <TabsTrigger
                value="desglose"
                className="text-sm py-3 rounded-none data-[state=active]:bg-gray-100"
              >
                Desglose de Horas
              </TabsTrigger>
              <TabsTrigger
                value="costeo"
                className="text-sm py-3 rounded-none data-[state=active]:bg-gray-100"
              >
                Costeo
              </TabsTrigger>
              <TabsTrigger
                value="cronograma"
                className="text-sm py-3 rounded-none data-[state=active]:bg-gray-100"
              >
                Cronograma
              </TabsTrigger>
              <TabsTrigger
                value="distribucion"
                className="text-sm py-3 rounded-none data-[state=active]:bg-gray-100"
              >
                Distribución
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Pestaña de Resumen */}
          {/* Asegurar que todos los TabsContent tengan el mismo z-index */}
          <TabsContent
            value="resumen"
            className="space-y-4 mt-0 bg-white p-4 sm:p-6 rounded-b-lg shadow-sm relative z-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-2xl">
                    Postulantes a Nivelar
                  </CardTitle>
                  <CardDescription>
                    Distribución por área académica
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="h-60 sm:h-80">
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
                          outerRadius={window.innerWidth < 640 ? 60 : 80}
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
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-2xl">
                    Horas por Curso
                  </CardTitle>
                  <CardDescription>Distribución total de horas</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="h-60 sm:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={horasData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis
                          type="category"
                          dataKey="name"
                          tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
                        />
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
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-2xl">
                  Resumen General
                </CardTitle>
                <CardDescription>
                  Datos principales del programa de nivelación
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg font-medium">
                      Total de Postulantes
                    </h3>
                    <p className="text-2xl sm:text-3xl font-bold">
                      {totalPostulantes.toLocaleString()}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Distribuidos en {totalSalones} salones
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg font-medium">
                      Total de Horas
                    </h3>
                    <p className="text-2xl sm:text-3xl font-bold">
                      {totalHoras.toLocaleString()}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Distribuidas en 2 cursos
                    </p>
                  </div>
                  <div className="bg-amber-50 p-3 sm:p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg font-medium">
                      Costo Total
                    </h3>
                    <p className="text-2xl sm:text-3xl font-bold">
                      S/ {costoTotal.toLocaleString()}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Incluye dictado y monitoreo
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pestaña de Cursos por Área */}
          <TabsContent
            value="cursos"
            className="space-y-4 mt-0 bg-white p-4 sm:p-6 rounded-b-lg shadow-sm relative z-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {salonesData.map((area, index) => (
                <Card key={index}>
                  <CardHeader
                    className={
                      area.name === "Biomédicas"
                        ? "bg-green-100 p-4 sm:p-6"
                        : area.name === "Ingenierías"
                        ? "bg-blue-50 p-4 sm:p-6"
                        : "bg-orange-100 p-4 sm:p-6"
                    }
                  >
                    <CardTitle className="text-lg sm:text-2xl">
                      {area.name}
                    </CardTitle>
                    <CardDescription>
                      20 horas de nivelación por salón
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm">
                              Curso
                            </TableHead>
                            <TableHead className="text-xs sm:text-sm">
                              Horas por Salón
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {area.cursos.map((curso, i) => (
                            <TableRow key={i}>
                              <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                                {curso}
                              </TableCell>
                              <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                                10
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="mt-4 p-2 sm:p-3 bg-gray-50 rounded-md">
                      <p className="font-medium text-xs sm:text-sm">
                        Postulantes: {area.postulantes.toLocaleString()}
                      </p>
                      <p className="font-medium text-xs sm:text-sm">
                        Salones: {area.salones}
                      </p>
                      <p className="font-medium text-xs sm:text-sm">
                        Horas totales: {(area.salones ?? 0) * 20}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-2xl">
                  Cálculo de Salones
                </CardTitle>
                <CardDescription>100 alumnos por salón</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm">
                          Área
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm">
                          Postulantes
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm">
                          Salones
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm">
                          Horas Totales
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {salonesData.map((area, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            {area.name}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            {area.postulantes.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            {area.salones}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            {((area.salones ?? 0) * 20).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="font-medium">
                        <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                          TOTAL
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                          {totalPostulantes.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                          {totalSalones}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                          {totalHoras.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pestaña de Desglose de Horas */}
          <TabsContent
            value="desglose"
            className="space-y-4 mt-0 bg-white p-4 sm:p-6 rounded-b-lg shadow-sm relative z-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-2xl">
                    Desglose por Curso y Área
                  </CardTitle>
                  <CardDescription>Horas totales por curso</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs sm:text-sm">
                            Área
                          </TableHead>
                          <TableHead className="text-xs sm:text-sm">
                            Curso
                          </TableHead>
                          <TableHead className="text-xs sm:text-sm">
                            Horas Totales
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {horasPorCursoArea.map((item, index) => (
                          <TableRow key={index}>
                            {index === 0 ||
                            horasPorCursoArea[index - 1].area !== item.area ? (
                              <TableCell
                                rowSpan={2}
                                className="font-medium text-xs sm:text-sm py-2 sm:py-4"
                              >
                                {item.area}
                              </TableCell>
                            ) : null}
                            <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                              {item.curso}
                            </TableCell>
                            <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                              {item.horas.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="font-medium bg-gray-50">
                          <TableCell
                            colSpan={2}
                            className="text-xs sm:text-sm py-2 sm:py-4"
                          >
                            Total
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            {totalHoras.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-2xl">
                    Desglose Final por Curso
                  </CardTitle>
                  <CardDescription>Horas finales por curso</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs sm:text-sm">
                            Curso
                          </TableHead>
                          <TableHead className="text-xs sm:text-sm">
                            Horas Finales
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {horasPorCursoFinal.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                              {item.curso}
                            </TableCell>
                            <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                              {item.horas.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="font-medium bg-gray-50">
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            Total
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            {totalHoras.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-2xl">
                  Visualización de Horas por Curso
                </CardTitle>
                <CardDescription>Distribución gráfica</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="h-60 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={horasData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
                      />
                      <YAxis
                        tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
                      />
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
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-2xl">
                  Profesores por Curso
                </CardTitle>
                <CardDescription>
                  Considerando máximo 20 horas por profesor
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm">
                          Curso
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm">
                          Horas Totales
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm">
                          Profesores Necesarios
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {profesoresData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            {item.name}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            {horasData[index].horas.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            {item.profesores}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="font-medium bg-gray-50">
                        <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                          Total
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                          {totalHoras.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                          {totalProfesores}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-md">
                  <h3 className="font-medium mb-2 text-sm sm:text-base">
                    Notas:
                  </h3>
                  <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-xs sm:text-sm">
                    <li>
                      Cada profesor puede dictar un máximo de 20 horas en total.
                    </li>
                    <li>
                      Se requieren {totalProfesores} profesores en total para
                      cubrir todas las horas.
                    </li>
                    <li>
                      Ambos cursos requieren la misma cantidad de profesores ya
                      que se imparten en todas las áreas.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4 sm:mt-6">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-2xl">
                  Gráfico de Profesores por Curso
                </CardTitle>
                <CardDescription>
                  Visualización de la distribución de profesores
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="h-60 sm:h-80 bg-gray-50 p-4 rounded-lg">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={profesoresData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
                      />
                      <YAxis
                        tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
                      />
                      <Tooltip
                        formatter={(value) => [`${value} profesores`, "Total"]}
                      />
                      <Legend />
                      <Bar dataKey="profesores" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pestaña de Costeo */}
          <TabsContent
            value="costeo"
            className="space-y-4 mt-0 bg-white p-4 sm:p-6 rounded-b-lg shadow-sm relative z-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-2xl">
                    Dictado de Clases
                  </CardTitle>
                  <CardDescription>Costos asociados al dictado</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium text-xs sm:text-sm py-2 sm:py-4">
                            Pago por Hora
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            S/ 40.00
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium text-xs sm:text-sm py-2 sm:py-4">
                            Horas Totales
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            {totalHoras.toLocaleString()}
                          </TableCell>
                        </TableRow>
                        <TableRow className="bg-blue-50">
                          <TableCell className="font-medium text-xs sm:text-sm py-2 sm:py-4">
                            Pago Total Dictado de clases
                          </TableCell>
                          <TableCell className="font-bold text-xs sm:text-sm py-2 sm:py-4">
                            S/ {costoDictado.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-2xl">
                    Personal de Monitoreo
                  </CardTitle>
                  <CardDescription>
                    Costos asociados al monitoreo
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium text-xs sm:text-sm py-2 sm:py-4">
                            Pago por Monitor
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            S/ 300.00
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium text-xs sm:text-sm py-2 sm:py-4">
                            # de Monitores
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            {totalSalones}
                          </TableCell>
                        </TableRow>
                        <TableRow className="bg-green-50">
                          <TableCell className="font-medium text-xs sm:text-sm py-2 sm:py-4">
                            Pago Total por Personal de Monitoreo
                          </TableCell>
                          <TableCell className="font-bold text-xs sm:text-sm py-2 sm:py-4">
                            S/ {costoMonitoreo.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-2xl">
                  Costo Total
                </CardTitle>
                <CardDescription>
                  Resumen de costos del programa
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-xs sm:text-sm py-2 sm:py-4">
                          Pago Total Dictado de clases
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                          S/ {costoDictado.toLocaleString()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-xs sm:text-sm py-2 sm:py-4">
                          Pago Total por Personal de Monitoreo
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                          S/ {costoMonitoreo.toLocaleString()}
                        </TableCell>
                      </TableRow>
                      <TableRow className="bg-amber-50">
                        <TableCell className="font-medium text-base sm:text-lg py-2 sm:py-4">
                          Costo Total
                        </TableCell>
                        <TableCell className="font-bold text-base sm:text-lg py-2 sm:py-4">
                          S/ {costoTotal.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 sm:mt-6">
                  <div className="p-3 sm:p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium mb-2 text-sm sm:text-base">
                      Distribución del Presupuesto:
                    </h3>
                    <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-xs sm:text-sm">
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
          <TabsContent
            value="cronograma"
            className="space-y-4 mt-0 bg-white p-4 sm:p-6 rounded-b-lg shadow-sm relative z-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-2xl">
                    Cronograma de Actividades
                  </CardTitle>
                  <CardDescription>Fechas importantes</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs sm:text-sm">
                            Actividad
                          </TableHead>
                          <TableHead className="text-xs sm:text-sm">
                            Inicio
                          </TableHead>
                          <TableHead className="text-xs sm:text-sm">
                            Fin
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            Preparativos
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            1/04/2025
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            3/04/2025
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            Clases
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            4/04/2025
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            15/04/2025
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            Prueba de Entrada
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            4/04/2025
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            -
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            Prueba de Salida
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            15/04/2025
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            -
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            Redacción de Informe de Nivelación
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            10/04/2025
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            18/04/2025
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            Entrega de Informe de Nivelación
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            19/04/2025
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            -
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-2xl">
                    Horarios de Clases
                  </CardTitle>
                  <CardDescription>
                    Distribución de cursos por horario
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="p-3 sm:p-4 bg-gray-100 rounded-md">
                      <h3 className="font-medium mb-2 text-sm sm:text-base">
                        Configuración A - Salones Grupo 1
                      </h3>
                      <div className="space-y-4">
                        <div className="p-3 sm:p-4 bg-purple-100 rounded-md">
                          <h4 className="font-medium mb-2 text-xs sm:text-sm">
                            RV (Comprensión Lectora)
                          </h4>
                          <div className="space-y-2">
                            <div className="flex items-center p-2 bg-white rounded-md">
                              <Calendar className="mr-2 h-5 w-5 text-purple-600" />
                              <span className="font-medium text-xs sm:text-sm">
                                16:00-16:40 (1)
                              </span>
                            </div>
                            <div className="flex items-center p-2 bg-white rounded-md">
                              <Calendar className="mr-2 h-5 w-5 text-purple-600" />
                              <span className="font-medium text-xs sm:text-sm">
                                16:45-17:25 (2)
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 sm:p-4 bg-teal-100 rounded-md">
                          <h4 className="font-medium mb-2 text-xs sm:text-sm">
                            Matemáticas
                          </h4>
                          <div className="space-y-2">
                            <div className="flex items-center p-2 bg-white rounded-md">
                              <Calendar className="mr-2 h-5 w-5 text-teal-600" />
                              <span className="font-medium text-xs sm:text-sm">
                                17:30-18:10 (3)
                              </span>
                            </div>
                            <div className="flex items-center p-2 bg-white rounded-md">
                              <Calendar className="mr-2 h-5 w-5 text-teal-600" />
                              <span className="font-medium text-xs sm:text-sm">
                                18:15-18:55 (4)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 sm:p-4 bg-gray-100 rounded-md">
                      <h3 className="font-medium mb-2 text-sm sm:text-base">
                        Configuración B - Salones Grupo 2
                      </h3>
                      <div className="space-y-4">
                        <div className="p-3 sm:p-4 bg-teal-100 rounded-md">
                          <h4 className="font-medium mb-2 text-xs sm:text-sm">
                            Matemáticas
                          </h4>
                          <div className="space-y-2">
                            <div className="flex items-center p-2 bg-white rounded-md">
                              <Calendar className="mr-2 h-5 w-5 text-teal-600" />
                              <span className="font-medium text-xs sm:text-sm">
                                16:00-16:40 (1)
                              </span>
                            </div>
                            <div className="flex items-center p-2 bg-white rounded-md">
                              <Calendar className="mr-2 h-5 w-5 text-teal-600" />
                              <span className="font-medium text-xs sm:text-sm">
                                16:45-17:25 (2)
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 sm:p-4 bg-purple-100 rounded-md">
                          <h4 className="font-medium mb-2 text-xs sm:text-sm">
                            RV (Comprensión Lectora)
                          </h4>
                          <div className="space-y-2">
                            <div className="flex items-center p-2 bg-white rounded-md">
                              <Calendar className="mr-2 h-5 w-5 text-purple-600" />
                              <span className="font-medium text-xs sm:text-sm">
                                17:30-18:10 (3)
                              </span>
                            </div>
                            <div className="flex items-center p-2 bg-white rounded-md">
                              <Calendar className="mr-2 h-5 w-5 text-purple-600" />
                              <span className="font-medium text-xs sm:text-sm">
                                18:15-18:55 (4)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 sm:p-4 bg-blue-50 rounded-md">
                      <h3 className="font-medium mb-2 text-sm sm:text-base">
                        Notas:
                      </h3>
                      <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-xs sm:text-sm">
                        <li>
                          Los salones se distribuyen en dos configuraciones para
                          optimizar recursos.
                        </li>
                        <li>
                          Cada salón recibe 2 horas académicas de cada curso.
                        </li>
                        <li>
                          La distribución permite una mejor asignación de
                          profesores y aulas.
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Pestaña de Distribución */}
          <TabsContent
            value="distribucion"
            className="space-y-4 mt-0 bg-white p-4 sm:p-6 rounded-b-lg shadow-sm relative z-0"
          >
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-2xl">
                  Distribución de Salones por Escuela
                </CardTitle>
                <CardDescription>
                  Asignación de salones para cada escuela profesional
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar por escuela, área o salón..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm">
                          Escuela Profesional
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm">
                          Área
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm">
                          Salón
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm">
                          Alumnos
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEscuelas.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            {item.escuela}
                          </TableCell>
                          <TableCell
                            className={`text-xs sm:text-sm py-2 sm:py-4 ${
                              item.area === "Biomédicas"
                                ? "text-green-600"
                                : item.area === "Ingenierías"
                                ? "text-blue-600"
                                : "text-orange-600"
                            }`}
                          >
                            {item.area}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4 font-medium">
                            {item.salon}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                            {item.alumnos}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-md">
                  <h3 className="font-medium mb-2 text-sm sm:text-base">
                    Resumen de Distribución:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-green-100 rounded-md">
                      <h4 className="font-medium text-xs sm:text-sm">
                        Biomédicas
                      </h4>
                      <p className="text-xs sm:text-sm">
                        {
                          escuelasSalones.filter((e) => e.area === "Biomédicas")
                            .length
                        }{" "}
                        escuelas
                      </p>
                      <p className="text-xs sm:text-sm">
                        {totalAlumnosBiomedicas} alumnos
                      </p>
                      <p className="text-xs sm:text-sm">
                        Salones: B-101 a B-105
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 bg-blue-100 rounded-md">
                      <h4 className="font-medium text-xs sm:text-sm">
                        Ingenierías
                      </h4>
                      <p className="text-xs sm:text-sm">
                        {
                          escuelasSalones.filter(
                            (e) => e.area === "Ingenierías"
                          ).length
                        }{" "}
                        escuelas
                      </p>
                      <p className="text-xs sm:text-sm">
                        {totalAlumnosIngenierias} alumnos
                      </p>
                      <p className="text-xs sm:text-sm">
                        Salones: I-101 a I-114
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 bg-orange-100 rounded-md">
                      <h4 className="font-medium text-xs sm:text-sm">
                        Sociales
                      </h4>
                      <p className="text-xs sm:text-sm">
                        {
                          escuelasSalones.filter((e) => e.area === "Sociales")
                            .length
                        }{" "}
                        escuelas
                      </p>
                      <p className="text-xs sm:text-sm">
                        {totalAlumnosSociales} alumnos
                      </p>
                      <p className="text-xs sm:text-sm">
                        Salones: S-101 a S-116
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-2xl">
                  Distribución de Horarios por Salón
                </CardTitle>
                <CardDescription>
                  Configuración de horarios para cada grupo de salones
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm">
                          Grupo
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm">
                          Salones
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm">
                          Horario
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="text-xs sm:text-sm py-2 sm:py-4 font-medium">
                          Grupo 1
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                          B-101, B-103, B-105, I-101, I-103, I-105, I-107,
                          I-109, I-111, I-113, S-101, S-103, S-105, S-107,
                          S-109, S-111, S-113, S-115
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                          <span className="block">
                            16:00-17:25: RV (Comprensión Lectora)
                          </span>
                          <span className="block">
                            17:30-18:55: Matemáticas
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-xs sm:text-sm py-2 sm:py-4 font-medium">
                          Grupo 2
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                          B-102, B-104, I-102, I-104, I-106, I-108, I-110,
                          I-112, I-114, S-102, S-104, S-106, S-108, S-110,
                          S-112, S-114, S-116
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm py-2 sm:py-4">
                          <span className="block">
                            16:00-17:25: Matemáticas
                          </span>
                          <span className="block">
                            17:30-18:55: RV (Comprensión Lectora)
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-md">
                  <h3 className="font-medium mb-2 text-sm sm:text-base">
                    Notas sobre la distribución:
                  </h3>
                  <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-xs sm:text-sm">
                    <li>
                      La distribución en dos grupos permite optimizar el uso de
                      aulas y profesores.
                    </li>
                    <li>
                      Cada salón recibe 2 horas académicas de cada curso (4
                      horas en total).
                    </li>
                    <li>
                      Los salones se han distribuido de manera equilibrada entre
                      los dos grupos.
                    </li>
                    <li>
                      Esta configuración permite que los profesores puedan rotar
                      entre diferentes salones.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white border-t py-3 sm:py-4 mt-6 sm:mt-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <p className="text-center text-xs sm:text-sm text-gray-500">
            © 2025 CEPRUNSA - Universidad Nacional de San Agustín de Arequipa
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
