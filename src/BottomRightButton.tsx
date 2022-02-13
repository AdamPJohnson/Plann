import React from "react";

interface BottomRightButtonProps {
  icon: JSX.Element;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function BottomRightButton({ icon, onClick }: BottomRightButtonProps) {
  return (
    <button onClick={onClick} className="bottomRightButton">
      {icon}
    </button>
  );
}

export default BottomRightButton;
