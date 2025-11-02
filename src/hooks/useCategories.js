import { useState, useEffect } from "react";
import { fetchCategories, fetchSubcategories } from "@/services/api";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  useEffect(() => {
    fetchCategories().then(res => {
      if (!res.error && Array.isArray(res.data)) setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    if (!selectedCategory) return setSubcategories([]);
    fetchSubcategories(selectedCategory).then(res => {
      if (!res.error && Array.isArray(res.data))
      {
          setSubcategories(res.data);
          console.log(selectedCategory)
      }
    });
  }, [selectedCategory]);

  return { categories, subcategories, selectedCategory, selectedSubcategory, setSelectedCategory, setSelectedSubcategory };
}
