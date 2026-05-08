import { createClient } from "@/lib/supabase/server"
import MenuClient from "@/components/menu-client"

export const revalidate = 60

export default async function MenuPage() {
  const supabase = await createClient()

  const { data: items } = await supabase
    .from("menu_items")
    .select("*")
    .eq("is_active", true)
    .order("category")
    .order("sort_order")

  // Map DB shape to the shape the client component expects
  const menuItems = (items ?? []).map((item) => ({
    id: item.slug,
    name: item.name,
    description: item.description ?? "",
    price: item.price,
    image: item.image_url ?? "/images/placeholder.png",
    category: item.category,
    preparationTime: item.preparation_time ?? "",
    rating: Number(item.rating),
    isSpicy: item.is_spicy,
    isVegetarian: item.is_vegetarian,
    isPopular: item.is_popular,
  }))

  return <MenuClient menuItems={menuItems} />
}
