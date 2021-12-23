import React from "react";

interface BottomRightButtonProps {
  icon: any;
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
