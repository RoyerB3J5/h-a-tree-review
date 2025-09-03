export default function Footer() {
  return (
    <footer className="flex  flex-col justify-center items-center gap-[9px] py-[40px]">
      <p className="text-[12px] font-normal leading-[140%] text-[#878787]">
        Powered by
      </p>
      <a href="https://inkshapegroup.com/en/">
        <img
          src="/footer-logo.webp"
          alt="Imagen del Footer"
          width="3745"
          height="996"
          className="w-[110px]  h-[29px] cursor-pointer"
        />
      </a>
    </footer>
  );
}
