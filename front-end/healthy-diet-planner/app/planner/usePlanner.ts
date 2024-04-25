"use client";
import { useState } from "react";
export function usePlanner() {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function sendData(data: any) {
    console.log("fethcing");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/diet_plan", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      const restructuredDataRes = restructureResponseData(responseData);
      console.log(restructuredDataRes);
      setResponse(restructuredDataRes);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return { error, sendData, response, loading };
}

// healer function

function restructureResponseData(responseData: any) {
  const mealPlan = responseData.meal_plan;
  const meals = Object.entries(mealPlan.meals).map(
    ([mealType, mealData]: any) => {
      return {
        mealType,
        items: Object.entries(mealData.items).map(
          ([itemName, itemData]: any) => {
            return { itemName, ...itemData };
          }
        ),
        calories: mealData.calories,
      };
    }
  );

  return {
    status: responseData.status,
    meal_plan: {
      calories: mealPlan.calories,
      cost: mealPlan.cost,
      meals,
    },
  };
}
