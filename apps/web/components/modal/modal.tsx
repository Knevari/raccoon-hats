import { cn } from "../../utils";

export interface ModalProps {
  children: React.ReactNode;
  isOpen?: Boolean;
  isCentered?: Boolean;
  onCloseModal: () => void;
}

export function Modal({
  isOpen = false,
  isCentered = false,
  onCloseModal,
  children,
}: ModalProps) {
  return isOpen ? (
    <div
      className="fixed inset-0 h-full w-full z-50 transform bg-opacity-50 backdrop-blur-sm"
      onClick={onCloseModal}
    >
      <div
        className={cn(
          "absolute transform left-1/2 md:top-[10%] w-full md:max-w-2xl -translate-x-1/2 h-[100vh] md:h-auto md:max-h-[80vh] overflow-y-auto z-[99999]",
          {
            "top-1/2 md:top-1/2 -translate-y-1/2": isCentered,
          }
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col bg-white shadow-md rounded-md border border-neutral-400/20">
          {children}
        </div>
      </div>
    </div>
  ) : null;
}
