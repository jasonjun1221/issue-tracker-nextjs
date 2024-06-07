import { Pagination } from "./components";

interface Props {
  searchParams: {
    page: string;
  };
}

export default function Home({ searchParams }: Props) {
  return <Pagination itemCount={100} pageSize={10} currentPage={parseInt(searchParams.page)} />;
}
