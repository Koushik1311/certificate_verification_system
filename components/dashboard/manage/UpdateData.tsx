"use client";

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";
import { updateCertificate } from "@/data/certificate"; // Adjust the import based on your setup
import SubmitButton from "@/components/global/SubmitButton";

type Certificate = {
  _id: string;
  certificateId: string;
  studentName: string;
  internshipDomain: string;
  startingDate: string;
  endingDate: string;
};

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
  certificate: Certificate | null;
  onUpdateSuccess: () => void;
};

export default function UpdateData({
  isOpen,
  onRequestClose,
  certificate,
  onUpdateSuccess,
}: Props) {
  const [formData, setFormData] = useState({
    studentName: "",
    internshipDomain: "",
    startingDate: new Date(),
    endingDate: new Date(),
  });

  useEffect(() => {
    if (certificate) {
      setFormData({
        studentName: certificate.studentName,
        internshipDomain: certificate.internshipDomain,
        startingDate: new Date(certificate.startingDate),
        endingDate: new Date(certificate.endingDate),
      });
    }
  }, [certificate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: date }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCertificate(certificate!._id, formData);
      toast.success("Certificate updated successfully");
      onUpdateSuccess();
      onRequestClose();
    } catch (error) {
      toast.error("Failed to update certificate");
      console.error("Failed to update certificate:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Update Certificate"
      style={{
        content: {
          width: "450px", // Set the width here
          margin: "auto", // Center the modal horizontally
          padding: "20px", // Adjust padding as needed
          borderRadius: "8px", // Optional: Add border radius for styling
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Adjust overlay color
        },
      }}
    >
      <h2>Update Certificate</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-1 w-full">
        <label
          htmlFor="studentName"
          className="text-xs text-slate-500 font-medium mt-10"
        >
          Student Name
        </label>
        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          className="h-9 px-3 text-sm rounded-[6px] border border-slate-200 focus:outline-blue-400"
        />
        <label
          htmlFor="internshipDomain"
          className="text-xs text-slate-500 font-medium mt-6"
        >
          Internship Domain
        </label>

        <input
          type="text"
          name="internshipDomain"
          value={formData.internshipDomain}
          onChange={handleChange}
          className="h-9 px-3 text-sm rounded-[6px] border border-slate-200 focus:outline-blue-400"
        />
        <label
          htmlFor="startingDate"
          className="text-xs text-slate-500 font-medium mt-6"
        >
          Starting Date
        </label>

        <DatePicker
          selected={formData.startingDate}
          onChange={(date) => handleDateChange(date, "startingDate")}
          className="h-9 px-3 text-sm rounded-[6px] border border-slate-200 focus:outline-blue-400"
        />
        <label
          htmlFor="endingDate"
          className="text-xs text-slate-500 font-medium mt-6"
        >
          Ending Date
        </label>
        <DatePicker
          selected={formData.endingDate}
          onChange={(date) => handleDateChange(date, "endingDate")}
          className="h-9 px-3 text-sm rounded-[6px] border border-slate-200 focus:outline-blue-400"
        />
        <SubmitButton
          type="submit"
          className="w-full flex items-center justify-center h-9 rounded-[6px] bg-blue-600 hover:bg-blue-500 transition-all duration-150 text-sm font-semibold text-white mt-6"
        >
          Save
        </SubmitButton>
        <SubmitButton
          type="button"
          onClick={onRequestClose}
          className="w-full flex items-center justify-center h-9 rounded-[6px] bg-red-500 hover:bg-red-400 transition-all duration-150 text-sm font-semibold text-white mt-3"
        >
          Cancel
        </SubmitButton>
      </form>
    </Modal>
  );
}
