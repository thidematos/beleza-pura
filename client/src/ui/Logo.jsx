function Logo({ width }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${width}`}>
      <img src="logo1.png" className="w-[15%] shadow" />
      <h1 className="font-fancy text-4xl text-gray-200 drop-shadow-lg">
        Beleza Pura
      </h1>
    </div>
  );
}

export default Logo;
