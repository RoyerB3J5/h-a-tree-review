interface PropsHeader {
  itemHeader: string[];
  headerActive: number;
}
function Header({ itemHeader, headerActive }: PropsHeader) {
  return (
    <header className="flex justify-start items-center px-5 py-5 bg-primary w-full gap-5">
      <img
        src="/logo.png"
        alt="Logo de H&A TREE"
        width={974}
        height={275}
        className="w-auto h-[35px]"
      />
      <div className="flex justify-center items-center gap-4">
        {itemHeader.map((item,index) => (
          <div className="flex flex-col justify-center items-center gap-1" key={index}>
            <div className={`size-5 ${headerActive === index ? "bg-white text-primary  font-bold border-white" :"border-gray-300 text-gray-300"} border rounded-full p-1 flex justify-center items-center text-[12px]`}>
              {index+1}
            </div>
            <p className="text-[12px] text-gray-300">{item}</p>
          </div>
        ))}
      </div>
    </header>
  );
}

export default Header;
