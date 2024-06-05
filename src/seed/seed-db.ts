import prisma from '../lib/prisma';
import { initialData } from './seed';

const main = async () => {
  //! Delete previous info

  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const { categories, products } = initialData;

  //? Insert categories
  const categoriesData = categories.map((category) => ({ name: category }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  //* Calling the db categories to have the ids
  const categoriesDB = await prisma.category.findMany();

  //* swaps the categoriesDB -> [{id:uuid, name:capitalizedNameOfCategory},] to categoriesMap-> {lowerCaseNameOfCategory:uuid,}
  //* e.g.                      [{id:'11232-asd-231-43-sd', name:'Shirts'},]                    {shirts:'11232-asd-231-43-sd',}
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>); //?<string=label, string=categoryID>

  //? Insert Products

  products.forEach(async (product) => {
    const { type, images, ...rest } = product;
    const dbProduct = await prisma.product.create({
      data: { ...rest, categoryId: categoriesMap[type] },
    });
    //Images
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log('seed executed');
};
(() => {
  if (process.env.NODE_ENV === 'production') return;
  main();
})();
