import icono from "../assets/Users/ImgEscudo.png";
const users = [
  {
    avatarSrc: "/assets/icons/avatar.svg",
    fullName: "Nombre completo",
    email: "email@example.com",
    password: "Contraseña",
    role: "Rol",
    editIconSrc: "/assets/icons/pencil-square.svg",
    deleteIconSrc: "/assets/icons/trash3.svg",
  },

  {
    avatarSrc: "/assets/icons/avatar.svg",
    fullName: "Nombre completo",
    email: "email@example.com",
    password: "Contraseña",
    role: "Rol",
    editIconSrc: "/assets/icons/pencil-square.svg",
    deleteIconSrc: "/assets/icons/trash3.svg",
  },
  {
    avatarSrc: "/assets/icons/avatar.svg",
    fullName: "Nombre completo",
    email: "email@example.com",
    password: "Contraseña",
    role: "Rol",
    editIconSrc: "/assets/icons/pencil-square.svg",
    deleteIconSrc: "/assets/icons/trash3.svg",
  },
  {
    avatarSrc: "/assets/icons/avatar.svg",
    fullName: "Nombre completo",
    email: "email@example.com",
    password: "Contraseña",
    role: "Rol",
    editIconSrc: "/assets/icons/pencil-square.svg",
    deleteIconSrc: "/assets/icons/trash3.svg",
  },
];

const roles = [
  {
    avatarSrc: icono,
    fullName: "Admin/Gerente",
    email: "",
    password: "",
    permisos: ["App", "Empresas", "Rutas", "Vendedores"],
    editIconSrc: "/assets/icons/pencil-square.svg",
    deleteIconSrc: "/assets/icons/trash3.svg",
  },
  {
    avatarSrc: icono,
    fullName: "Vendedor",
    email: "",
    password: "",
    permisos: ["App"],
    editIconSrc: "/assets/icons/pencil-square.svg",
    deleteIconSrc: "/assets/icons/trash3.svg",
  },
  {
    avatarSrc: icono,
    fullName: "Taller",
    email: "",
    password: "",
    permisos: ["Productos"],
    editIconSrc: "/assets/icons/pencil-square.svg",
    deleteIconSrc: "/assets/icons/trash3.svg",
  },
];

export { users, roles };
