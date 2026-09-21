export type PostType = "achievement" | "activity" | "announcement";

export const postTypeLabels: Record<PostType, string> = {
  achievement: "Logro",
  activity: "Actividad",
  announcement: "Anuncio",
};

export type AvatarSpec =
  | { kind: "initial"; initial: string; bg: string; fg: string }
  | { kind: "icon"; icon: "megaphone"; bg: string; fg: string };

export interface Post {
  id: string;
  type: PostType;
  authorName: string;
  avatar: AvatarSpec;
  time: string;
  publishedBy: string;
  audience: string;
  body: string;
  photo?: { caption: string };
  hearts: number;
  comments: number;
}

export const currentUser = {
  name: "Caro Giménez",
  role: "Maestra · Soles",
  initial: "C",
};

export const classroom = {
  name: "Soles",
  childrenCount: 12,
  date: "martes 17 jun",
};

export const posts: Post[] = [
  {
    id: "logro-orinal",
    type: "achievement",
    authorName: "Mateo",
    avatar: { kind: "initial", initial: "M", bg: "#A9D9E8", fg: "#1F7A93" },
    time: "14:20",
    publishedBy: "publicado por vos",
    audience: "familia de Mateo",
    body: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    hearts: 3,
    comments: 1,
  },
  {
    id: "actividad-temperas",
    type: "activity",
    authorName: "Mateo",
    avatar: { kind: "initial", initial: "M", bg: "#A9D9E8", fg: "#1F7A93" },
    time: "09:40",
    publishedBy: "publicado por vos",
    audience: "familia de Mateo",
    body: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    photo: { caption: "Foto · pintando con témperas" },
    hearts: 5,
    comments: 2,
  },
  {
    id: "anuncio-parque",
    type: "announcement",
    authorName: "Anuncio general",
    avatar: {
      kind: "icon",
      icon: "megaphone",
      bg: "#CCD8F4",
      fg: "#4E72C8",
    },
    time: "07:50",
    publishedBy: "publicado por vos",
    audience: "toda la sala",
    body: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    hearts: 8,
    comments: 0,
  },
];