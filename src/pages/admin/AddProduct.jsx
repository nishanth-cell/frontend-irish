import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/ProductForm";
import { createProduct } from "../../api/products";
import { useState } from "react";

export default function AddProduct() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAdd = async (formData) => {
    setLoading(true);
    try {
      await createProduct(formData, token);
      navigate("/admin/products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductForm
      mode="add"
      onSubmit={handleAdd}
      loading={loading}
    />
  );
}