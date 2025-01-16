"use client";
import { useParams } from "next/navigation";

export default function Workspace() {
  const params = useParams();
  const WorkSpaceID = params.id;
  return (
    <div className="flex h-screen justify-center items-center">
      <h1>workspace {WorkSpaceID}</h1>
    </div>
  );
}
