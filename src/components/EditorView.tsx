"use client";
import React, { useEffect } from "react";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { Message } from "@/lib/Types";
import { GetAiCode } from "@/actions/GetAi";
import { Code_Gen_Prompt, Default_File, Dependency } from "@/lib/Constant";
export default function EditorView({ Message }: { Message: Message[] }) {
  const [Active, setActive] = React.useState<string>("code");
  const [files, setFiles] = React.useState<any>({ ...Default_File });

  useEffect(() => {
    // const HandleCode = async () => {
    //   if (Message?.length > 0) {
    //     const role = Message[Message.length - 1].role;
    //     if (role === "user") {
    //       const data = await GetAiCode(
    // Message[Message.length - 1].content + Code_Gen_Prompt
    //       );
    //       const merge = {
    //         ...Default_File,
    //         ...data.content.files,
    //       };
    //       setFiles(merge);
    //     }
    //   }
    // };
    // HandleCode();
  }, [Message]);

  return (
    <div className="flex  w-full h-full p-1  ">
      <div className="flex w-full h-full  rounded-xl border flex-col">
        <div className="flex w-full h-[50px] gap-2 items-center justify-start">
          <div className="flex border ml-5 p-2 gap-2 rounded-xl ">
            <h1 onClick={() => setActive("code")}>Code</h1>
            <span>|</span>
            <h1 onClick={() => setActive("preview")}>Preview</h1>
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
                <SandpackFileExplorer style={{ height: "70vh" }} />
                <SandpackCodeEditor
                  showInlineErrors={true}
                  showLineNumbers={true}
                  showTabs={true}
                  closableTabs={true}
                  style={{ height: "70vh" }}
                />
              </>
            ) : (
              <SandpackPreview
                style={{ height: "70vh" }}
                showNavigator={true}
              />
            )}
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
}
