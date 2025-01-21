import React from "react";
import * as Svg from "./Svg";

function Stacks() {
  return (
    <div className="mt-20 flex h-full w-[500px] flex-col items-center justify-center">
      <p className="font-bold opacity-50">
        start a blank app with your favorite stack
      </p>
      <div className="mt-3 flex w-[600px] items-center justify-center gap-5">
        <Svg.AngularLogo className="h-11 w-11 cursor-not-allowed opacity-50 hover:opacity-100" />
        <Svg.AstroLogo className="h-14 w-14 cursor-not-allowed opacity-50 hover:opacity-100" />
        <Svg.NativeLogo className="h-14 w-14 cursor-not-allowed opacity-50 hover:opacity-100" />
        <Svg.NextLogo className="h-12 w-12 cursor-not-allowed opacity-50 hover:opacity-100" />
        <Svg.NuxtLogo className="h-14 w-14 cursor-not-allowed opacity-50 hover:opacity-100" />
      </div>
      <div className="mt-3 flex w-[600px] items-center justify-center gap-5">
        <Svg.TypeScriptLogo className="mb-3 h-14 w-14 cursor-not-allowed opacity-50 hover:opacity-100" />
        <Svg.ReactLogo className="h-12 w-12 cursor-not-allowed opacity-50 hover:opacity-100" />
        <Svg.SveletLogo className="h-14 w-14 cursor-not-allowed opacity-50 hover:opacity-100" />
        <Svg.ViteLogo className="h-12 w-12 cursor-not-allowed opacity-50 hover:opacity-100" />
        <Svg.VueLogo className="h-12 w-12 cursor-not-allowed opacity-50 hover:opacity-100" />
      </div>
    </div>
  );
}

export default Stacks;
