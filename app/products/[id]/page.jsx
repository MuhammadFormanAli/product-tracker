"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Loading from "@/app/loading";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${params.id}`);
        setProduct(res.data);
        console.log(res.data);
      } catch (error) {
        toast.error("Failed to fetch product");
        router.back();
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  if (loading) return <Loading />;

  if (!product) return <p className="text-center mt-6">No product found</p>;

  return (
    <div className="p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <div className="grid grid-cols-2 gap-4">
        <p>
          <strong>Serial Number:</strong> {product?.serialNumber}
        </p>
        <p>
          <strong>Brand:</strong> {product?.brand}
        </p>
        <p>
          <strong>Model:</strong> {product?.model}
        </p>
        <p>
          <strong>Category:</strong> {product?.category}
        </p>
        <p>
          <strong>Status:</strong> {product?.status}
        </p>
        <p>
          <strong>Remarks:</strong> {product?.remarks}
        </p>

        {/* IN USE */}
        {product?.status === "inUse" && (
          <>
            <p>
              <strong>User Name:</strong> {product?.assignedUser?.userName}
            </p>
            <p>
              <strong>Employee ID:</strong> {product?.assignedUser?.employeeId}
            </p>
            <p>
              <strong>Designation:</strong> {product?.assignedUser?.designation}
            </p>
            <p>
              <strong>Location:</strong> {product?.assignedUser?.location}
            </p>
            <p>
              <strong>Phone:</strong> {product?.assignedUser?.phone}
            </p>
            <p>
              <strong>Email:</strong> {product?.assignedUser?.email}
            </p>
          </>
        )}

        {/* IN REPAIR */}
        {product?.status === "inRepair" && (
          <>
            <p>
              <strong>Service Center:</strong>{" "}
              {product?.repairInfo?.serviceCenter}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              {product?.repairInfo?.location}
            </p>
            <p>
              <strong>Phone:</strong> {product?.repairInfo?.phone}
            </p>
            <p>
              <strong>Email:</strong> {product?.repairInfo?.email}
            </p>
            <p>
              <strong>Carrier Name:</strong> {product?.repairInfo?.carrierName}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
