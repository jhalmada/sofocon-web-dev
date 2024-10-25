import { useForm } from "react-hook-form";
import useUsersSellers from "../hooks/users/useUsersSellers";
import cardDashImg from "../assets/images/cardDash.svg";
import cardDash2Img from "../assets/images/cardDash_2.svg";
import cardDash3Img from "../assets/images/cardDash_3.svg";
import secondCardImg from "../assets/images/secondCard.svg";
import blockImg from "../assets/images/block.svg";
import block2Img from "../assets/images/block_2.svg";
import frameHomeImg from "../assets/images/frameHome.svg";

const HomePage = () => {
  const { userSellerResponse, setSearch } = useUsersSellers();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};
  return (
    <div className="min-h-[calc(100vh-4.375rem)] bg-gray p-6">
      <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
        Inicio
      </h1>
      <div className="flex justify-between">
        <img src={cardDashImg} alt="" className="w-full max-w-[20rem]" />

        <img src={cardDash2Img} alt="" className="w-full max-w-[20rem]" />

        <img src={cardDash3Img} alt="" className="w-full max-w-[20rem]" />
      </div>
      <img src={secondCardImg} alt="" className="w-full" />
      <div className="flex justify-between">
        <img src={blockImg} alt="" className="h-[17rem]" />
        <img src={block2Img} alt="" className="h-[17rem]" />
      </div>
      <img src={frameHomeImg} alt="" />
    </div>
  );
};
export default HomePage;
