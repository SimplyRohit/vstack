import React from "react";
import * as Svg from "./Svg";

function Stacks({
  handleStacks,
}: {
  handleStacks: (template: string) => void;
}) {
  return (
    <div className=" flex w-full max-w-[550px] flex-col items-center px-4 mx-auto">
      <div className="flex items-center gap-4 w-full mb-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-500 whitespace-nowrap opacity-70">
          Or start with a favorite stack
        </p>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="grid w-full grid-cols-5 gap-y-10">
        <div className="flex items-center justify-center">
          <button onClick={() => handleStacks("angular")} className="transition-all hover:scale-125 active:scale-95 group">
            <Svg.AngularLogo className="h-10 w-10 opacity-30 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0" />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button onClick={() => handleStacks("astro")} className="transition-all hover:scale-125 active:scale-95 group">
            <Svg.AstroLogo className="h-11 w-11 opacity-30 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0" />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button onClick={() => handleStacks("react-native")} className="transition-all hover:scale-125 active:scale-95 group">
            <Svg.NativeLogo className="h-11 w-11 opacity-30 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0" />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button onClick={() => handleStacks("nextjs")} className="transition-all hover:scale-125 active:scale-95 group">
            <Svg.NextLogo className="h-10 w-10 opacity-30 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0" />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button onClick={() => handleStacks("nuxt")} className="transition-all hover:scale-125 active:scale-95 group">
            <Svg.NuxtLogo className="h-11 w-11 opacity-30 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0" />
          </button>
        </div>

        <div className="flex items-center justify-center">
          <button onClick={() => handleStacks("vanilla-ts")} className="transition-all hover:scale-125 active:scale-95 group">
            <Svg.TypeScriptLogo className="h-11 w-11 opacity-30 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0" />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button onClick={() => handleStacks("react")} className="transition-all hover:scale-125 active:scale-95 group">
            <Svg.ReactLogo className="h-10 w-10 opacity-30 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0" />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button onClick={() => handleStacks("svelte")} className="transition-all hover:scale-125 active:scale-95 group">
            <Svg.SveletLogo className="h-11 w-11 opacity-30 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0" />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button onClick={() => handleStacks("vite")} className="transition-all hover:scale-125 active:scale-95 group">
            <Svg.ViteLogo className="h-10 w-10 opacity-30 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0" />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button onClick={() => handleStacks("vue")} className="transition-all hover:scale-125 active:scale-95 group">
            <Svg.VueLogo className="h-10 w-10 opacity-30 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stacks;
