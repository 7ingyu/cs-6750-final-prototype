import type { ReactNode } from "react";

const PhoneLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="desktop-only">
        <div className="d-flex align-items-center justify-content-center">
          <div className="device-wrapper">
            <div
              className="device"
              data-device="iPhone7"
              data-orientation="portrait"
              data-color="black"
            >
              <div className="screen">{children}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-only">{children}</div>
    </>
  );
};

export default PhoneLayout;
