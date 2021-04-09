import cn from "classnames";
import { useState } from "react";
import { useSelector } from "react-redux";

const Toaster = ({ message, type }) => {
  return (
    <section className="toaster">
      <div
        className={cn("toaster__message", {
          "toaster__message--invalid": type.toString() === "0",
          "toaster__message--success": type.toString() === "1",
          "toaster__message--info": type.toString() === "2",
        })}
      ></div>
    </section>
  );
};
