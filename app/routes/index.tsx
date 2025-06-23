import { createRoute } from "honox/factory";

export default createRoute((c) => {
  const name = c.req.query("name") ?? "Hono";
  
  return c.render(
    <div className="container mx-auto">
      <div className="flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:min-h-[80vh]">
          <div className="flex flex-col items-center justify-center col-span-1">
            <h1 className="flex flex-col">
              <span className="text-6xl font-black text-primary text-shadow-2xs">
                Honox
              </span>{" "}
              <span className="text-6xl font-black text-shadow-2xs">
                Web application
              </span>{" "}
              <span className="text-6xl font-black text-shadow-2xs">
                framework
              </span>{" "}
              <span className="text-lg font-light mt-5 text-muted-foreground">
                Fast, lightweight, built on Web Standards. Support for any
                JavaScript runtime.
              </span>
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center w-full col-span-1">
            <img
              alt={"Honox"}
              className="w-full h-fit object-cover shadow-2xl hover:scale-105 transition-all"
              src={"https://hono.dev/images/code.webp"}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
