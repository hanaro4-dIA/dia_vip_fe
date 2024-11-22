import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export type searchResult = {
  id: number;
  category: string;
  title: string;
  date: string;
  manager: string;
  status: string;
};

type Filters = {
  category: string;
  startDate: Date | null;
  endDate: Date | null;
  keyword: string;
};

export default function SearchResult({
  filters,
  applyFilters,
}: {
  filters: Filters;
  applyFilters: boolean;
}) {
  const [searchResults, setSearchResults] = useState<searchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<searchResult[]>([]);
  const router = useRouter();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    router.push(`/consultingList/${id}`);
  };

  useEffect(() => {
    async function fetchSearchResults() {
      const response = await fetch('/api/searchResults'); // 전체 결과 API 호출
      const data = await response.json();
      setSearchResults(data.searchResults);
      setFilteredResults(data.searchResults); // 초기 전체 결과 설정
    }
    fetchSearchResults();
  }, []);

  useEffect(() => {
    if (!applyFilters) {
      setFilteredResults(searchResults); // 필터를 적용하지 않을 때 전체 결과 표시
      return;
    }

    const { category, startDate, endDate, keyword } = filters;

    const filtered = searchResults.filter((item) => {
      const isCategoryMatch = category === '전체' || item.category === category;
      const isDateMatch =
        (!startDate || new Date(item.date) >= new Date(startDate)) &&
        (!endDate || new Date(item.date) <= new Date(endDate));
      const isKeywordMatch =
        !keyword || item.title.toLowerCase().includes(keyword.toLowerCase());

      return isCategoryMatch && isDateMatch && isKeywordMatch;
    });

    setFilteredResults(filtered);
  }, [filters, searchResults, applyFilters]);

  return (
    <div className='border border-sky-50 bg-white w-full h-96 overflow-y-auto p-2 mt-5'>
      <table className='table-auto w-full'>
        <thead>
          <tr>
            <th className='border-b-2 border-black px-4 py-2'>순번</th>
            <th className='border-b-2 border-black px-4 py-2'>카테고리</th>
            <th className='border-b-2 border-black px-4 py-2'>제목</th>
            <th className='border-b-2 border-black px-4 py-2'>상담일시</th>
            <th className='border-b-2 border-black px-4 py-2'>담당자</th>
            <th className='border-b-2 border-black px-4 py-2'>일지보기</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.map((item) => (
            <tr key={item.id}>
              <td className='border-b border-black px-4 py-2 text-center'>
                {item.id}
              </td>
              <td className='border-b border-black px-4 py-2 text-center'>
                {item.category}
              </td>
              <td className='border-b border-black px-4 py-2 text-center truncate max-w-48'>
                {item.title}
              </td>
              <td className='border-b border-black px-4 py-2 text-center'>
                {item.date}
              </td>
              <td className='border-b border-black px-4 py-2 text-center'>
                {item.manager}
              </td>
              <td className='border-b border-black px-4 py-2 text-center'>
                {item.status === '열람 가능' ? (
                  <button
                    onClick={(e) => handleSubmit(e, item.id)}
                    className='hover:underline text-blue-700'
                  >
                    {item.status}
                  </button>
                ) : (
                  item.status
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
