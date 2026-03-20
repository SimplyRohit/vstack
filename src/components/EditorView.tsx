"use client";
import React from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
  // SandpackPredefinedTemplate,
} from "@codesandbox/sandpack-react";
import { React_Dependency } from "@/lib/Constant";
import { cn } from "@/lib/utils";
import EditorSandpack from "./EditorSandpack";
import { Loader } from "lucide-react";
import { FileStructure } from "@/lib/Types";
import { SandBoxContext } from "@/lib/Context";

import { Play, Terminal } from "lucide-react";

export default function EditorView({
  template,
  files,
  codeLoading,
}: {
  template: string;
  files: FileStructure;
  codeLoading: boolean;
}) {
  const { sandBox, setsandBox } = React.useContext(SandBoxContext);
  const Active = sandBox.activeTab;

  React.useEffect(() => {
    if (codeLoading) {
      setsandBox((prev) => ({ ...prev, activeTab: "code" }));
    }
  }, [codeLoading]);

  return (
    <div className="relative flex h-full flex-1 flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/40 shadow-2xl backdrop-blur-3xl">
      <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-6 py-3">
        <div className="flex items-center gap-1 rounded-2xl bg-black/40 p-1 border border-white/5">
          <button
            onClick={() => setsandBox((prev) => ({ ...prev, activeTab: "code" }))}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-1.5 text-xs font-bold transition-all",
              Active === "code"
                ? "bg-blue-600 text-white shadow-lg"
                : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
            )}
          >
            <Terminal className="h-3.5 w-3.5" />
            Code
          </button>
          <button
            onClick={() => setsandBox((prev) => ({ ...prev, activeTab: "preview" }))}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-1.5 text-xs font-bold transition-all",
              Active === "preview"
                ? "bg-blue-600 text-white shadow-lg"
                : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
            )}
          >
            <Play className="h-3.5 w-3.5" />
            Preview
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-1">
            {template} Project
          </span>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        {codeLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Loader className="h-10 w-10 animate-spin text-blue-500" />
                <div className="absolute inset-0 animate-ping rounded-full bg-blue-500/20" />
              </div>
              <span className="text-sm font-bold text-white/80 animate-pulse tracking-tight">Generating code...</span>
            </div>
          </div>
        )}

        <SandpackProvider
          files={files}
          customSetup={{
            dependencies: {
              ...React_Dependency,
            },
          }}
          theme={"dark"}
          template="react"
          options={{ externalResources: ["https://cdn.tailwindcss.com"] }}
          style={{ height: "100%" }}
        >
          <SandpackLayout className="h-full border-none">
            {Active === "code" ? (
              <>
                <SandpackFileExplorer
                  className="h-full border-r border-white/5 bg-transparent"
                  style={{ height: "100%" }}
                />
                <SandpackCodeEditor
                  showInlineErrors={true}
                  showLineNumbers={true}
                  showTabs={true}
                  closableTabs={true}
                  className="h-full bg-transparent"
                  style={{ height: "100%" }}
                />
              </>
            ) : (
              <div className="h-full w-full bg-white rounded-2xl m-2 overflow-hidden border border-white/10">
                <EditorSandpack />
              </div>
            )}
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
}
