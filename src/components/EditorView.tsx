"use client";
import React from "react";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

import { Dependency } from "@/lib/Constant";
import { cn } from "@/lib/utils";
export default function EditorView({ files }: { files: {} }) {
  const [Active, setActive] = React.useState<string>("code");
  console.log(Active);
  return (
    <div className="flex w-[calc(100%-460px)] bg-[#151515]  min-h-[calc(100vh-70px)]  border flex-col rounded-xl border-[#3a3a3a]  p-1  ">
      <div className="flex w-full h-[50px] gap-2  items-center justify-start">
        <div className="flex  items-center flex-wrap shrink-0 gap-1 bg-bolt-elements-background-depth-1 overflow-hidden rounded-full p-1">
          <button
            onClick={() => setActive("code")}
            className={cn(
              `text-sm px-2.5 ${Active === "code" && "bg-blue-600"} py-0.5 rounded-full relative text-bolt-elements-item-contentAccent`
            )}
          >
            Code
            <span className="absolute inset-0 z-0 bg-bolt-elements-item-backgroundAccent rounded-full transform: none transform-origin: 50% 50% 0px"></span>
          </button>
          <button
            onClick={() => setActive("preview")}
            className={cn(
              `bg-transparent text-sm ${Active === "preview" && "bg-blue-600"} px-2.5 py-0.5 rounded-full relative text-bolt-elements-item-contentDefault hover:text-bolt-elements-item-contentActive`
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
            ...Dependency,
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
            <SandpackPreview
              style={{ height: "calc(100vh - 130px)" }}
              showNavigator={true}
            />
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
