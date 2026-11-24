import { Link, useParams } from 'react-router-dom';
import { CATEGORIES, type CategoryId } from './content/brands';
import { BrandGrid } from './components/home/DeviceBrands';
import PageHeader from './components/ui/PageHeader';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categoryId && categoryId in CATEGORIES ? CATEGORIES[categoryId as CategoryId] : null;

  if (!category) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-2xl font-semibold">Category not found.</h1>
        <Link to="/" className="btn btn-dark mt-6">Return to Home</Link>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Select Brand' }]}
        step={2}
        title={`Choose Your ${category.title} Brand`}
        intro="Select the brand of your device to see available models for repair."
      />
      <div className="container-page py-10 md:py-14">
        <BrandGrid category={category.id} />
      </div>
    </>
  );
}
