import type { ReactNode } from "react";

const PhoneLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="device-wrapper">
      <div
        className="device"
        data-device="iPhone5"
        data-orientation="portrait"
        data-color="black"
      >
        <div className="screen">{children}</div>
      </div>
    </div>
  );
};

export default PhoneLayout;
