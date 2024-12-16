"use client";
import { sellYourItemAction } from "@/actions";
import { useActionState } from "react";

const initialState = {
  message: "",
  errors: {},
};

function page() {
  const [state, formAction] = useActionState<any>(
    sellYourItemAction as any,
    initialState
  );

  return (
    <div className="px-12 pt-24 pb-12 min-h-screen max-w-[100rem] mx-auto flex gap-56">
      <div>
        <h2 className="text-2xl lg:text-4xl mb-4 uppercase pt-12">
          Sell your Item!
        </h2>
        <p className="text-xl">
          Enter details in this form to start selling your item.
        </p>
      </div>
      <div className="mx-auto w-full h-full p-12 rounded-lg border-2 border-gray-500 border-opacity-10 shadow-lg bg-gray-953">
        {state?.type === "error" && (
          <p className="text-lg mb-2 bg-green-951 border-2 border-gray-300 rounded-md p-2 my-4">
            {state.message}
          </p>
        )}
        <form action={formAction}>
          {/* Name Field */}
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 border rounded"
            />
            {state?.errors?.name && (
              <span className="text-red-600 text-sm">
                {state.errors.name.join(", ")}
              </span>
            )}
          </div>

          {/* Price Field */}
          <div className="mb-6">
            <label htmlFor="price" className="block mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="w-full p-2 border rounded"
            />
            {state?.errors?.price && (
              <span className="text-red-600 text-sm">
                {state.errors.price.join(", ")}
              </span>
            )}
          </div>

          {/* Description Field */}
          <div className="mb-6">
            <label htmlFor="description" className="block mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full p-2 border rounded"
            ></textarea>
            {state?.errors?.description && (
              <span className="text-red-600 text-sm">
                {state.errors.description.join(", ")}
              </span>
            )}
          </div>

          {/* Image Field */}
          <div className="mb-6">
            <label htmlFor="imageUrl" className="block mb-2">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              id="imageUrl"
              name="imageUrl"
              className="w-full"
            />
            {state?.errors?.imageUrl && (
              <span className="text-red-600 text-sm">
                {state.errors.imageUrl.join(", ")}
              </span>
            )}
          </div>

          {/* Contact Email Field */}
          <div className="mb-6">
            <label htmlFor="contactEmail" className="block mb-2">
              Contact Email
            </label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              className="w-full p-2 border rounded"
            />
            {state?.errors?.contactEmail && (
              <span className="text-red-600 text-sm">
                {state.errors.contactEmail.join(", ")}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full p-2 bg-blue-600 text-white rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
