"use client";
import { Input } from "@/src/components/ui/input";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl } from "./ui/form";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, FormSchemaType } from "../types/FormSchema";
import { useState } from "react";
import { usePlanner } from "@/app/planner/usePlanner";
import React from "react";
export default function DietForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const { error, loading, response: data, sendData } = usePlanner();
  const pagesNum = 3;
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      gender: "M",
      activity_level: "S",
      diet_goal: "maintain",
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_lactose_free: false,
    },
  });
  function onSubmit(data: FormSchemaType) {
    console.log(data);
    if (currentPage === 3) {
      sendData(data);
    }
  }
  if (loading)
    return <div className="animate-spin border-2 border-black w-4 h-4"></div>;
  if (error) return <div>Error</div>;
  if (data)
    return (
      <div className="border-2 border-slate-900 px-6 py-10 rounded-lg mx-8">
        <h1 className="text-5xl font-bold">Your Diet Plan</h1>
        <div className="py-6">
          <div>
            <span className="font-bold text-xl">Total calories</span> :{" "}
            {data.meal_plan.calories}
          </div>
          <div>
            <span className="font-bold text-xl">Approximate cost</span> :{" "}
            {data.meal_plan.cost} $
          </div>
        </div>
        <div className="border-2 grid grid-cols-5 py-6 px-4 rounded-lg">
          <div className="border-2 p-4 h-full flex items-center justify-center text-center">
            Meal Type
          </div>
          <div className="border-2 p-4 h-full flex items-center justify-center text-center">
            Name
          </div>
          <div className="border-2 p-4 h-full flex items-center justify-center text-center">
            Carbs
          </div>
          <div className="border-2 p-4 h-full flex items-center justify-center text-center">
            Protein
          </div>
          <div className="border-2 p-4 h-full flex items-center justify-center text-center">
            Fats
          </div>

          {data.meal_plan.meals.map((meal: any) => {
            const itemNames = meal.items
              .map((item: any) => item.itemName)
              .join(", ");
            const totalCarbs = meal.items.reduce(
              (total: number, item: any) => total + item.carbs,
              0
            );
            const totalProtein = meal.items.reduce(
              (total: number, item: any) => total + item.protein,
              0
            );
            const totalFat = meal.items.reduce(
              (total: number, item: any) => total + item.fat,
              0
            );

            return (
              <React.Fragment key={meal.calories}>
                <div className="border-2 px-2 py-4 h-full flex items-center justify-center text-center">
                  {meal.mealType}
                </div>
                <div className="border-2 px-2 h-full flex items-center justify-center text-center">
                  {itemNames}
                </div>
                <div className="border-2 px-2 h-full flex items-center justify-center text-center">
                  {totalCarbs}
                </div>
                <div className="border-2 px-2 h-full flex items-center justify-center text-center">
                  {totalProtein}
                </div>
                <div className="border-2 px-2 h-full flex items-center justify-center text-center">
                  {totalFat}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  return (
    <div className="max-w-xl  p-14 rounded-xl border-2 w-full">
      <Form {...form}>
        <form className="space-y-8">
          {currentPage === 1 && (
            <>
              {" "}
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input placeholder="76" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input placeholder="168" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input placeholder="21" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          )}
          {currentPage === 2 && (
            <>
              {" "}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender : </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="border ml-8 py-2 px-4 rounded-lg"
                      >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="diet_goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diet Goal : </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="border ml-8 py-2 px-4 rounded-lg"
                      >
                        <option value="loss">Loss</option>
                        <option value="maintain">Maintain</option>
                        <option value="gain">Gain</option>
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="activity_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Level : </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="border ml-8 py-2 px-4 rounded-lg"
                      >
                        <option value="S">Setting All day</option>
                        <option value="LA">Moving a little</option>
                        <option value="A">Active</option>
                        <option value="VA">Very Active</option>
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          )}
          {currentPage === 3 && (
            <>
              <FormField
                control={form.control}
                name="is_vegan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vegan:</FormLabel>
                    <FormControl>
                      {/*@ts-ignore*/}
                      <input type="checkbox" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_vegetarian"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vegetarian:</FormLabel>
                    <FormControl>
                      {/*@ts-ignore*/}
                      <input type="checkbox" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_gluten_free"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gluten Free:</FormLabel>
                    <FormControl>
                      {/*@ts-ignore*/}
                      <input type="checkbox" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_lactose_free"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lactose Free:</FormLabel>
                    <FormControl>
                      {/*@ts-ignore*/}
                      <input type="checkbox" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          )}
          <div className="flex justify-center space-x-2">
            {Array.from({ length: pagesNum }, (_, i) => (
              <div
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: currentPage === i + 1 ? "green" : "gray",
                }}
              />
            ))}
          </div>
        </form>
        <div className="navigation-buttons">
          {currentPage !== 3 ? (
            <Button onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </Button>
          ) : (
            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
              Generate
            </Button>
          )}
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
        </div>
      </Form>
    </div>
  );
}
