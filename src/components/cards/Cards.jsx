import pencil from "../../assets/icons/pencil-square.svg";
import cerrar from "../../assets/icons/x-lg.svg";
const Cards = () => {
  return (
    <div className="h-[6.5rem] w-[30rem] rounded-lg border border-black_l p-2">
      <div className="flex justify-between">
        <p className="font-roboto">Titulo</p>
        <div className="flex gap-2">
          <img
            src={pencil}
            alt="editar"
            className="w-[1.5rem] cursor-pointer"
          />
          <img
            src={cerrar}
            alt="cerrar"
            className="w-[1.5rem] cursor-pointer"
          />
        </div>
      </div>
      <div>
        <p className="font-roboto text-sm">cuerpo de la nota</p>
      </div>
    </div>
  );
};

export default Cards;
