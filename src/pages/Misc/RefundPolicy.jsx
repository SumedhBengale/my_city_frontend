import React, { useEffect, useState } from "react";
import blackLogo from "../../assets/images/black_logo.png";
import NavbarBlack from "../../components/navbar_black";
import DesktopNavbarBlack from "../../components/desktopNavbarBlack";
import { getRefundPolicy } from "./api";
import { marked } from "marked";

function RefundPolicy() {
  const [refundPolicy, setRefundPolicy] = useState(null);
  useEffect(() => {
    getRefundPolicy().then((res) => {
      console.log(res);
      const parsedMarkdown = marked(res.data.attributes.content, {
        gfm: true,
        breaks: true,
      });
      setRefundPolicy(parsedMarkdown);
    });
  }, []);
  return (
    <>
      <div className="fixed top-0 z-40">
        <div className="hidden md:block z-40 fixed w-full">
          {<DesktopNavbarBlack />}
        </div>
        <div className="md:hidden z-40 fixed w-full">{<NavbarBlack />}</div>
      </div>
      <div className="flex flex-col container mx-auto mt-16">
        <img src={blackLogo} alt="icon" className="w-32" />
        <div className="text-3xl font-bold font-custom-kiona">
          Refund Policy
        </div>
        {refundPolicy ? (
          <div
            className="text-xl font-custom-open-sans mt-10"
            dangerouslySetInnerHTML={{ __html: refundPolicy }}
          ></div>
        ) : null}
      </div>
    </>
  );
}

export default RefundPolicy;
