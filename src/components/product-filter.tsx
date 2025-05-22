"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoFilterOutline } from "react-icons/io5";

export default function ProductFilter() {
  return (
    <Button variant="outline" size="sm" className="gap-1" disabled>
      <IoFilterOutline size={18} />
      フィルター
    </Button>
  );
}