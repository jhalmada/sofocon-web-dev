const ContentColor = ({ color }) => {
  return (
    <div
      className={`flex h-[0.7rem] w-[0.7rem] ${color === 1 && "bg-previw_1"} ${color === 2 && "bg-previw_2"} ${color === 3 && "bg-previw_3"}`}
    ></div>
  );
};

export default ContentColor;
