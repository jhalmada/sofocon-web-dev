import { Link } from "react-router-dom";
import ChevronLeftIcon from "../../assets/icons/chevron-left.svg";
const BackButton = ({ route }) => {
  return (
    <Link to={route} className="text-sm font-medium leading-4">
      <div className="mb-4 flex items-center">
        <img src={ChevronLeftIcon} alt="arrow left" className="-ml-1 h-4 w-4" />
        Volver
      </div>
    </Link>
  );
};

export default BackButton;
