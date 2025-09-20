export default function Last() {
  const items = [
    {
      title: "Decks & Proches",
      stars: 4.7,
      comments: "1k+",
      price: 1200,
    },
    {
      title: "Decks & Proches",
      stars: 4.7,
      comments: "1k+",
      price: 1200,
    },
    {
      title: "Decks & Proches",
      stars: 4.7,
      comments: "1k+",
      price: 1200,
    },
    {
      title: "Decks & Proches",
      stars: 4.7,
      comments: "1k+",
      price: 1200,
    },
  ];
  return (
    <div className="max-w-md mx-auto h-full flex flex-col bg-stone-50 ">
      <div className="w-full flex flex-col justify-center items-star gap-4 py-8 bg-accent/20 px-4">
        <h3 className="font-bold text-[28px] text-start leading-[32px] ">
          Success, your project was shared with pros
        </h3>
        <p className="text-[14px]text-start">
          Expected a call with in 12 hours, or you can contact pros directly in
          your{" "}
          <span className="text-primary underline font-semibold">
            project details
          </span>
        </p>
      </div>
      <div className="w-full flex flex-col justify-center items-start gap-5 px-4 mt-9">
        <p className="font-bold text-[22px] text-start leading-[30px] ">
          Check another task off your list.
        </p>
        <div className="flex justify-center items-center w-full overflow-hidden py-4 rounded-full border border-gray-200 pl-6 pr-2">
          <input
            type="text"
            placeholder="How can we help?"
            className="focus:outline-none w-[70%] border-r border-gray-200"
          />
          <div className="flex justify-center items-center gap-3 w-[30%]">
            <img src="/map.svg" alt="Icono" />
            <p className=" text-center">Zip code</p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-5 px-4 mt-14">
        {items.map((item, index) => (
          <div
            key={index}
            className="px-3 py-4 w-full flex justify-start items-center gap-5 border border-gray-200 rounded-[5px]"
          >
            <div className="h-[57.6px] w-[57.6px] rounded-full bg-primary"></div>
            <div className="flex flex-col justify-center items-start gap-2">
              <p className="text-[18px] font-bold leading-[22px] text-start">
                {item.title}
              </p>
              <div className="flex justify-start items-center gap-2 text-[12px]">
                <p>
                  S <span className="font-semibold">{item.stars}</span> (
                  {item.comments})
                </p>
                |<p>from ${item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[12px] text-gray-300 mx-4 py-8">
        Price shown is the national median price of minimum job size for H&A
        Tree Brother's pre prices offering. Actual pricing may vary.
      </p>
      <div className="bg-accent/20 w-full flex justify-start items-center gap-6 px-7 py-8">
        <div className="size-[80px] rounded-full bg-primary"></div>
        <div className="flex flex-col justify-center items-start gap-2">
          <p className="text-[14px] font-bold leading-[20px]">
            Prepare your pro. Get the <br /> app to share photos right <br />{" "}
            from your phone.
          </p>
          <a href="#" className="text-primary font-bold text-[14px]">
            Get the H&A Tree Brother app
          </a>
        </div>
      </div>
    </div>
  );
}
