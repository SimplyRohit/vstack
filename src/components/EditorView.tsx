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

export default function EditorView({
  template,
  files,
  codeLoading,
}: {
  template: string;
  files: FileStructure;
  codeLoading: boolean;
}) {
  console.log(template);
  const [Active, setActive] = React.useState<string>("code");
  React.useEffect(() => {
    if (codeLoading) {
      setActive("code");
    }
  }, [codeLoading]);
  return (
    <div className="relative flex min-h-[calc(100vh-70px)] w-[calc(100%-460px)] flex-col rounded-xl border border-[#3a3a3a] bg-[#151515] p-1">
      {codeLoading && (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-grow flex-col items-center justify-center rounded-xl border bg-black p-1 opacity-50">
          <Loader className="animate-spin" />
        </div>
      )}

      <div className="flex h-[50px] w-full items-center justify-start gap-2">
        <div className="bg-bolt-elements-background-depth-1 flex shrink-0 flex-wrap items-center gap-1 overflow-hidden rounded-full p-1">
          <button
            onClick={() => setActive("code")}
            className={cn(
              `px-2.5 text-sm ${Active === "code" && "bg-blue-600"} text-bolt-elements-item-contentAccent relative rounded-full py-0.5`,
            )}
          >
            Code
            <span className="bg-bolt-elements-item-backgroundAccent transform: none transform-origin: 50% 50% 0px absolute inset-0 z-0 rounded-full"></span>
          </button>
          <button
            onClick={() => setActive("preview")}
            className={cn(
              `bg-transparent text-sm ${Active === "preview" && "bg-blue-600"} text-bolt-elements-item-contentDefault hover:text-bolt-elements-item-contentActive relative rounded-full px-2.5 py-0.5`,
            )}
          >
            Preview
          </button>
        </div>
      </div>

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
      >
        <SandpackLayout className="">
          {Active === "code" ? (
            <>
              <SandpackFileExplorer
                className=""
                style={{ height: "calc(100vh - 130px)" }}
              />
              <SandpackCodeEditor
                showInlineErrors={true}
                showLineNumbers={true}
                showTabs={true}
                closableTabs={true}
                style={{ height: "calc(100vh - 130px)" }}
              />
            </>
          ) : (
            <EditorSandpack />
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
