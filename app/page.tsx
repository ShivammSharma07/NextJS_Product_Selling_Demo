import Card from "@/components/Card";
import { createClient } from "@/supabase/client";

export default async function Home() {
  const supabase = createClient();

  const { data: products } = await supabase.from("selling_product").select();

  const { data: topProducts } = await supabase
    .from("selling_product")
    .select()
    .eq("boost", true);

  return (
    <main className="min-h-screen max-w-[100rem] mx-auto">
      <div className="px-12 pt-12 pb-20">
        {/* Top Products Section */}
        <div className="flex flex-col xl:flex-row gap-2 xl:gap-40">
          <div className="pt-12">
            <h2 className="text-4xl mb-16">OUR TOP PRODUCTS</h2>
            <p className="text-xl">You can pay to boost your products here.</p>
          </div>

          {topProducts && topProducts.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-12">
              {topProducts.map((item) => (
                <Card
                  key={item.name}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  imageUrl={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/Storage/${item.imageUrl}`}
                />
              ))}
            </div>
          ) : (
            <p className="text-lg text-gray-500 pt-12">
              No top products available
            </p>
          )}
        </div>

        {/* All Products Section */}
        <h2 className="text-4xl mt-20 mb-16">ALL PRODUCTS</h2>
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((item) => (
              <Card
                key={item.name}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                imageUrl={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/Storage/${item.imageUrl}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-xl">
            No products available
          </p>
        )}
      </div>
    </main>
  );
}
