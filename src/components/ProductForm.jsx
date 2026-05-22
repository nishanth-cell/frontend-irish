import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../schema/productSchema";

export default function ProductForm({
  mode = "add", // "add" | "edit"
  defaultValues = {},
  onSubmit,
  loading = false,
  existingImage = "",
}) {
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(productSchema),
  });

  const submitHandler = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("rate", Number(data.rate));
    formData.append("discount", Number(data.discount));
    formData.append("stock", Number(data.stock));
    formData.append("clothType", data.clothType);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    await onSubmit(formData);
  };

  return (
     <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 transition-all duration-300">
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-900 text-black dark:text-white rounded-xl shadow-md transition-all duration-300">

      <h2 className="text-xl font-bold mb-4">
        {mode === "add" ? "Add Product" : "Edit Product"}
      </h2>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-3">

        <Input
          placeholder="Title"
          className="dark:bg-gray-800 dark:text-white"
          {...register("title")}
        />
        <p className="text-red-500 text-sm">
          {errors.title?.message}
        </p>

        <Input
          placeholder="Description"
          className="dark:bg-gray-800 dark:text-white"
          {...register("description")}
        />
        <p className="text-red-500 text-sm">
          {errors.description?.message}
        </p>

        <Input
          type="number"
          placeholder="Rate"
          className="dark:bg-gray-800 dark:text-white"
          {...register("rate")}
        />
         <p className="text-red-500 text-sm">
          {errors.rate?.message}
        </p>

        <Input
          type="number"
          placeholder="Discount"
          className="dark:bg-gray-800 dark:text-white"
          {...register("discount")}
        />
        <p className="text-red-500 text-sm">
          {errors.discount?.message}
        </p>

        <Input
          placeholder="Cloth Type"
          className="dark:bg-gray-800 dark:text-white"
          {...register("clothType")}
        />
      <p className="text-red-500 text-sm">
          {errors.clothType?.message}
        </p>


    
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full text-sm text-gray-600 dark:text-gray-300"
        />

        {/* PREVIEW */}
        {imageFile ? (
          <img
            src={URL.createObjectURL(imageFile)}
            className="h-32 mt-2 rounded-lg border border-gray-300 dark:border-gray-700 object-cover"
          />
        ) : existingImage ? (
          <img
            src={existingImage}
            className="h-32 mt-2 rounded-lg border border-gray-300 dark:border-gray-700 object-cover"
          />
        ) : null}

        <Input
          type="number"
          placeholder="Stock"
          className="dark:bg-gray-800 dark:text-white"
          {...register("stock")}
        />
        <p className="text-red-500 text-sm">
          {errors.stock?.message}
        </p>

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={loading}
        >
          {loading
            ? mode === "add"
              ? "Creating..."
              : "Updating..."
            : mode === "add"
            ? "Create"
            : "Update"}
        </Button>

      </form>
    </div>
    </div>
  );
}