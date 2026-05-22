import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductForm from "../../components/ProductForm";
import { getProductById, updateProduct } from "../../api/products";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProductById(id, token);
      setProduct(res.data);
      setLoading(false);
    };

    fetchData();
  }, [id, token]);

  const handleUpdate = async (formData) => {
    setSubmitting(true);
    try {
      await updateProduct(id, formData, token);
      navigate("/admin/products");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <ProductForm
      mode="edit"
      defaultValues={product}
      existingImage={product.image}
      onSubmit={handleUpdate}
      loading={submitting}
    />
  );
}