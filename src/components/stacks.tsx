import React from "react";
import * as Svg from "./Svg";

function Stacks({
  handleStacks,
}: {
  handleStacks: (template: string) => void;
}) {
  return (
    <div className="mt-20 flex h-full w-[500px] flex-col items-center justify-center">
      <p className="font-bold opacity-50">
        start a blank app with your favorite stack
      </p>
      <div className="mt-3 flex w-[600px] items-center justify-center gap-5">
        <div onClick={() => handleStacks("angular")}>
          <Svg.AngularLogo className="h-11 w-11 opacity-50 hover:opacity-100" />
        </div>
        <div onClick={() => handleStacks("astro")}>
          <Svg.AstroLogo className="h-14 w-14 opacity-50 hover:opacity-100" />
        </div>
        <div onClick={() => handleStacks("Angular")}>
          <Svg.NativeLogo className="h-14 w-14 opacity-50 hover:opacity-100" />
        </div>
        <div onClick={() => handleStacks("nextjs")}>
          <Svg.NextLogo className="h-12 w-12 opacity-50 hover:opacity-100" />
        </div>
        <div onClick={() => handleStacks("Angular")}>
          <Svg.NuxtLogo className="h-14 w-14 opacity-50 hover:opacity-100" />
        </div>
      </div>
      <div className="mt-3 flex w-[600px] items-center justify-center gap-5">
        <div onClick={() => handleStacks("vanilla-ts")}>
          <Svg.TypeScriptLogo className="mb-3 h-14 w-14 opacity-50 hover:opacity-100" />
        </div>
        <div onClick={() => handleStacks("react")}>
          <Svg.ReactLogo className="h-12 w-12 opacity-50 hover:opacity-100" />
        </div>
        <div onClick={() => handleStacks("svelte")}>
          <Svg.SveletLogo className="h-14 w-14 opacity-50 hover:opacity-100" />
        </div>
        <div onClick={() => handleStacks("vite")}>
          <Svg.ViteLogo className="h-12 w-12 opacity-50 hover:opacity-100" />
        </div>
        <div onClick={() => handleStacks("vue")}>
          <Svg.VueLogo className="h-12 w-12 opacity-50 hover:opacity-100" />
        </div>
      </div>
    </div>
  );
}

export default Stacks;
