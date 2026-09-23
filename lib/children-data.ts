export type ParentStatus = "active" | "pending";

export interface ParentLink {
  name: string;
  role: string;
  statusText: string;
  status: ParentStatus;
  avatar: { initial: string; bg: string; fg: string };
}

export interface Child {
  id: string;
  name: string;
  avatar: { initial: string; bg: string; fg: string };
  ageYears: number;
  birthDate: string;
  enrollment: string;
  allergyLabel?: string;
  allergyNotes?: string;
  parents: ParentLink[];
}

export const children: Child[] = [
  {
    id: "mateo-fernandez",
    name: "Mateo Fernández",
    avatar: { initial: "M", bg: "#A9D9E8", fg: "#1F7A93" },
    ageYears: 3,
    birthDate: "12 mar 2022",
    enrollment: "feb 2025",
    allergyLabel: "MANÍ",
    allergyNotes: "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.",
    parents: [
      {
        name: "Lucía Fernández",
        role: "Mamá",
        statusText: "activa",
        status: "active",
        avatar: { initial: "L", bg: "#C9B6E8", fg: "#fff" },
      },
      {
        name: "Diego Fernández",
        role: "Papá",
        statusText: "invitación enviada",
        status: "pending",
        avatar: { initial: "D", bg: "#A9C7E8", fg: "#fff" },
      },
    ],
  },
  {
    id: "sofia-mendez",
    name: "Sofía Méndez",
    avatar: { initial: "S", bg: "#F4B8CC", fg: "#C44A7A" },
    ageYears: 2,
    birthDate: "3 ago 2023",
    enrollment: "feb 2025",
    parents: [
      {
        name: "Valeria Ríos",
        role: "Mamá",
        statusText: "activa",
        status: "active",
        avatar: { initial: "V", bg: "#F4DC8E", fg: "#fff" },
      },
    ],
  },
  {
    id: "benjamin-ruiz",
    name: "Benjamín Ruiz",
    avatar: { initial: "B", bg: "#B9DEC4", fg: "#3E8B62" },
    ageYears: 3,
    birthDate: "28 ene 2022",
    enrollment: "feb 2025",
    parents: [
      {
        name: "Carla Ruiz",
        role: "Mamá",
        statusText: "activa",
        status: "active",
        avatar: { initial: "C", bg: "#B9DEC4", fg: "#fff" },
      },
      {
        name: "Ignacio Ruiz",
        role: "Papá",
        statusText: "activa",
        status: "active",
        avatar: { initial: "I", bg: "#A9D9E8", fg: "#fff" },
      },
    ],
  },
  {
    id: "valentina-soto",
    name: "Valentina Soto",
    avatar: { initial: "V", bg: "#F4DC8E", fg: "#9A7B1E" },
    ageYears: 2,
    birthDate: "15 nov 2023",
    enrollment: "mar 2025",
    parents: [],
  },
  {
    id: "tomas-diaz",
    name: "Tomás Díaz",
    avatar: { initial: "T", bg: "#C9B6E8", fg: "#7B5FC0" },
    ageYears: 3,
    birthDate: "6 jul 2022",
    enrollment: "feb 2025",
    allergyLabel: "LACTOSA",
    allergyNotes:
      "Alergia a la lactosa. Evitar lácteos y derivados. La sala guarda leche vegetal para las meriendas.",
    parents: [
      {
        name: "Andrea Díaz",
        role: "Mamá",
        statusText: "activa",
        status: "active",
        avatar: { initial: "A", bg: "#F4B8CC", fg: "#fff" },
      },
    ],
  },
  {
    id: "emma-castro",
    name: "Emma Castro",
    avatar: { initial: "E", bg: "#F4B8CC", fg: "#C44A7A" },
    ageYears: 2,
    birthDate: "22 abr 2023",
    enrollment: "feb 2025",
    parents: [
      {
        name: "Martín Castro",
        role: "Papá",
        statusText: "invitación enviada",
        status: "pending",
        avatar: { initial: "M", bg: "#A9C7E8", fg: "#fff" },
      },
    ],
  },
  {
    id: "lucas-romero",
    name: "Lucas Romero",
    avatar: { initial: "L", bg: "#A9D9E8", fg: "#1F7A93" },
    ageYears: 3,
    birthDate: "9 sep 2022",
    enrollment: "feb 2025",
    parents: [
      {
        name: "Federico Romero",
        role: "Papá",
        statusText: "activa",
        status: "active",
        avatar: { initial: "F", bg: "#C9B6E8", fg: "#fff" },
      },
    ],
  },
  {
    id: "olivia-vega",
    name: "Olivia Vega",
    avatar: { initial: "O", bg: "#B9DEC4", fg: "#3E8B62" },
    ageYears: 2,
    birthDate: "17 dic 2023",
    enrollment: "mar 2025",
    parents: [
      {
        name: "Renata Vega",
        role: "Mamá",
        statusText: "activa",
        status: "active",
        avatar: { initial: "R", bg: "#A9D9E8", fg: "#fff" },
      },
    ],
  },
];

export function parentSummary(count: number): string {
  if (count === 0) return "sin padres vinculados";
  if (count === 1) return "1 padre vinculado";
  return `${count} padres vinculados`;
}
