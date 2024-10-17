import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { GrValidate } from "react-icons/gr";
import { VscUnverified } from "react-icons/vsc";

const DialogComponent = ({ response, isOpen, closeFn }) => {
  const { product, status } = response;
  const OrginalProduct = () => {
    return (
      <>
        <div className="flex items-center space-x-4 text-green-700">
          <GrValidate className="text-6xl" />
          <DialogTitle as="h3" className="text-3xl font-medium">
            Orginal Product.
          </DialogTitle>
        </div>

        <p className="mt-2 text-sm/6 text-black/80">
          This product is 100% original. Thank you for trusting us. We hope
          Takashi oil enhances your vehicle's performance and provides the care
          it deserves.
        </p>
        <div className="flex mt-2 space-x-3">
          <div className="max-w-[30%]">
            <img
              src={product.image}
              alt={product.title}
              className="w-full rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-xl font-bold tracking-wider">
              {product.title}
            </h4>
            <div className="text-md">
              Product Grid No:&nbsp;
              <span className="font-bold text-lg text-[#3e9224]">
                {product.product_grid}
              </span>
            </div>
            <p className="text-sm font-normal">{product.description}</p>
          </div>
        </div>
      </>
    );
  };

  const UsedProduct = () => {
    return (
      <>
        <div className="flex items-center space-x-4 text-amber-500">
          <VscUnverified className="text-9xl" />
          <DialogTitle as="h3" className="text-3xl font-medium">
            Suspected Product Manipulation.
          </DialogTitle>
        </div>

        <p className="mt-2 text-md text-black/80">
          This product has either been used before, is not original, or has been
          tampered with. We recommend checking with the seller to ensure you are
          receiving an authentic product. Thank you for trusting us, and we look
          forward to serving you better in the future.
        </p>
        <hr className="my-3 " />
        <div className="flex mt-2 space-x-3">
          <div className="max-w-[30%]">
            <img
              src={product.image}
              alt={product.title}
              className="w-full rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-xl font-bold tracking-wider">
              {product.title}
            </h4>
            <div className="text-md">
              Product Grid No:&nbsp;
              <span className="font-bold text-lg text-[#3e9224]">
                {product.product_grid}
              </span>
            </div>
            <p className="text-sm font-normal">{product.description}</p>
          </div>
        </div>
      </>
    );
  };
  const NotOrginal = () => {
    return (
      <>
        <div className="flex items-center space-x-4 text-red-700">
          <VscUnverified className="text-7xl" />
          <DialogTitle as="h3" className="text-3xl font-medium">
            Not an Original Product.
          </DialogTitle>
        </div>
        <p className="mt-2 text-sm/6 text-black/80">
          This product is not original and is not registered in our database.
          Please verify the place of purchase and ensure you obtain the original
          product to guarantee quality and optimal performance. Thank you for
          your understanding, and we look forward to assisting you in the
          future.
        </p>
      </>
    );
  };

  const RenderProduct = () => {
    if (status && product) {
      return <OrginalProduct />;
    } else if (!status && product) {
      return <UsedProduct />;
    } else {
      return <NotOrginal />;
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-30"
        onClose={() => {}}
      >
        <div className="fixed inset-0 z-40  overflow-hidden bg-black/80">
          <div className="flex items-center justify-center p-4 w-full h-full">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-md p-6 backdrop-blur-2xl bg-gray-100 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              {<RenderProduct />}
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 transition-colors duration-300 ease-out rounded-md bg-[#535353] hover:bg-[#3e9224] py-1.5 px-3 text-md font-semibold text-white shadow-inner"
                  onClick={closeFn}
                >
                  Got it!
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default DialogComponent;
