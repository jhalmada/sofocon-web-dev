import icono from "../assets/Users/ImgEscudo.png";
import avatarIcon from "../assets/Iconos/avatar.svg";
import editIcon from "../assets/Iconos/pencil-square.svg";
import deleteIcon from "../assets/Iconos/trash3.svg";
import houseIcon from "../assets/Iconos/house-door.svg";
import shopIcon from "../assets/Iconos/shop-window.svg";
import peopleIcon from "../assets/Iconos/people.svg";
import briefcaseIcon from "../assets/Iconos/briefcase.svg";
import compassIcon from "../assets/Iconos/compass.svg";
import boxIcon from "../assets/Iconos/box-seam.svg";
import briefActiveIcon from "../assets/Iconos/briefcase-fill.svg";
import compassActiveIcon from "../assets/Iconos/compass-fill.svg";
import boxActiveIcon from "../assets/Iconos/box-seam-fill.svg";
import houseActiveIcon from "../assets/Iconos/house-door-fill.svg";
import peopleActiveIcon from "../assets/Iconos/people-fill.svg";
import shopActiveIcon from "../assets/Iconos/shop-window-fill.svg";

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
    path: "/home",
    icon: houseIcon,
    activeIcon: houseActiveIcon,
  },
  {
    name: "Empresas",
    path: "/home/empresas",
    icon: shopIcon,
    activeIcon: shopActiveIcon,
  },
  {
    name: "Usuarios",
    path: "/home/usuarios",
    icon: peopleIcon,
    activeIcon: peopleActiveIcon,
  },
  {
    name: "Vendedores",
    path: "/home/vendedores",
    icon: briefcaseIcon,
    activeIcon: briefActiveIcon,
  },
  {
    name: "Rutas",
    path: "/home/rutas",
    icon: compassIcon,
    activeIcon: compassActiveIcon,
  },
  {
    name: "Productos",
    path: "/home/productos",
    icon: boxIcon,
    activeIcon: boxActiveIcon,
  },
];

export { users, roles, menuItems };
