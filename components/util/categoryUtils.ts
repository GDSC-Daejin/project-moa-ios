// components/util/categoryUtils.ts

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const fetchCategories = async (): Promise<{ [key: string]: string }> => {
  const categoryDoc = doc(db, "Category", "categories");
  const docSnapshot = await getDoc(categoryDoc);

  if (docSnapshot.exists()) {
    const data = docSnapshot.data();
    return data?.Category ?? {};
  } else {
    return {};
  }
};

export const saveCategory = async (category: string) => {
  await setDoc(doc(db, "Category", "categories"), {
    Category: { [category]: category },
  });
};
