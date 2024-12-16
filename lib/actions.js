'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function isInvalidInput(text) {
    return !text || text.trim() === ''
}

export async function shareMeal(formData) {

    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instruction: formData.get('instruction'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email')
    }

    if (isInvalidInput(meal.title) || isInvalidInput(meal.summary) || isInvalidInput(meal.instruction) || isInvalidInput(meal.creator) || isInvalidInput(meal.creator_email) || !meal.creator_email.includes("@") || !meal.image || meal.image.size === 0) {
        throw new Error("Invalid input")
    }

    await saveMeal(meal)
    redirect("/meals")
}