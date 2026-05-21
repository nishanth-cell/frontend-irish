import { useForm } from "react-hook-form";
import { createProduct } from "../../api/products";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

export default function AddProduct() {
  const { token } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        rate: Number(data.rate),
        discount: Number(data.discount),
        stock: Number(data.stock),
      };

      await createProduct(payload, token);

      navigate("/admin/products");
    } catch (err) {
      console.log(err);
      alert("Product creation failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input placeholder="Title" {...register("title")} />
        <Input placeholder="Description" {...register("description")} />
        <Input type="number" placeholder="Rate" {...register("rate")} />
        <Input type="number" placeholder="Discount" {...register("discount")} />
        <Input placeholder="Cloth Type" {...register("clothType")} />
        <Input placeholder="Image URL" {...register("image")} />
        <Input type="number" placeholder="Stock" {...register("stock")} />

        <Button className="w-full">Create</Button>
      </form>
    </div>
  );
}