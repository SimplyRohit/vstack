import { SandBoxContext } from "@/lib/Context";
import {
  SandpackPreview,
  SandpackPreviewRef,
  useSandpack,
} from "@codesandbox/sandpack-react";
import React from "react";

export default function EditorSandpack() {
  const { sandBox } = React.useContext(SandBoxContext);

  const sandpack = useSandpack();
  const previewRef = React.useRef<SandpackPreviewRef>();
  React.useEffect(() => {
    const Handle = async () => {
      const client = previewRef.current?.getClient();
      const result = await client?.getCodeSandboxURL();
      if (sandBox.sandBoxType == "deploy") {
        window.open(`https://${result?.sandboxId}.csb.app/`);
      } else if (sandBox.sandBoxType == "export") {
        window.open(result.editorUrl);
      }
    };
    Handle();
  }, [sandBox && sandpack]);

  return (
    <SandpackPreview
      ref={previewRef}
      style={{ height: "calc(100vh - 130px)" }}
      showNavigator={true}
    />
  );
}
