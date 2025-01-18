import { Link2, MoveRight, WandSparkles } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Message } from "@/lib/Types";
import ReactMarkdown from "react-markdown";
export default function ChatView({
  Message,
  HandleUpdate,
  text,
  setText,
}: {
  Message: Message[];
  HandleUpdate: () => void;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex w-[600px]  flex-col h-full p-1 ">
      <div className=" flex-grow flex border flex-col rounded-xl">
        {/* ChaitView */}
        <div className=" flex-grow flex-col overflow-y-scroll">
          {Message.map((item, index) => {
            return (
              <div
                className={cn(
                  item.role === "user"
                    ? "justify-end  ml-[50px]"
                    : "mr-[50px] font-GeistSans text-base ",
                  "flex my-1   "
                )}
                key={index}
              >
                <ReactMarkdown className=" border p-2 rounded">
                  {item.content}
                </ReactMarkdown>
              </div>
            );
          })}
        </div>

        {/* SendChat */}
        <div className="flex flex-col w-full h-[180px]  rounded-xl  border-y ">
          <Textarea
            onChange={(e) => setText(e.target.value)}
            draggable="false"
            placeholder="want to change something ?"
            className="  focus-visible:ring-0 w-full h-full  border-none resize-none"
          />
          <div className="flex flex-row w-full items-center justify-between h-[50px]">
            <div className="items-center flex">
              <Link2 className="-rotate-45 ml-3 opacity-80"></Link2>
              <WandSparkles
                className={cn(
                  text.length === 0 ? "opacity-50" : "opacity-80",
                  "mr-3  w-5 ml-2"
                )}
              ></WandSparkles>
            </div>
            <div>
              <Button
                onClick={() => HandleUpdate()}
                className={cn(
                  text.length === 0 && "hidden",
                  " rounded-[5px] mr-2 mb-1 p-1 text-white opacity-80 bg-blue-400 hover:bg-blue-500"
                )}
              >
                <MoveRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
