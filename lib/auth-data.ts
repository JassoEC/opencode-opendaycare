export const loginDemo = {
  email: "caro@opendaycare.com",
};

export interface Invitation {
  childName: string;
  classroomName: string;
  code: string;
  email: string;
  avatar: { initial: string; bg: string; fg: string };
}

export const invitation: Invitation = {
  childName: "Mateo",
  classroomName: "Sala Soles",
  code: "7K4P9",
  email: "lucia.fernandez@gmail.com",
  avatar: { initial: "M", bg: "#A9D9E8", fg: "#1F7A93" },
};