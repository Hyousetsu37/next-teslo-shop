import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { Gender } from '@prisma/client';

interface Props {
  params: { gender: string };
  searchParams: { page: string };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = params;
  const pageValue = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products: dbProducts, totalPages } =
    await getPaginatedProductsWithImages({
      page: pageValue,
      gender: gender as Gender,
    });
  /* if (id === 'kids') {
    notFound();
  } */
  return (
    <>
      <Title
        title={gender}
        subtitle={`All products for ${gender}`}
        className="mb-2"
      />

      <ProductGrid products={dbProducts} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
