import axios from "axios";
import { useState } from "react";
import mainBg from "./assets/img/products.webp";
import { GrCircleAlert } from "react-icons/gr";
import { GrStatusGood } from "react-icons/gr";
import DialogComponent from "./DialogComponent";
import { CgSpinnerTwo } from "react-icons/cg";
import { FaHome } from "react-icons/fa";

export const ProductDetact = () => {
  const [inputValues, setInputValues] = useState({ value: "", status: false });
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({
    product: null,
    status: false,
  });
  const [dialogStatus, setDialogStatus] = useState(false);
  const dialogOpen = () => {
    setDialogStatus(true);
  };

  const dialogClose = () => {
    setDialogStatus(false);
  };

  const validateCode = (code) => {
    const pattern = /^TK\d{2}[A-Z0-9]{8}$/;
    return pattern.test(code); // إرجاع true إذا كان النمط صحيحًا و false إذا كان غير صحيح
  };

  const inputHandler = (e) => {
    let value = e.target.value.toUpperCase(); // إزالة أي شرطات سابقة

    // إذا كانت القيمة فارغة، نعيدها مباشرة
    if (value === "") {
      setInputValues({
        ...inputValues,
        value,
        status: validateCode(value),
      });
      return;
    }

    if (value.length === 1) {
      value = "T"; // استبدال أول حرف بـ "T"
    } else if (value.length === 2) {
      value = "TK"; // استبدال ثاني حرف بـ "K"
    } else if (value.length > 2) {
      // إذا كان الطول أكبر من 2، نعيد "TK" ثم نضيف ما تبقى
      value = "TK" + value.slice(2);
    }

    value = value.replace(/[^A-Z0-9]/g, "");
    value = value.slice(0, 12);

    setInputValues({
      ...inputValues,
      value,
      status: validateCode(value),
    });
  };

  const formHandler = async (e) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
      "x-api-key": `${process.env.REACT_APP_API_TOKEN}`,
    };
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/products/v1/verify`,
        {
          code: inputValues.value, // البيانات التي تريد إرسالها
        },
        { headers }
      );
      setResponse(response.data);
      dialogOpen();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const percentage = Math.min(inputValues.value.length / 12, 1);
  const color = `rgb(${255 - percentage * 255}, ${percentage * 180}, 0)`; // من الأحمر إلى الأخضر

  return (
    <>
      <header className="relative">
        <div className="bg-[#00000063] fixed top-0 left-0 w-full z-20 px-4">
          <div className="flex items-center mx-auto max-w-[1200px]">
            <img
              src="/takashi.svg"
              alt="Takashi Oil"
              className="w-[160px] items-center pb-4 pt-2 "
            />
            <nav className="hidden text-white font-semibold tracking-wide md:block">
              <ul className="flex items-center h-full ms-16">
                <li className="px-4 h-full transition ease-in-out delay-100 cursor-pointer hover:bg-black/60 hover:text-[#e4dc36]">
                  <a
                    className="flex items-center h-full"
                    href="https://takashioil.com"
                  >
                    Home
                  </a>
                </li>
                <li className="px-4 h-full transition ease-in-out delay-100 cursor-pointer hover:bg-black/60 hover:text-[#e4dc36]">
                  <a
                    className="flex items-center h-full"
                    href="https://takashioil.com/about-us"
                  >
                    About us
                  </a>
                </li>
                <li className="px-4 h-full transition ease-in-out delay-100 cursor-pointer hover:bg-black/60 hover:text-[#e4dc36]">
                  <a
                    className="flex items-center h-full"
                    href="https://takashioil.com/#features"
                  >
                    Features
                  </a>
                </li>
                <li className="px-4 h-full transition ease-in-out delay-100 cursor-pointer hover:bg-black/60 hover:text-[#e4dc36]">
                  <a
                    className="flex items-center h-full"
                    href="https://takashioil.com/products"
                  >
                    Products
                  </a>
                </li>
                <li className="px-4 h-full transition ease-in-out delay-100 cursor-pointer hover:bg-black/60 hover:text-[#e4dc36]">
                  <a
                    className="flex items-center h-full"
                    href="https://takashioil.com/contact-us"
                  >
                    Contact us
                  </a>
                </li>
              </ul>
            </nav>
            <div className="block ms-auto md:hidden">
              <a href="https://takashioil.com">
                <FaHome className="text-[#53af31] text-3xl" />
              </a>
            </div>
          </div>
        </div>
      </header>
      <main className="bg-[url('./assets/img/main-bg.webp')] bg-cover h-dvh ">
        <div className="flex flex-col items-center justify-evenly max-w-[1200px] mx-auto h-full">
          <form
            className="bg-white/70 backdrop-blur-lg w-[400px] max-w-[550px] md:w-[95%] mx-3 p-7 rounded-md flex-col mt-28"
            onSubmit={formHandler}
          >
            <label className="block">
              <span className="mb-2 after:content-['*'] after:ml-0.5 after:text-red-600 block text-lg font-medium text-slate-800">
                Enter Product Code
              </span>
              <input
                required
                className="w-full h-12 rounded-md p-3 text-2xl outline-none mb-2"
                maxLength={12}
                minLength={12}
                type="text"
                name="productKey"
                id="productKey"
                value={inputValues.value}
                onChange={inputHandler}
                placeholder="TK********"
              />
            </label>
            <div className="rounded-full max-w-full h-2 mb-2 bg-gray-100/50">
              <div
                className="rounded-full h-full"
                style={{
                  backgroundColor: color,
                  width: `${percentage * 100}%`,
                }}
              ></div>
            </div>
            {!inputValues.status ? (
              <div className="space-y-1">
                <span className="text-red-700 font-mono flex items-center text-sm md:text-[16px] break-words">
                  <GrCircleAlert className="me-1" />
                  Product Code Format "TK********"
                </span>
                <span className="text-red-700 font-mono flex items-center text-sm md:text-[16px] break-words">
                  <GrCircleAlert className="me-1" />
                  Entered Code Not Valid
                </span>
              </div>
            ) : (
              <div className="space-y-1">
                <span className="text-lime-950 flex items-center text-sm md:text-[16px] break-words font-mono">
                  <GrStatusGood className="me-1" />
                  Entered code is correctly formatted.
                </span>
                <span className="text-lime-950 flex items-center text-sm md:text-[16px] break-words font-mono">
                  <GrStatusGood className="me-1" />
                  Entered Code is Valid
                </span>
              </div>
            )}

            <button
              disabled={!inputValues.status || isLoading}
              className={`${
                !inputValues.status || isLoading
                  ? "bg-[#a1a1a1]"
                  : "bg-[#535353] hover:bg-[#3e9224]"
              } mt-3 flex items-center justify-center w-full disabled:cursor-not-allowed disabled:bg-[#a1a1a1] bg-[#535353] hover:bg-[#3e9224] transition ease-linear delay-50 tracking-wider h-11 rounded-md font-normal text-white`}
              type="submit"
            >
              {isLoading ? (
                <>
                  <CgSpinnerTwo className="animate-spin me-3 text-3xl text-[#3e9224]" />
                  Detecting Product...
                </>
              ) : (
                "Detect Product"
              )}
            </button>
          </form>
          <div className="mt-10">
            <img
              src={mainBg}
              alt="Takashi Products"
              className="max-w-80 md:max-w-[500px]"
            />
          </div>
        </div>
      </main>
      <DialogComponent
        isOpen={dialogStatus}
        closeFn={dialogClose}
        response={response}
      />
    </>
  );
};
