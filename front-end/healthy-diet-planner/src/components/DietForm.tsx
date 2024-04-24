"use client";
import { Input } from "@/src/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, FormSchemaType } from "../types/FormSchema";
import { useState } from "react";

export default function DietForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const pagesNum = 3;
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      weight: "",
      height: "",
      age: "",
      gender: "",
      activity_level: "",
      diet_goal: "",
      is_vegan: "",
      is_vegetarian: "",
      is_gluten_free: "",
      is_lactose_free: "",
    },
  });
  function onSubmit(data: FormSchemaType) {
    console.log(data);
  }
  return (
    <div className="max-w-xl  p-14 rounded-xl border-2 w-full">
      {" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <FormLabel>Gluten Free: </FormLabel>
                    <FormControl>
                      <input type="checkbox" {...field} className="ml-4" />
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
                      <input type="checkbox" {...field} className="p-6" />
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
          <div className="flex justify-between flex-row-reverse w-full">
            {" "}
            {currentPage !== 3 ? (
              <Button onClick={() => setCurrentPage(currentPage + 1)}>
                Next
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
            <Button
              disabled={currentPage === 1 ? true : false}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
