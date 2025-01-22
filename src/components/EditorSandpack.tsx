import { SandBoxContext } from "@/lib/Context";
import {
  SandpackPreview,
  SandpackPreviewRef,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function EditorSandpack() {
  const { sandBox } = React.useContext(SandBoxContext);
  const router = useRouter();
  const sandpack = useSandpack();
  const previewRef = React.useRef<SandpackPreviewRef>(null);
  React.useEffect(() => {
    const Handle = async () => {
      const client = previewRef.current?.getClient();
      // @ts-ignore
      const result = await client?.getCodeSandboxURL();
      if (sandBox.sandBoxType == "deploy") {
        router.push(`https://${result?.sandboxId}.csb.app/`);
      } else if (sandBox.sandBoxType == "export") {
        window.open(result.editorUrl);
      }
    };
    Handle();
  }, [sandBox && sandpack, router]);

  return (
    <SandpackPreview
      ref={previewRef}
      style={{ height: "calc(100vh - 130px)" }}
      showNavigator={true}
    />
  );
}
