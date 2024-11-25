import icono from "../assets/users/ImgEscudo.png";
import avatarIcon from "../assets/icons/avatar.svg";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import houseIcon from "../assets/icons/house-door.svg";
import shopIcon from "../assets/icons/shop-window.svg";
import peopleIcon from "../assets/icons/people.svg";
import briefcaseIcon from "../assets/icons/briefcase.svg";
import briefActiveIcon from "../assets/icons/briefcase-fill.svg";
import compassIcon from "../assets/icons/compass.svg";
import boxIcon from "../assets/icons/box-seam.svg";
import boxActiveIcon from "../assets/icons/box-seam-fill.svg";
import compassActiveIcon from "../assets/icons/compass-fill.svg";
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
    permisses: [
      "SECTION_HOME",
      "USER_SUPER_ADMIN",
      "SECTION_ADMINISTRATION",
      "SECTION_USERS",
      "SECTION_ROUTES",
      "SECTION_PRODUCTS",
      "SECTION_ORDERS",
      "SECTION_WORKSHOP",
    ],
  },
  {
    name: "Empresas",
    path: "/inicio/empresas",
    icon: shopIcon,
    activeIcon: shopActiveIcon,
    permisses: ["SECTION_ADMINISTRATION", "USER_SUPER_ADMIN"],
  },
  {
    name: "Personal",
    path: "/inicio/personal",
    icon: peopleIcon,
    activeIcon: peopleActiveIcon,
    permisses: ["SECTION_USERS", "USER_SUPER_ADMIN"],
  },

  {
    name: "Rutas",
    path: "/inicio/rutas",
    icon: compassIcon,
    activeIcon: compassActiveIcon,
    permisses: ["SECTION_ROUTES", "USER_SUPER_ADMIN"],
  },
  {
    name: "Productos",
    path: "/inicio/productos",
    icon: boxIcon,
    activeIcon: boxActiveIcon,
    permisses: ["SECTION_PRODUCTS", "USER_SUPER_ADMIN"],
  },
  {
    name: "Órdenes",
    path: "/inicio/ordenes",
    icon: clipboardChek,
    activeIcon: clipboardChekActive,
    permisses: ["SECTION_ORDERS", "USER_SUPER_ADMIN"],
  },
  {
    name: "Taller",
    path: "/inicio/taller",
    icon: briefcaseIcon,
    activeIcon: briefActiveIcon,
    permisses: ["SECTION_WORKSHOP", "USER_SUPER_ADMIN"],
  },
];

const sellers = [
  { id: 1, name: "Vendedor 1" },
  { id: 2, name: "Vendedor 2" },
  { id: 3, name: "Vendedor 3" },
  { id: 4, name: "Vendedor 4" },
];

export { users, roles, menuItems, sellers };
