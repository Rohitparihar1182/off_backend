import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false;
    }

    return true;
  }, {
    message: "New password is required!",
    path: ["newPassword"]
  })
  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false;
    }

    return true;
  }, {
    message: "Password is required!",
    path: ["password"]
  })


export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});


// todo: Change blog schema
export const BlogSchema = z.object({
  title: z.string().min(5, {
    message: "Title should be at least 10 characters long"
  }),
  content: z.string().min(3, {
    message: "Content is too short"
  }),
  featuredImage: z.string().min(1, {
    message: "Featured image is required"
  }), 
  slug: z.string().min(5, {
    message: "Slug is too short"
  }),
  categories: z.string().min(1, {
    message: "Category is required"
  })
});

export const CategorySchema = z.object({
  name: z.string().min(2, {
    message: "Category name is required"
  }),
  image: z.string().min(1, {
    message: "Category image is required"
  })
})