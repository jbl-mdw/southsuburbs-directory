export default function Head({ params }: { params: { slug: string } }) {
  const title = `Best of ${params.slug.replace(/-/g, " ").replace(/\b\w/g, m => m.toUpperCase())} | South Suburbs Best`;
  const desc = `Discover top businesses and services in ${params.slug.replace(/-/g, " ")}.`;
  const url = `https://southsuburbsbest.com/city/${params.slug}`;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
    </>
  );
}
