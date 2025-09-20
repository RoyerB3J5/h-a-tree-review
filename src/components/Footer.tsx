export default function Footer() {
  return (
    <footer className="py-[40px] px-6">
      <p className="text-[14px] leading-[20px] mb-8 text-[#878787] ">© 1995-2025, H&A Tree Brothers. All Rights Reserved.</p>
      <div className="flex  flex-col justify-center items-center gap-[9px]">
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
      </div>
    </footer>
  );
}
