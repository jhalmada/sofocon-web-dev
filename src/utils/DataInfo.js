import icono from "../assets/users/ImgEscudo.png";
import avatarIcon from "../assets/icons/avatar.svg";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import houseIcon from "../assets/icons/house-door.svg";
import shopIcon from "../assets/icons/shop-window.svg";
import peopleIcon from "../assets/icons/people.svg";
import briefcaseIcon from "../assets/icons/briefcase.svg";
import compassIcon from "../assets/icons/compass.svg";
import boxIcon from "../assets/icons/box-seam.svg";
import briefActiveIcon from "../assets/icons/briefcase-fill.svg";
import compassActiveIcon from "../assets/icons/compass-fill.svg";
import boxActiveIcon from "../assets/icons/box-seam-fill.svg";
import houseActiveIcon from "../assets/icons/house-door-fill.svg";
import peopleActiveIcon from "../assets/icons/people-fill.svg";
import shopActiveIcon from "../assets/icons/shop-window-fill.svg";
import clipboardChek from "../assets/icons/clipboard-check.svg";
import clipboardChekActive from "../assets/icons/clipboard-checkActive.svg";

const users = [
  {
    avatarSrc: avatarIcon,
    fullName: "Nombre completo",
    email: "email@example.com",
    password: "Contraseña",
    role: "Rol",
    editIconSrc: editIcon,
    deleteIconSrc: deleteIcon,
  },

  {
    avatarSrc: avatarIcon,
    fullName: "Nombre completo",
    email: "email@example.com",
    password: "Contraseña",
    role: "Rol",
    editIconSrc: editIcon,
    deleteIconSrc: deleteIcon,
  },
  {
    avatarSrc: avatarIcon,
    fullName: "Nombre completo",
    email: "email@example.com",
    password: "Contraseña",
    role: "Rol",
    editIconSrc: editIcon,
    deleteIconSrc: deleteIcon,
  },
  {
    avatarSrc: avatarIcon,
    fullName: "Nombre completo",
    email: "email@example.com",
    password: "Contraseña",
    role: "Rol",
    editIconSrc: editIcon,
    deleteIconSrc: deleteIcon,
  },
];

const roles = [
  {
    avatarSrc: icono,
    fullName: "Admin/Gerente",
    email: "",
    password: "",
    permisos: ["App", "Empresas", "Rutas", "Vendedores"],
    editIconSrc: editIcon,
    deleteIconSrc: deleteIcon,
  },
  {
    avatarSrc: icono,
    fullName: "Vendedor",
    email: "",
    password: "",
    permisos: ["App"],
    editIconSrc: editIcon,
    deleteIconSrc: deleteIcon,
  },
  {
    avatarSrc: icono,
    fullName: "Taller",
    email: "",
    password: "",
    permisos: ["Productos"],
    editIconSrc: editIcon,
    deleteIconSrc: deleteIcon,
  },
  {
    avatarSrc: icono,
    fullName: "Administración",
    email: "",
    password: "",
    permisos: ["Productos"],
    editIconSrc: editIcon,
    deleteIconSrc: deleteIcon,
  },
];

const menuItems = [
  {
    name: "Inicio",
    path: "/inicio",
    icon: houseIcon,
    activeIcon: houseActiveIcon,
  },
  {
    name: "Empresas",
    path: "/inicio/empresas",
    icon: shopIcon,
    activeIcon: shopActiveIcon,
  },
  {
    name: "Usuarios",
    path: "/inicio/usuarios",
    icon: peopleIcon,
    activeIcon: peopleActiveIcon,
  },
  {
    name: "Vendedores",
    path: "/inicio/vendedores",
    icon: briefcaseIcon,
    activeIcon: briefActiveIcon,
  },
  {
    name: "Rutas",
    path: "/inicio/rutas",
    icon: compassIcon,
    activeIcon: compassActiveIcon,
  },
  {
    name: "Productos",
    path: "/inicio/productos",
    icon: boxIcon,
    activeIcon: boxActiveIcon,
  },
  {
    name: "Ordenes",
    path: "/inicio/ordenes",
    icon: clipboardChek,
    activeIcon: clipboardChekActive,
  },
];

export { users, roles, menuItems };
