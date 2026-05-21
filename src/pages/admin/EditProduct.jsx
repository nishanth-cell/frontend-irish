import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../../api/products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

export default function EditProduct() {
  const { token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProductById(id,token);
      const product = res.data;

      if (!product) return;

      setValue("title", product.title);
      setValue("description", product.description);
      setValue("rate", product.rate);
      setValue("discount", product.discount);
      setValue("clothType", product.clothType);
      setValue("image", product.image);
      setValue("stock", product.stock);
    };

    fetchData();
  }, [id]);

  const onSubmit = async (data) => {
    await updateProduct(id, data, token);
    navigate("/admin/products");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input placeholder="Title" {...register("title")} />
        <Input placeholder="Description" {...register("description")} />
        <Input type="number" placeholder="Rate" {...register("rate")} />
        <Input type="number" placeholder="Discount" {...register("discount")} />
        <Input placeholder="Cloth Type" {...register("clothType")} />
        <Input placeholder="Image URL" {...register("image")} />
        <Input type="number" placeholder="Stock" {...register("stock")} />

        <Button className="w-full">Update</Button>
      </form>
    </div>
  );
}