import { FC, ReactNode, useState } from "react";

type ChildButton = {
 icon: ReactNode,
 action: () => void,
 attributes: {
  "arial-label": string,
  title: string,
 },
 name?: string,
}

type Props = {
 childButtons: ChildButton[],
 iconResting: ReactNode,
 iconActive: ReactNode,
}

const FloatingButtonMenu: FC<Props> = ({ childButtons, iconResting, iconActive }) => {
 const [isOpen, setIsOpen] = useState<boolean>(false);

 return (
  <div className="flex flex-col gap-2 fixed bottom-10 right-10">

   {isOpen && childButtons?.length && (
    <div className="flex flex-col justify-start items-center gap-1.5">
     {childButtons.map((childButton) => (
      <div className="flex justify-center items-center relative">
       {childButton.name && (
        <p className="text-[0.7rem] text-center min-w-max absolute right-10">{childButton.name}</p>
       )}
       <button
        onClick={childButton.action}
        className="px-2 py-2 bg-leaf self-center rounded-full shadow-sm hover:shadow-md active:shadow-md"
        {...childButton.attributes}
       >
        <div className="w-5 h-5 flex justify-center items-center">
         {childButton.icon}
        </div>
       </button>
      </div>
     ))}
    </div>
   )}

   <button
    className="px-5 py-5 self-center bg-leaf rounded-full shadow-sm hover:shadow-md active:shadow-md"
    onClick={() => setIsOpen(!isOpen)}
   >
    {!isOpen ? (
     iconActive
    ) : (
     iconResting
    )}
   </button>
  </div>
 )
}

export default FloatingButtonMenu;
