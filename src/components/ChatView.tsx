import { Forward, Link2, MoveRight, WandSparkles } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Message } from "@/lib/Types";
import ReactMarkdown from "react-markdown";
import { Item } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
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
    <div className="flex-grow w-[450px] h-[calc(100vh-70px)]  overflow-y-scroll items-center flex flex-col rounded-xl">
      {/* ChaitView */}
      <div className="flex flex-col items-center mb-[200px] w-full">
        {Message.map((item, index) => {
          return (
            <div
              className={cn(
                item.role === "user" ? " font-bold " : "  text-base ",
                "flex my-2 w-[400px] flex-shrink  rounded-xl  border "
              )}
              key={index}
            >
              {item.role === "user" && (
                <Avatar className=" border m-2  border-[#3a3a3a]">
                  <AvatarImage src={""} alt={"Avatar"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
              <ReactMarkdown className="p-3">{item.content}</ReactMarkdown>
            </div>
          );
        })}
      </div>

      <div className="flex absolute z-10 bottom-1 mb-2 bg-transparent left-0 ml-[10px] flex-col w-[450px] h-[200px] rounded-xl  border border-[#3a3a3a] backdrop-blur-3xl ">
        <Textarea
          value={text}
          inputMode="text"
          onChange={(e) => setText(e.target.value)}
          draggable="true"
          placeholder="See the magic ........"
          className=" font-bold  focus-visible:ring-0 w-full h-full border-none resize-none"
        />
        <div className="flex w-full h-[50px] items-center flex-grow justify-between">
          <div className="items-center flex">
            <Link2 className="-rotate-45 cursor-pointer  ml-3 opacity-80"></Link2>
            <WandSparkles
              className={cn(
                text.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-80 cursor-pointer",
                "mr-3   w-5 ml-2"
              )}
            ></WandSparkles>
          </div>
          <div className="flex flex-grow"></div>
          <div className="flex items-center justify-center mr-3 ">
            <div
              onClick={() => HandleUpdate()}
              className={cn(text.length === 0 && "hidden", "     text-white ")}
            >
              <Forward className="w-7 h-7 cursor-pointer " />
            </div>
          </div>
        </div>
      </div>

      {/* SendChat */}
    </div>
  );
}
