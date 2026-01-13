"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Loading from "@/app/loading";

const PrintPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (!product) return null;

  return (
    <>
      {/* PRINT AREA ONLY */}
      
      <div id="asset-print-area" className="print-sheet p-4">
        {/* HEADER */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Asset Report</h1>
          <p className="text-sm">
            Generated on: {new Date().toLocaleDateString()}
          </p>
        </div>

        <hr className="border-black mb-4" />

        {/* PRODUCT INFORMATION */}
        <Section title="Product Information">
          <Row label="Category" value={product.category} />
          <Row label="Serial Number" value={product.serialNumber} />
          <Row label="Brand" value={product.brand || "-"} />
          <Row label="Model" value={product.model || "-"} />
          <Row label="Status" value={product.status} />
        </Section>

        {/* REPAIR INFO */}
        {product.status === "inRepair" && product.repairInfo && (
          <Section title="Current Repair Info">
            <Row label="Service Center" value={product.repairInfo.serviceCenter} />
            <Row label="Location" value={product.repairInfo.location} />
            <Row label="Phone" value={product.repairInfo.phone} />
            <Row label="Email" value={product.repairInfo.email} />
            <Row label="Carrier" value={product.repairInfo.carrierName} />
          </Section>
        )}

        {/* ASSIGNED USER */}
        {product.status === "inUse" && product.assignedUser && (
          <Section title="Current Assigned User">
            <Row label="Name" value={product.assignedUser.userName} />
            <Row label="Employee ID" value={product.assignedUser.employeeId} />
            <Row label="Designation" value={product.assignedUser.designation} />
            <Row label="Location" value={product.assignedUser.location} />
            <Row label="Phone" value={product.assignedUser.phone} />
            <Row label="Email" value={product.assignedUser.email} />
          </Section>
        )}

        {/* SIGNATURE */}
        <div className="flex justify-between mt-16 text-sm">
          <p>Prepared By: __________________</p>
          <p>Authorized By: __________________</p>
        </div>
      </div>

      {/* PRINT BUTTON (NOT PRINTED) */}
      <div className="mt-6">
        <button
          onClick={() => window.print()}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Print Asset Report
        </button>
      </div>

      {/* PRINT STYLES */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }

          #asset-print-area,
          #asset-print-area * {
            visibility: visible;
          }

          #asset-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 40px;
            font-family: Arial, sans-serif;
          }

          hr {
            border: 1px solid black;
          }
        }
      `}</style>

      
    </>
  );
};

export default PrintPage;



const Section = ({ title, children }) => (
  <section className="mb-6">
    <h2 className="font-semibold mb-2">{title}</h2>
    <hr className="border-black mb-2" />
    <div className="grid grid-cols-2 gap-y-2 text-sm">{children}</div>
  </section>
);

const Row = ({ label, value }) => (
  <>
    <p><strong>{label}</strong></p>
    <p>{value}</p>
  </>
);
